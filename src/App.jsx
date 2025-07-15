import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SecretPage from './pages/SecretPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { Helmet } from 'react-helmet';


function App() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "DBMatch",
    "operatingSystem": "All",
    "applicationCategory": "WebApplication",
    "description": "DBMatch helps developers select the ideal database based on project needs and technical factors — with AI-powered recommendations.",
    "url": "https://dbmatch.vercel.app/",
    "image": "https://dbmatch.vercel.app/logo.png", 
    "creator": {
      "@type": "Person",
      "name": "kashyap" 
    },
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://dbmatch.vercel.app/"
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-black dark:text-white">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/secret" element={
          <>
            <SignedIn>
              <SecretPage />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
