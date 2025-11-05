
import React from 'react';
import { DownloadIcon } from './icons/DownloadIcon';
import { ImageIcon } from './icons/ImageIcon';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  title: string;
  onDownload: () => void;
  onCopy?: () => void;
  onShare?: () => void;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({
  imageUrl,
  isLoading,
  error,
  title,
  onDownload,
  onCopy,
  onShare
}) => {
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
          <div className="absolute bottom-4 right-4 flex gap-2">
            {onCopy && (
              <button
                onClick={onCopy}
                className="inline-flex items-center gap-2 px-4 py-2 font-semibold text-white bg-gray-800/70 border border-gray-600 rounded-lg backdrop-blur-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 transition-all duration-300"
                aria-label="Copy to clipboard"
                title="Copy image to clipboard (Ctrl+Shift+C)"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </button>
            )}
            {onShare && navigator.share && (
              <button
                onClick={onShare}
                className="inline-flex items-center gap-2 px-4 py-2 font-semibold text-white bg-gray-800/70 border border-gray-600 rounded-lg backdrop-blur-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 transition-all duration-300"
                aria-label="Share image"
                title="Share image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
            )}
            <button
              onClick={onDownload}
              className="inline-flex items-center gap-2 px-4 py-2 font-semibold text-white bg-gray-800/70 border border-gray-600 rounded-lg backdrop-blur-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 transition-all duration-300"
              aria-label="Download image"
              title="Download image (Ctrl+D)"
            >
              <DownloadIcon className="w-5 h-5" />
              Download
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(ImageDisplay);
