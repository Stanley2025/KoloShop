// src/components/Footer.tsx

import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="max-w-7xl mx-auto text-center">
        <p>&copy; {currentYear} KoloShop. All Rights Reserved.</p>
        <p className="text-sm text-gray-400">
          Koloshop
        </p>
      </div>
    </footer>
  );
};

export default Footer;