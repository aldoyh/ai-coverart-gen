import React, { useState } from 'react';
import { GeneratedImage } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';

interface ImageHistoryProps {
  history: GeneratedImage[];
  onSelect: (image: GeneratedImage) => void;
  onClear: () => void;
}

const ImageHistory: React.FC<ImageHistoryProps> = ({ history, onSelect, onClear }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (history.length === 0) return null;

  const downloadImage = (image: GeneratedImage, e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = image.imageUrl;
    link.download = `${image.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${image.id}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-6 w-full">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <svg
            className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <h2 className="text-lg font-semibold">
            History ({history.length})
          </h2>
        </button>
        <button
          onClick={onClear}
          className="text-sm text-red-400 hover:text-red-300 transition-colors"
        >
          Clear All
        </button>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {history.map((image) => (
            <div
              key={image.id}
              onClick={() => onSelect(image)}
              className="relative group cursor-pointer rounded-lg overflow-hidden border-2 border-gray-700 hover:border-purple-500 transition-all duration-200 aspect-video bg-gray-800"
            >
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-200 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                <p className="text-white text-xs font-medium px-2 text-center mb-2 line-clamp-2">
                  {image.title}
                </p>
                <button
                  onClick={(e) => downloadImage(image, e)}
                  className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  <DownloadIcon className="w-3 h-3" />
                  Download
                </button>
              </div>
              <div className="absolute top-1 right-1 bg-gray-900/80 text-white text-xs px-2 py-1 rounded">
                {image.aspectRatio}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(ImageHistory);
