import React from 'react';
import HeroSection from '../components/Sections/HeroSection';
import ServicesOverview from '../components/Sections/ServicesOverview';

interface HomePageProps {
  onSectionChange: (section: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSectionChange }) => {
  return (
    <div className="animate-fade-in">
      <HeroSection onSectionChange={onSectionChange} />
      <ServicesOverview onSectionChange={onSectionChange} />
    </div>
  );
};

export default HomePage;