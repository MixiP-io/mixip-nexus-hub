
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import AnimatedLogo from '../ui/AnimatedLogo';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Xvidia App', href: '#xvidia' },
    { name: 'Marketplace', href: '#marketplace' },
    { name: 'Features', href: '#features' },
    { name: 'About', href: '#about' }
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 px-6 md:px-10 transition-all duration-300',
        isScrolled ? 'py-3 bg-white/80 backdrop-blur-md shadow-sm' : 'py-5 bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 z-50">
          <AnimatedLogo size="sm" />
          <span className={cn(
            'font-semibold text-lg transition-all duration-300',
            isScrolled ? 'text-mixip-gray-dark' : 'text-mixip-gray-dark'
          )}>
            MixiP
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a 
              key={item.name}
              href={item.href}
              className={cn(
                'text-sm font-medium underline-animation',
                isScrolled ? 'text-mixip-gray-dark' : 'text-mixip-gray-dark'
              )}
            >
              {item.name}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Link 
            to="/login" 
            className={cn(
              'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300',
              isScrolled 
                ? 'bg-mixip-blue text-white' 
                : 'bg-white/90 backdrop-blur-sm text-mixip-blue border border-mixip-blue/30'
            )}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? (
            <X className={isScrolled ? 'text-mixip-gray-dark' : 'text-mixip-gray-dark'} />
          ) : (
            <Menu className={isScrolled ? 'text-mixip-gray-dark' : 'text-mixip-gray-dark'} />
          )}
        </button>

        {/* Mobile Menu */}
        <div className={cn(
          'fixed inset-0 bg-white flex flex-col justify-center items-center transition-transform duration-300 ease-in-out md:hidden',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}>
          <div className="flex flex-col items-center space-y-8">
            {navItems.map((item) => (
              <a 
                key={item.name}
                href={item.href}
                className="text-xl font-medium text-mixip-gray-dark"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <Link 
              to="/login" 
              className="mt-4 px-8 py-3 bg-mixip-blue text-white rounded-full text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
