
import React, { useEffect, useRef } from 'react';
import { ArrowRight, Smartphone, ShoppingBag, PenTool } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import { Link } from 'react-router-dom';

interface PlatformCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
  className?: string;
}

const PlatformCard: React.FC<PlatformCardProps> = ({ 
  icon, 
  title, 
  description, 
  linkText, 
  linkUrl,
  className
}) => {
  return (
    <GlassCard className={`flex flex-col h-full ${className}`} glowEffect={true}>
      <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-mixip-blue/10 text-mixip-blue">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold mb-4 text-mixip-gray-dark">{title}</h3>
      <p className="text-mixip-gray-medium mb-6 flex-grow">{description}</p>
      <Link 
        to={linkUrl} 
        className="inline-flex items-center text-mixip-blue font-medium hover:underline"
      >
        {linkText} <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </GlassCard>
  );
};

const Platforms: React.FC = () => {
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

  const platforms = [
    {
      icon: <Smartphone className="w-7 h-7" />,
      title: "Xvidia App",
      description: "Capture, protect, and monetize your photos and videos directly from your mobile device. The app keeps your content secure with blockchain registration.",
      linkText: "Explore Xvidia",
      linkUrl: "#xvidia",
      className: "border-t-4 border-t-mixip-blue"
    },
    {
      icon: <ShoppingBag className="w-7 h-7" />,
      title: "Creator's Marketplace",
      description: "License your digital content to businesses, media outlets, and other creators. Manage rights and track usage with our comprehensive platform.",
      linkText: "Visit Marketplace",
      linkUrl: "#marketplace",
      className: "border-t-4 border-t-mixip-purple"
    },
    {
      icon: <PenTool className="w-7 h-7" />,
      title: "Adobe Integration",
      description: "Seamlessly register and protect your content directly from Adobe Creative Suite applications with our powerful plugin.",
      linkText: "Learn More",
      linkUrl: "#adobe",
      className: "border-t-4 border-t-mixip-orange"
    },
  ];

  return (
    <section id="platforms" className="py-24 px-6 md:px-10 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-mixip-mint opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-mixip-blue opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl">
        <div 
          ref={containerRef}
          className="staggered-animation-container text-center mb-16"
        >
          <div className="inline-block mb-6 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
            <span className="text-sm font-medium text-mixip-gray-dark">Platform Components</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-mixip-gray-dark">
            Integrated Digital Rights Solutions
          </h2>
          
          <p className="text-lg text-mixip-gray-medium max-w-2xl mx-auto">
            Our comprehensive ecosystem offers powerful tools for every stage of the content creation and monetization process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {platforms.map((platform, index) => (
            <PlatformCard
              key={index}
              icon={platform.icon}
              title={platform.title}
              description={platform.description}
              linkText={platform.linkText}
              linkUrl={platform.linkUrl}
              className={platform.className}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Platforms;
