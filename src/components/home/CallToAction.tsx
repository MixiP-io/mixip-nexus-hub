
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 px-6 md:px-10 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-mixip-blue via-mixip-purple to-mixip-blue"></div>
          
          {/* Overlay Pattern */}
          <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0%,_transparent_70%)]"></div>
          
          {/* Content */}
          <div className="relative py-16 px-8 md:py-20 md:px-16 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to Transform Your Digital Content Management?
              </h2>
              
              <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
                Join thousands of creators who are protecting and monetizing their digital assets with MixiP's revolutionary platform.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/signup" 
                  className="px-8 py-4 bg-white text-mixip-blue rounded-full font-medium flex items-center justify-center hover:bg-opacity-90 transition-colors shadow-lg shadow-black/10"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a 
                  href="#demo" 
                  className="px-8 py-4 bg-transparent text-white border border-white/30 rounded-full font-medium hover:bg-white/10 transition-colors"
                >
                  Request Demo
                </a>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white opacity-10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
