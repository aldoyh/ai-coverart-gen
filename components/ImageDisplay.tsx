
import React from 'react';
import { DownloadIcon } from './icons/DownloadIcon';
import { ImageIcon } from './icons/ImageIcon';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  title: string;
  onDownload: () => void;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading, error, title, onDownload }) => {
  return (
    <div className="mt-6 w-full aspect-video bg-gray-900/50 border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center p-4 relative overflow-hidden">
      {isLoading && (
        <div className="w-full h-full bg-gray-700 animate-pulse"></div>
      )}

      {error && !isLoading && (
        <div className="text-center text-red-400">
          <p className="font-bold">Generation Failed</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!isLoading && !error && !imageUrl && (
        <div className="text-center text-gray-500">
          <ImageIcon className="w-16 h-16 mx-auto mb-4" />
          <p className="text-lg font-medium">Your cover art will appear here</p>
          <p className="text-sm">Enter a title above and click "Generate Art"</p>
        </div>
      )}
      
      {imageUrl && !isLoading && (
        <>
          <img
            src={imageUrl}
            alt={`AI generated cover art for: ${title}`}
            className="w-full h-full object-contain rounded-lg"
          />
          <button
            onClick={onDownload}
            className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2 font-semibold text-white bg-gray-800/70 border border-gray-600 rounded-lg backdrop-blur-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 transition-all duration-300"
            aria-label="Download image"
          >
            <DownloadIcon className="w-5 h-5" />
            Download
          </button>
        </>
      )}
    </div>
  );
};

export default ImageDisplay;
