import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { GeneratorForm } from './components/GeneratorForm';
import { ImageResult } from './components/ImageResult';
import { GeneratorSettings, GeneratedImage } from './types';
import { generateJournalPrompts } from './services/gemini';
import { generatePollinationsImage } from './services/pollinations';
import { Info } from 'lucide-react';

export default function App() {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPromptBatch, setCurrentPromptBatch] = useState<string[]>([]);

  const handleGenerate = async (settings: GeneratorSettings) => {
    setIsGenerating(true);
    setImages([]); // Clear previous results or could append if we want a history
    
    try {
      // 1. Generate Prompt Ideas using Gemini
      // If API key is not present, the service handles fallback gracefully
      const prompts = await generateJournalPrompts(settings);
      setCurrentPromptBatch(prompts);

      // 2. Initialize placeholders
      const newImages: GeneratedImage[] = prompts.map((prompt, index) => ({
        id: `img-${Date.now()}-${index}`,
        url: '',
        prompt: prompt,
        createdAt: Date.now(),
        status: 'loading'
      }));
      setImages(newImages);

      // 3. Generate Images in parallel using Pollinations
      const updateImage = (index: number, url: string, status: 'success' | 'error') => {
        setImages(prev => prev.map((img, i) => i === index ? { ...img, url, status } : img));
      };

      const promises = prompts.map(async (prompt, index) => {
        try {
          // Add a random seed for variation even with similar prompts
          const seed = Math.floor(Math.random() * 1000000);
          const url = await generatePollinationsImage(prompt, seed);
          updateImage(index, url, 'success');
        } catch (error) {
          console.error(`Failed to generate image ${index}`, error);
          updateImage(index, '', 'error');
        }
      });

      await Promise.all(promises);

    } catch (error) {
      console.error("Workflow error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRetry = async (image: GeneratedImage) => {
    // 1. Update status to loading
    setImages(prev => prev.map(img => 
      img.id === image.id ? { ...img, status: 'loading' } : img
    ));

    try {
      // 2. Retry generation with a new seed
      const seed = Math.floor(Math.random() * 1000000);
      const url = await generatePollinationsImage(image.prompt, seed);
      
      // 3. Update on success
      setImages(prev => prev.map(img => 
        img.id === image.id ? { ...img, url, status: 'success' } : img
      ));
    } catch (error) {
      // 4. Update on error
      console.error(`Retry failed for image ${image.id}`, error);
      setImages(prev => prev.map(img => 
        img.id === image.id ? { ...img, status: 'error' } : img
      ));
    }
  };

  const handleDownload = (image: GeneratedImage) => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `journal-page-${image.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8 h-full">
        
        {/* Left Panel: Controls */}
        <div className="w-full md:w-96 flex-shrink-0 space-y-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold serif text-stone-900">Create Pages</h1>
            <p className="text-stone-500 mt-2 text-sm leading-relaxed">
              Use Gemini AI to conceptualize unique layouts, textures, and ephemera, 
              then bring them to life with our high-res rendering engine.
            </p>
          </div>
          
          <GeneratorForm onGenerate={handleGenerate} isGenerating={isGenerating} />
          
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
             <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
             <div className="text-xs text-blue-800">
               <span className="font-semibold block mb-1">Tip for best results</span>
               Try specific themes like "Victorian Greenhouse" or "Steampunk Travel Diary" for richer details.
             </div>
          </div>
        </div>

        {/* Right Panel: Results */}
        <div className="flex-1 min-h-[500px]">
           {images.length === 0 && !isGenerating ? (
             <div className="h-full border-2 border-dashed border-stone-200 rounded-xl flex flex-col items-center justify-center text-stone-400">
               <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                 <ImageIconPlaceholder />
               </div>
               <p className="font-medium">Ready to create</p>
               <p className="text-sm mt-1">Generated pages will appear here</p>
             </div>
           ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
               {images.map((img) => (
                 <div key={img.id} className="flex flex-col gap-2">
                    <ImageResult 
                      image={img} 
                      onDownload={handleDownload} 
                      onRetry={handleRetry}
                    />
                    {img.status === 'success' && (
                      <p className="text-xs text-stone-500 line-clamp-2 px-1">
                        <span className="font-semibold text-stone-700">Prompt:</span> {img.prompt}
                      </p>
                    )}
                 </div>
               ))}
             </div>
           )}
        </div>

      </div>
    </Layout>
  );
}

function ImageIconPlaceholder() {
  return (
    <svg className="w-8 h-8 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}