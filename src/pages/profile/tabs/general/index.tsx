
import React from 'react';
import PersonalInfoCard from './PersonalInfoCard';
import SocialLinksCard from './SocialLinksCard';

const GeneralTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <PersonalInfoCard />
      <SocialLinksCard />
    </div>
  );
};

export default GeneralTab;
