import React from 'react';
import { BookOpen, Layers, Settings, Image as ImageIcon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-stone-50 text-stone-900">
      {/* Sidebar */}
      <aside className="w-64 border-r border-stone-200 bg-white hidden md:flex flex-col">
        <div className="p-6 border-b border-stone-100">
          <div className="flex items-center space-x-2 text-stone-800">
            <BookOpen className="w-6 h-6" />
            <span className="text-xl font-bold serif tracking-tight">JournalGen</span>
          </div>
          <p className="text-xs text-stone-500 mt-1">SaaS Edition</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <a href="#" className="flex items-center space-x-3 px-3 py-2 text-stone-900 bg-stone-100 rounded-lg font-medium">
            <ImageIcon className="w-5 h-5 text-stone-500" />
            <span>Generator</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 text-stone-600 hover:bg-stone-50 rounded-lg transition-colors">
            <Layers className="w-5 h-5 text-stone-400" />
            <span>Collections</span>
          </a>
          <a href="#" className="flex items-center space-x-3 px-3 py-2 text-stone-600 hover:bg-stone-50 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-stone-400" />
            <span>Settings</span>
          </a>
        </nav>

        <div className="p-4 border-t border-stone-100">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-100">
            <h4 className="text-sm font-semibold text-amber-900 mb-1">Pro Plan Active</h4>
            <p className="text-xs text-amber-700">Unlimited generations with Pollinations API.</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-stone-50/50">
        <div className="max-w-7xl mx-auto min-h-full flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
};
