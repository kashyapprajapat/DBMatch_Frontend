import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 shadow dark:shadow-white/10">
      <Link to="/" className="text-2xl font-bold">🗄️ DBMatch</Link>
      <div>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Login</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}

export default Navbar;
