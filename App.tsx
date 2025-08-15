
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PackageList } from './components/PackageList';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { PackageDetail } from './components/PackageDetail';
import { LoginPage } from './components/LoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { allPackagesData } from './data/packages';
import type { TravelPackage, Page } from './types';
import { AboutUsSnippet } from './components/AboutUsSnippet';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutUsPage } from './components/AboutUsPage';
import { Testimonials } from './components/Testimonials';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsAndConditionsPage } from './components/TermsAndConditionsPage';
import { PaymentPolicyPage } from './components/PaymentPolicyPage';
import { CancellationPolicyPage } from './components/CancellationPolicyPage';


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  
  const [packages, setPackages] = useState<TravelPackage[]>(() => {
    try {
      const storedPackages = localStorage.getItem('kaliyugaAdventurePackages');
      return storedPackages ? JSON.parse(storedPackages) : allPackagesData;
    } catch (error) {
      console.error("Could not parse packages from localStorage, using default.", error);
      return allPackagesData;
    }
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      // Persist the packages state to localStorage whenever it changes.
      localStorage.setItem('kaliyugaAdventurePackages', JSON.stringify(packages));
    } catch (error) {
      console.error("Could not save packages to localStorage", error);
    }
  }, [packages]);

  useEffect(() => {
    if (selectedPackage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedPackage]);
  
  useEffect(() => {
    // Redirect to login if trying to access admin page while not authenticated
    if (currentPage === 'admin' && !isAuthenticated) {
      setCurrentPage('login');
    }
  }, [currentPage, isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('admin');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('home');
  };

  const handleDeletePackage = (id: number) => {
    setPackages(prev => prev.filter(p => p.id !== id));
  };

  const handleSavePackage = (pkg: Omit<TravelPackage, 'id'> & { id?: number }) => {
    if (pkg.id) {
      // Edit existing
      setPackages(prev => prev.map(p => p.id === pkg.id ? { ...p, ...pkg } as TravelPackage : p));
    } else {
      // Add new
      const newId = packages.length > 0 ? Math.max(...packages.map(p => p.id)) + 1 : 1;
      const newPackage: TravelPackage = { ...pkg, id: newId };
      setPackages(prev => [...prev, newPackage]);
    }
  };

  const handleSaveHomepageLayout = (featuredIds: number[]) => {
    setPackages(prev =>
      prev.map(p => {
        const featuredIndex = featuredIds.indexOf(p.id);
        if (featuredIndex !== -1) {
          // It's a featured package
          return { ...p, isFeatured: true, featuredOrder: featuredIndex + 1 };
        } else if (p.isFeatured) {
          // It's no longer featured, so we remove the properties
          const { isFeatured, featuredOrder, ...rest } = p;
          return rest as TravelPackage;
        }
        // Not featured and wasn't featured, return as is.
        return p;
      })
    );
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        const featuredPackages = packages
          .filter(p => p.isFeatured)
          .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));
        return (
          <>
            <Hero onExplore={() => setCurrentPage('packages')} />
            <AboutUsSnippet />
            <PackageList 
              packages={featuredPackages} 
              onViewDetails={setSelectedPackage}
              title="Popular Destinations"
              showFilters={false}
            />
            <WhyChooseUs />
            <Testimonials />
          </>
        );
      case 'about':
        return <AboutUsPage destinationCount={packages.length} />;
      case 'packages':
        const sortedPackages = [...packages].sort((a,b) => a.id - b.id);
        return <PackageList packages={sortedPackages} onViewDetails={setSelectedPackage} title="All Travel Packages" showFilters={true} />;
      case 'contact':
        return <ContactForm />;
      case 'privacy-policy':
        return <PrivacyPolicyPage />;
      case 'terms-and-conditions':
        return <TermsAndConditionsPage />;
      case 'payment-policy':
        return <PaymentPolicyPage />;
      case 'cancellation-policy':
        return <CancellationPolicyPage />;
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      case 'admin':
        return (
          <AdminDashboard
            packages={packages}
            onSave={handleSavePackage}
            onDelete={handleDeletePackage}
            onSaveHomepageLayout={handleSaveHomepageLayout}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {currentPage !== 'login' && (
        <Header
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
        />
      )}
      <main>
        {renderPage()}
      </main>
      {currentPage !== 'login' && <Footer onNavigate={setCurrentPage} />}
      {selectedPackage && (
        <PackageDetail 
          packageInfo={selectedPackage} 
          onClose={() => setSelectedPackage(null)} 
        />
      )}
    </>
  );
};

export default App;