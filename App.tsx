
import React, { useState, useCallback, useMemo } from 'react';
import { generateCoverArt } from './services/geminiService';
import TitleInput from './components/TitleInput';
import ImageDisplay from './components/ImageDisplay';
import StyleSelector from './components/StyleSelector';
import ImageHistory from './components/ImageHistory';
import ToastContainer from './components/ToastContainer';
import { GithubIcon } from './components/icons/GithubIcon';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useToast } from './hooks/useToast';
import { useKeyboardShortcut } from './hooks/useKeyboardShortcut';
import { GeneratedImage, StylePreset } from './types';
import { STYLE_PRESETS, LOCAL_STORAGE_KEYS, KEYBOARD_SHORTCUTS } from './constants';

const App: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useLocalStorage<string>(
    LOCAL_STORAGE_KEYS.LAST_ASPECT_RATIO,
    '16:9'
  );
  const [selectedStyle, setSelectedStyle] = useLocalStorage<StylePreset>(
    LOCAL_STORAGE_KEYS.LAST_STYLE,
    STYLE_PRESETS[0]
  );
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [imageHistory, setImageHistory] = useLocalStorage<GeneratedImage[]>(
    LOCAL_STORAGE_KEYS.IMAGE_HISTORY,
    []
  );

  const { toasts, removeToast, success, error: errorToast, info } = useToast();

  const handleGenerate = useCallback(async (event?: React.FormEvent) => {
    if (event) event.preventDefault();
    if (!title || isLoading) return;

    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const generatedImageUrl = await generateCoverArt(title, aspectRatio, selectedStyle);
      setImageUrl(generatedImageUrl);

      // Add to history
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        title,
        imageUrl: generatedImageUrl,
        aspectRatio,
        style: selectedStyle.name,
        timestamp: Date.now(),
      };
      setImageHistory((prev) => [newImage, ...prev].slice(0, 20)); // Keep only last 20

      success('Cover art generated successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      errorToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [title, isLoading, aspectRatio, selectedStyle, setImageHistory, success, errorToast]);

  const handleDownload = useCallback(() => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_cover_art.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    info('Image downloaded!');
  }, [imageUrl, title, info]);

  const handleCopy = useCallback(async () => {
    if (!imageUrl) return;

    try {
      // Convert base64 to blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob })
      ]);

      success('Image copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy image:', err);
      errorToast('Failed to copy image to clipboard. Try downloading instead.');
    }
  }, [imageUrl, success, errorToast]);

  const handleShare = useCallback(async () => {
    if (!imageUrl || !navigator.share) return;

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], `${title.replace(/[^a-z0-9]/gi, '_')}.jpeg`, { type: blob.type });

      await navigator.share({
        title: `AI Cover Art: ${title}`,
        text: `Check out this AI-generated cover art for "${title}"`,
        files: [file],
      });

      success('Image shared successfully!');
    } catch (err) {
      console.error('Failed to share image:', err);
      // User cancelled share - don't show error
      if (err instanceof Error && err.name !== 'AbortError') {
        errorToast('Failed to share image.');
      }
    }
  }, [imageUrl, title, success, errorToast]);

  const handleSelectFromHistory = useCallback((image: GeneratedImage) => {
    setTitle(image.title);
    setImageUrl(image.imageUrl);
    setAspectRatio(image.aspectRatio);
    setError(null);
    info('Loaded from history');
  }, [setAspectRatio, info]);

  const handleClearHistory = useCallback(() => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      setImageHistory([]);
      success('History cleared');
    }
  }, [setImageHistory, success]);

  // Keyboard shortcuts
  useKeyboardShortcut(KEYBOARD_SHORTCUTS.GENERATE, handleGenerate, !isLoading && !!title);
  useKeyboardShortcut(KEYBOARD_SHORTCUTS.DOWNLOAD, handleDownload, !!imageUrl);
  useKeyboardShortcut(KEYBOARD_SHORTCUTS.COPY, handleCopy, !!imageUrl);

  // Memoize sorted history
  const sortedHistory = useMemo(() => {
    return [...imageHistory].sort((a, b) => b.timestamp - a.timestamp);
  }, [imageHistory]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <main className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <header className="text-center my-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            AI Cover Art Generator
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Turn your YouTube or episode titles into stunning cover art with AI-powered design.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Press <kbd className="px-2 py-1 bg-gray-800 rounded border border-gray-700">Ctrl+Enter</kbd> to generate
          </p>
        </header>

        <div className="w-full p-6 bg-gray-800/50 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm">
          <TitleInput
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onSubmit={handleGenerate}
            isLoading={isLoading}
            aspectRatio={aspectRatio}
            onAspectRatioChange={setAspectRatio}
          />

          <StyleSelector
            selectedStyle={selectedStyle}
            onStyleChange={setSelectedStyle}
            isLoading={isLoading}
          />

          <ImageDisplay
            imageUrl={imageUrl}
            isLoading={isLoading}
            error={error}
            title={title}
            onDownload={handleDownload}
            onCopy={handleCopy}
            onShare={handleShare}
          />
        </div>

        <ImageHistory
          history={sortedHistory}
          onSelect={handleSelectFromHistory}
          onClear={handleClearHistory}
        />
      </main>

      <footer className="w-full max-w-4xl mx-auto text-center py-8 mt-8 text-gray-500">
        <p className="mb-2">Built with React, Tailwind CSS, and Google Gemini AI (Imagen 4.0)</p>
        <div className="flex items-center justify-center gap-4 text-xs">
          <span>Keyboard shortcuts: Ctrl+Enter (Generate) | Ctrl+D (Download) | Ctrl+Shift+C (Copy)</span>
        </div>
        <a
          href="https://github.com/google-gemini-vignettes"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:text-purple-400 transition-colors mt-4"
        >
          <GithubIcon className="w-5 h-5" />
          <span>View on GitHub</span>
        </a>
      </footer>
    </div>
  );
};

export default App;
