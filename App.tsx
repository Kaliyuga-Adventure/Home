
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PackageList } from './components/PackageList';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { PackageDetail } from './components/PackageDetail';
import { AdminLoginPage } from './components/LoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { allPackagesData } from './data/packages';
import { initialSlideshowData } from './data/slideshow';
import { initialTestimonialsData } from './data/testimonials';
import { initialSiteStats } from './data/site';
import type { TravelPackage, Page, Customer, SlideshowImage, Testimonial, SiteStats } from './types';
import { AboutUsSnippet } from './components/AboutUsSnippet';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutUsPage } from './components/AboutUsPage';
import { Testimonials } from './components/Testimonials';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsAndConditionsPage } from './components/TermsAndConditionsPage';
import { PaymentPolicyPage } from './components/PaymentPolicyPage';
import { CancellationPolicyPage } from './components/CancellationPolicyPage';
import { CustomerLoginPage } from './components/CustomerLoginPage';
import { SignUpPage } from './components/SignUpPage';
import { BasicDetailsPage } from './components/BasicDetailsPage';
import { OtpVerificationPage } from './components/OtpVerificationPage';
import { ProfilePage } from './components/ProfilePage';


const App: React.FC = () => {
  const [currentPage, _setCurrentPage] = useState<Page>('home');
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  
  const setCurrentPage = (page: Page) => {
    _setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const [packages, setPackages] = useState<TravelPackage[]>(() => {
    try {
      const storedPackages = localStorage.getItem('kaliyugaAdventurePackages');
      return storedPackages ? JSON.parse(storedPackages) : allPackagesData;
    } catch (error) {
      console.error("Could not parse packages from localStorage, using default.", error);
      return allPackagesData;
    }
  });
  
  const [slideshowImages, setSlideshowImages] = useState<SlideshowImage[]>(() => {
    try {
      const storedSlides = localStorage.getItem('kaliyugaAdventureSlideshow');
      return storedSlides ? JSON.parse(storedSlides) : initialSlideshowData;
    } catch (error) {
      console.error("Could not parse slideshow images from localStorage, using default.", error);
      return initialSlideshowData;
    }
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const stored = localStorage.getItem('kaliyugaAdventureTestimonials');
      return stored ? JSON.parse(stored) : initialTestimonialsData;
    } catch (error) {
      console.error("Could not parse testimonials from localStorage, using default.", error);
      return initialTestimonialsData;
    }
  });

  const [siteStats, setSiteStats] = useState<SiteStats>(() => {
    try {
      const stored = localStorage.getItem('kaliyugaAdventureSiteStats');
      return stored ? JSON.parse(stored) : initialSiteStats;
    } catch (error) {
      console.error("Could not parse site stats from localStorage, using default.", error);
      return initialSiteStats;
    }
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isCustomerAuthenticated, setIsCustomerAuthenticated] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [pendingCustomer, setPendingCustomer] = useState<Pick<Customer, 'name' | 'email'> | null>(null);


  useEffect(() => {
    try {
      localStorage.setItem('kaliyugaAdventurePackages', JSON.stringify(packages));
    } catch (error) {
      console.error("Could not save packages to localStorage", error);
    }
  }, [packages]);

  useEffect(() => {
    try {
      localStorage.setItem('kaliyugaAdventureSlideshow', JSON.stringify(slideshowImages));
    } catch (error) {
      console.error("Could not save slideshow images to localStorage", error);
    }
  }, [slideshowImages]);

  useEffect(() => {
    try {
      localStorage.setItem('kaliyugaAdventureTestimonials', JSON.stringify(testimonials));
    } catch (error) {
      console.error("Could not save testimonials to localStorage", error);
    }
  }, [testimonials]);

  useEffect(() => {
    try {
      localStorage.setItem('kaliyugaAdventureSiteStats', JSON.stringify(siteStats));
    } catch (error) {
      console.error("Could not save site stats to localStorage", error);
    }
  }, [siteStats]);

  useEffect(() => {
    if (selectedPackage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedPackage]);
  
  useEffect(() => {
    // Redirect to login if trying to access admin page while not authenticated
    if (currentPage === 'admin' && !isAdminAuthenticated) {
      setCurrentPage('login');
    }
  }, [currentPage, isAdminAuthenticated]);

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
    setCurrentPage('admin');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentPage('home');
  };

  const handleCustomerLogin = (customer: Customer) => {
    setIsCustomerAuthenticated(true);
    setCurrentCustomer(customer);
    setCurrentPage('home'); // or redirect to a customer dashboard
  };

  const handleCustomerLogout = () => {
    setIsCustomerAuthenticated(false);
    setCurrentCustomer(null);
    setCurrentPage('home');
  };
  
  const handleSignUp = (customerData: Pick<Customer, 'name' | 'email'>) => {
    setPendingCustomer(customerData);
    setCurrentPage('otp-verification');
  };

  const handleOtpVerification = (otp: string): boolean => {
    if (otp === '123456' && pendingCustomer) {
      const newCustomer: Customer = {
        id: Date.now(),
        ...pendingCustomer,
      };
      setIsCustomerAuthenticated(true);
      setCurrentCustomer(newCustomer);
      setPendingCustomer(null);
      setCurrentPage('basic-details'); 
      return true;
    }
    return false;
  };
  
  const handleUpdateCustomerDetails = (details: Partial<Omit<Customer, 'id' | 'email'>>) => {
    if (currentCustomer) {
      setCurrentCustomer(prev => prev ? { ...prev, ...details } : null);
    }
  };

  const handleDeletePackage = (id: number) => {
    setPackages(prev => prev.filter(p => p.id !== id));
  };

  const handleSavePackage = (pkg: Omit<TravelPackage, 'id'> & { id?: number }) => {
    if (pkg.id) {
      setPackages(prev => prev.map(p => p.id === pkg.id ? { ...p, ...pkg } as TravelPackage : p));
    } else {
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
          return { ...p, isFeatured: true, featuredOrder: featuredIndex + 1 };
        } else if (p.isFeatured) {
          const { isFeatured, featuredOrder, ...rest } = p;
          return rest as TravelPackage;
        }
        return p;
      })
    );
  };
  
  const handleSaveSlideshowImages = (images: SlideshowImage[]) => {
    setSlideshowImages(images);
  };
  
  const handleSaveTestimonials = (updatedTestimonials: Testimonial[]) => {
    setTestimonials(updatedTestimonials);
  };

  const handleSaveSiteStats = (updatedStats: SiteStats) => {
    setSiteStats(updatedStats);
  };

  const showHeaderAndFooter = !['login', 'customer-login', 'signup', 'otp-verification', 'basic-details'].includes(currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        const featuredPackages = packages
          .filter(p => p.isFeatured)
          .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));
        return (
          <>
            <Hero onExplore={() => setCurrentPage('packages')} slides={slideshowImages} />
            <AboutUsSnippet stats={siteStats} />
            <PackageList 
              packages={featuredPackages} 
              onViewDetails={setSelectedPackage}
              title="Popular Destinations"
              showFilters={false}
            />
            <WhyChooseUs />
            <Testimonials testimonials={testimonials} />
          </>
        );
      case 'about':
        return <AboutUsPage destinationCount={packages.length} stats={siteStats} />;
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
        return <AdminLoginPage onLogin={handleAdminLogin} />;
      case 'customer-login':
        return <CustomerLoginPage onLogin={handleCustomerLogin} onNavigate={setCurrentPage} />;
      case 'signup':
        return <SignUpPage onSignUp={handleSignUp} onNavigate={setCurrentPage} />;
       case 'otp-verification':
        if (!pendingCustomer) {
            setCurrentPage('signup');
            return null;
        }
        return <OtpVerificationPage email={pendingCustomer.email} onVerify={handleOtpVerification} onNavigate={setCurrentPage} />;
      case 'basic-details':
        if (!currentCustomer) {
            setCurrentPage('signup');
            return null;
        }
        return <BasicDetailsPage customer={currentCustomer} onSave={(details) => {
            handleUpdateCustomerDetails(details);
            setCurrentPage('home');
        }} onNavigate={setCurrentPage} />;
      case 'profile':
        if (!currentCustomer) {
            setCurrentPage('customer-login');
            return null;
        }
        return <ProfilePage customer={currentCustomer} onSave={handleUpdateCustomerDetails} onNavigate={setCurrentPage} />;
      case 'admin':
        return (
          <AdminDashboard
            packages={packages}
            onSave={handleSavePackage}
            onDelete={handleDeletePackage}
            onSaveHomepageLayout={handleSaveHomepageLayout}
            slideshowImages={slideshowImages}
            onSaveSlideshowImages={handleSaveSlideshowImages}
            testimonials={testimonials}
            onSaveTestimonials={handleSaveTestimonials}
            siteStats={siteStats}
            onSaveSiteStats={handleSaveSiteStats}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {showHeaderAndFooter && (
        <Header
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isAdminAuthenticated={isAdminAuthenticated}
          onAdminLogout={handleAdminLogout}
          isCustomerAuthenticated={isCustomerAuthenticated}
          onCustomerLogout={handleCustomerLogout}
          currentCustomer={currentCustomer}
        />
      )}
      <main>
        {renderPage()}
      </main>
      {showHeaderAndFooter && <Footer onNavigate={setCurrentPage} isCustomerAuthenticated={isCustomerAuthenticated} />}
      {selectedPackage && (
        <PackageDetail 
          packageInfo={selectedPackage} 
          onClose={() => setSelectedPackage(null)} 
          isCustomerAuthenticated={isCustomerAuthenticated}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};

export default App;