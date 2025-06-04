import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";

const Taglines = ["SaaS", "MVP", "Product", "Project", "Startup", "Platform","AI Startup","Side Project","Next Big Idea"];


function Home() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % Taglines.length);
    }, 1500); // change word every 1.5 sec
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (isSignedIn) {
      navigate("/secret");
      // window.open("/secret", "_blank");
    } else {
      alert("Please sign in to start matching your project with the perfect database.");
    }
  };

  return (
    <section className="text-center py-20 px-4 max-w-3xl mx-auto">
  <h1 className="text-5xl font-extrabold mb-6">
    Match Your Project with the Perfect Database
  </h1>
  <p className="text-lg mb-10 text-gray-700 dark:text-gray-300">
    DBMatch helps developers select the ideal database by analyzing your project’s key requirements and technical factors — powered by AI-driven recommendations for the best match every time.
  </p>
  <div className="text-2xl font-bold mb-4">
        Find the Best Database For Your Next&nbsp;
        <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-bounce">
          {Taglines[index]} <span className="text-white font-bold">🔥</span>
        </span>
      </div>
  <button
    onClick={handleClick}
    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
  >
    Find Your Match 🤞🏻
  </button>
  
  {/* Add some space below button */}
  <div className="mt-12">
    <img
      src="https://res.cloudinary.com/dpf5bkafv/image/upload/v1748867212/yoxd0z3drb1ythz1m7sy.png"
      alt="Database matching illustration"
      className="mx-auto max-w-full h-auto"
    />
  </div>
</section>
  );
}

export default Home;
