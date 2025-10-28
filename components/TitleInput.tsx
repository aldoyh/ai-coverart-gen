
import React from 'react';
import { MagicWandIcon } from './icons/MagicWandIcon';

interface TitleInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent) => void;
  isLoading: boolean;
  aspectRatio: string;
  onAspectRatioChange: (ratio: string) => void;
}

const aspectRatios = [
  { value: '16:9', label: 'Landscape' },
  { value: '1:1', label: 'Square' },
  { value: '9:16', label: 'Portrait' },
];

const TitleInput: React.FC<TitleInputProps> = ({ value, onChange, onSubmit, isLoading, aspectRatio, onAspectRatioChange }) => {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="e.g., The Lost City of Atlantis..."
          disabled={isLoading}
          className="w-full flex-grow px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
          aria-label="YouTube or episode title"
        />
        <button
          type="submit"
          disabled={isLoading || !value}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <MagicWandIcon className="w-5 h-5" />
              Generate Art
            </>
          )}
        </button>
      </div>
      <div className="flex items-center justify-center gap-2 sm:gap-4 mt-4">
        <span className="text-sm font-medium text-gray-400 shrink-0">Aspect Ratio:</span>
        <div className="flex items-center gap-2 rounded-lg bg-gray-700/50 p-1 border border-gray-600">
          {aspectRatios.map((ratio) => (
            <button
              key={ratio.value}
              type="button"
              onClick={() => onAspectRatioChange(ratio.value)}
              disabled={isLoading}
              className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed
              ${aspectRatio === ratio.value
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-gray-300 hover:bg-gray-600'
              }`}
              aria-pressed={aspectRatio === ratio.value}
            >
              {ratio.label} <span className="hidden sm:inline">({ratio.value})</span>
            </button>
          ))}
        </div>
      </div>
    </form>
  );
};

export default TitleInput;
