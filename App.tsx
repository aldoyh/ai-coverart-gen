
import React, { useState, useCallback } from 'react';
import { generateCoverArt } from './services/geminiService';
import TitleInput from './components/TitleInput';
import ImageDisplay from './components/ImageDisplay';
import { GithubIcon } from './components/icons/GithubIcon';

const App: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<string>('16:9');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title || isLoading) return;

    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const generatedImageUrl = await generateCoverArt(title, aspectRatio);
      setImageUrl(generatedImageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [title, isLoading, aspectRatio]);

  const handleDownload = useCallback(() => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_cover_art.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [imageUrl, title]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <main className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <header className="text-center my-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            AI Cover Art Generator
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Turn your YouTube or episode titles into stunning cover art.
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
          <ImageDisplay
            imageUrl={imageUrl}
            isLoading={isLoading}
            error={error}
            title={title}
            onDownload={handleDownload}
          />
        </div>
      </main>
      <footer className="w-full max-w-4xl mx-auto text-center py-8 mt-8 text-gray-500">
        <p>Built with React, Tailwind CSS, and the Google Gemini API.</p>
        <a 
          href="https://github.com/google-gemini-vignettes" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:text-purple-400 transition-colors mt-2"
        >
          <GithubIcon className="w-5 h-5" />
          <span>View on GitHub</span>
        </a>
      </footer>
    </div>
  );
};

export default App;
