import { Footer, Navbar, Services, Transactions, Hero } from './components';
import React from 'react';

const App = () => (
  <main className="min-h-screen">
    <Navbar />
    <Hero />
    <Services />
    <Transactions />
    <Footer />
  </main>
);

export default App;
