import React from 'react';
import { Download, RefreshCw, ZoomIn, Loader2 } from 'lucide-react';
import { GeneratedImage } from '../types';

interface ImageResultProps {
  image: GeneratedImage;
  onDownload: (image: GeneratedImage) => void;
  onRetry?: (image: GeneratedImage) => void;
}

export const ImageResult: React.FC<ImageResultProps> = ({ image, onDownload, onRetry }) => {
  return (
    <div className="group relative aspect-[3/4] rounded-lg overflow-hidden bg-stone-200 shadow-md ring-1 ring-stone-900/5 transition-all hover:shadow-xl">
      {image.status === 'loading' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-100 z-10">
          <Loader2 className="w-8 h-8 text-amber-600 animate-spin mb-3" />
          <p className="text-xs font-medium text-stone-500 uppercase tracking-wider animate-pulse">Rendering...</p>
        </div>
      )}
      
      {image.status === 'success' && (
        <>
          <img 
            src={image.url} 
            alt={image.prompt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100">
             <div className="flex space-x-2 justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
               <button 
                 onClick={() => onDownload(image)}
                 className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-stone-900 shadow-lg hover:bg-stone-50 transition-colors"
                 title="Download High Res"
               >
                 <Download className="w-5 h-5" />
               </button>
               <button 
                 onClick={() => window.open(image.url, '_blank')}
                 className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-stone-900 shadow-lg hover:bg-stone-50 transition-colors"
                 title="View Full Size"
               >
                 <ZoomIn className="w-5 h-5" />
               </button>
             </div>
          </div>
        </>
      )}

      {image.status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-100 text-red-500 p-4 text-center">
           <RefreshCw className="w-8 h-8 mb-2" />
           <p className="text-sm font-medium">Generation Failed</p>
           {onRetry && (
             <button 
               onClick={() => onRetry(image)}
               className="mt-3 flex items-center px-3 py-1.5 bg-white text-stone-700 text-xs font-medium rounded border border-stone-200 shadow-sm hover:bg-stone-50 hover:text-stone-900 transition-colors"
             >
               <RefreshCw className="w-3 h-3 mr-1.5" />
               Retry
             </button>
           )}
        </div>
      )}
    </div>
  );
};