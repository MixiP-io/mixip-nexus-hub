
import React, { useEffect, useRef } from 'react';
import { Shield, Gift, PieChart, Image, Users, Lock, Coins, Database } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <GlassCard className="h-full">
      <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-mixip-blue/10 text-mixip-blue">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-mixip-gray-dark">{title}</h3>
      <p className="text-mixip-gray-medium">{description}</p>
    </GlassCard>
  );
};

const Features: React.FC = () => {
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

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Blockchain Protection",
      description: "Secure your digital content with immutable blockchain records that verify ownership and authenticity."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Decentralized ID",
      description: "Control your identity and content with a robust DD-ID system built on Solana blockchain."
    },
    {
      icon: <Image className="w-6 h-6" />,
      title: "Asset Management",
      description: "Organize, tag, and manage all your digital assets with AI-powered tools and metadata enhancement."
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Licensing Framework",
      description: "Create and manage comprehensive licensing agreements for all usage types with just a few clicks."
    },
    {
      icon: <Coins className="w-6 h-6" />,
      title: "Smart Monetization",
      description: "Generate revenue through licensing, royalties, and content syndication with automated payments."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Rights Clearance",
      description: "Easily obtain and manage permissions from people featured in your content through streamlined workflows."
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "AI Data Curation",
      description: "Prepare and license your content for AI training with ethical usage controls and compliance verification."
    },
    {
      icon: <PieChart className="w-6 h-6" />,
      title: "Analytics Dashboard",
      description: "Track content performance, licensing activity, and revenue streams with comprehensive analytics."
    }
  ];

  return (
    <section id="features" className="py-24 px-6 md:px-10 relative overflow-hidden bg-gradient-to-b from-white to-mixip-gray-light">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-mixip-blue opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-mixip-purple opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl">
        <div 
          ref={containerRef}
          className="staggered-animation-container text-center mb-16"
        >
          <div className="inline-block mb-6 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-sm">
            <span className="text-sm font-medium text-mixip-gray-dark">Powerful Features</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-mixip-gray-dark">
            Revolutionary Digital Asset Management
          </h2>
          
          <p className="text-lg text-mixip-gray-medium max-w-2xl mx-auto">
            MixiP combines blockchain security, AI capabilities, and intuitive tools to transform how creators protect and monetize their work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
