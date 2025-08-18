// Add these imports to your App.tsx
import VisaApplicationSystem from './pages/VisaApplicationSystem';
import CibilApplicationSystem from './pages/CibilApplicationSystem';

// Update your renderCurrentSection function:
case 'visa-system':
  return <VisaApplicationSystem />;
case 'cibil-system':
  return <CibilApplicationSystem />;