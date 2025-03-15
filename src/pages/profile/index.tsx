
import ProfileSettings from './ProfileSettings';
import { ProfileProvider } from './context/ProfileContext';

// We're returning the same component but with the ProfileProvider
// This ensures any import of ProfileSettings gets the provider
const ProfileSettingsWithProvider = () => {
  return (
    <ProfileProvider>
      <ProfileSettings />
    </ProfileProvider>
  );
};

export default ProfileSettingsWithProvider;
