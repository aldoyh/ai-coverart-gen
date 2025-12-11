import React from 'react';
import { DownloadIcon } from './icons/DownloadIcon';
import { ImageIcon } from './icons/ImageIcon';
import { MagicWandIcon } from './icons/MagicWandIcon';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  title: string;
  onDownload: () => void;
  labels: {
    download: string;
    emptyTitle: string;
    emptySubtitle: string;
    errorTitle: string;
    generating: string;
  };
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading, error, title, onDownload, labels }) => {
  return (
    <div className="mt-6 w-full aspect-video bg-gray-900/50 border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center p-4 relative overflow-hidden group">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-900/80 backdrop-blur-sm">
           <div className="relative mb-6">
             {/* Outer spinning ring */}
             <div className="w-20 h-20 border-4 border-transparent border-t-purple-500 border-r-pink-500 rounded-full animate-spin"></div>
             {/* Inner pulsating icon */}
             <div className="absolute inset-0 flex items-center justify-center">
                <MagicWandIcon className="w-8 h-8 text-white animate-pulse" />
             </div>
           </div>
           
           <div className="flex flex-col items-center gap-2">
             <p className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse">
               {labels.generating}
             </p>
             {/* Progress bar */}
             <div className="w-48 h-1.5 bg-gray-700 rounded-full overflow-hidden mt-2">
               <div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 w-[200%] animate-[shimmer_2s_infinite_linear]"></div>
             </div>
             <style>{`
               @keyframes shimmer {
                 0% { transform: translateX(-50%); }
                 100% { transform: translateX(0%); }
               }
             `}</style>
           </div>
        </div>
      )}

      {error && !isLoading && (
        <div className="text-center text-red-400">
          <p className="font-bold text-xl mb-2">{labels.errorTitle}</p>
          <p className="text-sm opacity-80">{error}</p>
        </div>
      )}

      {!isLoading && !error && !imageUrl && (
        <div className="text-center text-gray-500 transition-opacity duration-300">
          <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium text-gray-400">{labels.emptyTitle}</p>
          <p className="text-sm mt-1">{labels.emptySubtitle}</p>
        </div>
      )}
      
      {imageUrl && !isLoading && (
        <>
          <img
            src={imageUrl}
            alt={`AI generated cover art for: ${title}`}
            className="w-full h-full object-contain rounded-lg shadow-2xl"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end justify-end p-6">
            <button
              onClick={onDownload}
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300"
              aria-label="Download image"
            >
              <DownloadIcon className="w-5 h-5 rtl:ml-2 rtl:-mr-1" />
              {labels.download}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageDisplay;