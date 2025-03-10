
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-mixip-mint opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-mixip-blue opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-mixip-purple opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 md:px-10 max-w-7xl">
        <div 
          ref={containerRef}
          className="staggered-animation-container flex flex-col items-center text-center"
        >
          <div className="inline-block mb-6 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
            <span className="text-sm font-medium text-mixip-gray-dark">Introducing MixiP Platform</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-4xl text-stretch text-mixip-gray-dark">
            Protect, Manage & Monetize Your Digital Content
          </h1>
          
          <p className="text-lg md:text-xl text-mixip-gray-medium mb-10 max-w-2xl text-balance">
            A decentralized platform empowering creators with blockchain technology and AI to secure and profit from their digital assets.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link 
              to="/signup" 
              className="px-8 py-4 bg-mixip-blue text-white rounded-full font-medium flex items-center justify-center hover:bg-mixip-blue-dark transition-colors shadow-lg shadow-mixip-blue/20"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a 
              href="#learn-more" 
              className="px-8 py-4 bg-white text-mixip-gray-dark border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors"
            >
              Learn More
            </a>
          </div>
          
          <div className="relative w-full max-w-4xl shadow-2xl shadow-mixip-blue/10 rounded-2xl overflow-hidden">
            <div className="aspect-video bg-white/80 backdrop-blur-sm p-1">
              <div className="w-full h-full bg-mixip-gray-light rounded-xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-mixip-gray-medium font-medium">
                    Platform Preview
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-mixip-blue opacity-10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-mixip-mint opacity-10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
