import React from 'react';

 // make sure this CSS file exists

const Home = () => {
  return (
    <>
      
      <div className="hero-section">
        <div className="overlay">
          <div className="hero-content">
            <h1>Unlimited movies, TV shows, and more.</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <p>Ready to watch? Enter your email to create or restart your membership.</p>
            <div className="email-signup">
              <input type="email" placeholder="Email address" />
              <button>Get Started</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
