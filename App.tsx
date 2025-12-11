import React, { useState, useCallback } from 'react';
import { generateCoverArt } from './services/geminiService';
import TitleInput from './components/TitleInput';
import ImageDisplay from './components/ImageDisplay';
import { GithubIcon } from './components/icons/GithubIcon';

type Language = 'ar' | 'en';

const translations = {
  en: {
    appTitle: "AI Cover Art Generator",
    subtitle: "Turn your YouTube or episode titles into stunning cover art.",
    placeholder: "e.g., The Lost City of Atlantis...",
    generate: "Generate Art",
    generating: "Generating...",
    aspectRatio: "Aspect Ratio",
    ratios: {
      '16:9': "Landscape",
      '1:1': "Square",
      '9:16': "Portrait"
    },
    footerBuilt: "Built with React, Tailwind CSS, and the Google Gemini API.",
    viewGithub: "View on GitHub",
    download: "Download",
    emptyTitle: "Your cover art will appear here",
    emptySubtitle: "Enter a title above and click \"Generate Art\"",
    errorTitle: "Generation Failed",
    langSwitch: "العربية",
  },
  ar: {
    appTitle: "صانع صور الغلاف بالذكاء الاصطناعي",
    subtitle: "حول عناوين يوتيوب أو الحلقات الخاصة بك إلى صور غلاف مذهلة.",
    placeholder: "مثال: المدينة المفقودة في أطلانتس...",
    generate: "توليد الصورة",
    generating: "جاري التوليد...",
    aspectRatio: "نسبة الأبعاد",
    ratios: {
      '16:9': "أفقي",
      '1:1': "مربع",
      '9:16': "عمودي"
    },
    footerBuilt: "تم البناء باستخدام React و Tailwind CSS و Google Gemini API.",
    viewGithub: "عرض على GitHub",
    download: "تحميل",
    emptyTitle: "سيظهر غلافك الفني هنا",
    emptySubtitle: "أدخل عنواناً أعلاه وانقر على \"توليد الصورة\"",
    errorTitle: "فشل التوليد",
    langSwitch: "English",
  }
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar');
  const [title, setTitle] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<string>('16:9');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const t = translations[lang];
  const isRTL = lang === 'ar';

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

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  return (
    <div 
      className={`min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-4 sm:p-6 lg:p-8 ${isRTL ? 'font-[Tajawal]' : ''}`} 
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <nav className="w-full max-w-4xl flex justify-end mb-4">
        <button 
          onClick={toggleLanguage}
          className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors border border-gray-700 rounded-lg hover:border-gray-500"
        >
          {t.langSwitch}
        </button>
      </nav>

      <main className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <header className="text-center my-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 pb-2">
            {t.appTitle}
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            {t.subtitle}
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
            labels={{
              placeholder: t.placeholder,
              generate: t.generate,
              generating: t.generating,
              aspectRatio: t.aspectRatio,
              ratios: t.ratios
            }}
          />
          <ImageDisplay
            imageUrl={imageUrl}
            isLoading={isLoading}
            error={error}
            title={title}
            onDownload={handleDownload}
            labels={{
              download: t.download,
              emptyTitle: t.emptyTitle,
              emptySubtitle: t.emptySubtitle,
              errorTitle: t.errorTitle,
              generating: t.generating
            }}
          />
        </div>
      </main>
      <footer className="w-full max-w-4xl mx-auto text-center py-8 mt-8 text-gray-500">
        <p>{t.footerBuilt}</p>
        <a 
          href="https://github.com/google-gemini-vignettes" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:text-purple-400 transition-colors mt-2"
        >
          <GithubIcon className="w-5 h-5" />
          <span>{t.viewGithub}</span>
        </a>
      </footer>
    </div>
  );
};

export default App;