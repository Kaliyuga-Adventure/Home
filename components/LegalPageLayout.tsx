
import React from 'react';

interface LegalPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, children }) => {
  return (
    <div className="bg-white">
      <div className="container mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">{title}</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <div className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-a:text-cyan-600 hover:prose-a:text-cyan-700">
          {children}
        </div>
      </div>
    </div>
  );
};
