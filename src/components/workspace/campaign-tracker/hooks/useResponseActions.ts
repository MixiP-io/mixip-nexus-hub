
import { useState } from 'react';

export const useResponseActions = () => {
  const [selectedCreator, setSelectedCreator] = useState<number | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleViewProfile = (creatorId: number) => {
    setSelectedCreator(creatorId);
    setShowProfileModal(true);
  };

  const handleCloseProfile = () => {
    setShowProfileModal(false);
  };

  const handleShortlist = (creatorId: number) => {
    console.log('Shortlisted creator:', creatorId);
  };

  const handleMessage = (creatorId: number) => {
    console.log('Messaging creator:', creatorId);
  };

  return {
    selectedCreator,
    showProfileModal,
    handleViewProfile,
    handleCloseProfile,
    handleShortlist,
    handleMessage
  };
};
