
import { useState } from 'react';

export const useMetadataFields = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedLicense, setSelectedLicense] = useState<string>('standard');
  const [usageRights, setUsageRights] = useState<Record<string, boolean>>({
    commercial: false,
    editorial: false,
    perpetual: false,
    worldwide: false
  });

  // Wrapper for usageRights to ensure type compatibility
  const handleUsageRightsChange = (rights: Record<string, boolean>) => {
    setUsageRights(rights);
  };

  return {
    tags,
    setTags,
    selectedLicense,
    setSelectedLicense,
    usageRights,
    handleUsageRightsChange
  };
};
