
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Using hash fragment
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const error = hashParams.get('error');
        const errorDescription = hashParams.get('error_description');

        if (error) {
          console.error('Error during auth callback:', error, errorDescription);
          toast({
            title: "Authentication failed",
            description: errorDescription || "Could not complete authentication",
            variant: "destructive"
          });
          navigate('/login');
          return;
        }

        // Process the OAuth callback
        const { data, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Error getting session:', sessionError);
          toast({
            title: "Authentication issue",
            description: sessionError.message,
            variant: "destructive"
          });
          navigate('/login');
          return;
        }

        if (data?.session) {
          console.log("Successfully authenticated, redirecting to dashboard");
          toast({
            title: "Signed in successfully",
            description: "Welcome back!",
          });
          navigate('/dashboard');
        } else {
          console.error("No session found after OAuth callback");
          toast({
            title: "Authentication issue",
            description: "Could not establish a session",
            variant: "destructive"
          });
          navigate('/login');
        }
      } catch (err) {
        console.error("Unexpected error in auth callback:", err);
        toast({
          title: "Authentication failed",
          description: "An unexpected error occurred",
          variant: "destructive"
        });
        navigate('/login');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mb-4"></div>
        <h2 className="text-lg font-semibold text-gray-700">Processing login...</h2>
        <p className="mt-2 text-gray-500">Please wait while we complete your authentication.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
