import React from 'react';

interface LegalPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, children }) => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-24">
        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-md">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">{title}</h1>
            <p className="text-sm text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <div className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-a:text-cyan-600 hover:prose-a:text-cyan-700 prose-p:mb-5 prose-h2:mb-4 prose-h2:mt-10 prose-h3:mb-3 prose-h3:mt-8 prose-ul:space-y-3 prose-li:pl-2">
              {children}
            </div>
        </div>
      </div>
    </div>
  );
};