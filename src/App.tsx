import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import LoansPage from './pages/LoansPage';
import InsurancePage from './pages/InsurancePage';
import MutualFundsPage from './pages/MutualFundsPage';
import CustomerPortalPage from './pages/CustomerPortalPage';
import ContactPage from './pages/ContactPage';
import StudyAbroadPage from './pages/StudyAbroadPage';
import InvestmentsPage from './pages/InvestmentsPage';
import B1B2VisaPage from './pages/B1B2VisaPage';
import CibilCoApplicantPage from './pages/CibilCoApplicantPage';

function App() {
  const [currentSection, setCurrentSection] = useState('home');

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'home':
        return <HomePage onSectionChange={setCurrentSection} />;
      case 'loans':
        return <LoansPage />;
      case 'insurance':
        return <InsurancePage />;
      case 'mutual-funds':
        return <MutualFundsPage />;
      case 'investments':
        return <InvestmentsPage />;
      case 'study-abroad':
        return <StudyAbroadPage />;
      case 'b1b2-visa':
        return <B1B2VisaPage />;
      case 'cibil-issues':
        return <CibilCoApplicantPage />;
      case 'portal':
        return <CustomerPortalPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onSectionChange={setCurrentSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentSection={currentSection} onSectionChange={setCurrentSection} />
      <main>
        {renderCurrentSection()}
      </main>
      <Footer onSectionChange={setCurrentSection} />
    </div>
  );
}

export default App;