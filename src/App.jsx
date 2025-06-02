import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SecretPage from './pages/SecretPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

function App() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-black dark:text-white">
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
