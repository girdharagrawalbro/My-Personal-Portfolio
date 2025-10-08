import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Login from './Login';
import AdminPanel from './AdminPanel';

const AdminApp = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let subscription: any = null;

    const initializeAuth = async () => {
      try {
        // Check if supabase is properly initialized
        if (!supabase || !supabase.auth) {
          throw new Error('Supabase client not properly initialized');
        }

        // Get current session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Error getting session:', sessionError);
          setError('Authentication service unavailable. Please check your connection.');
        } else {
          setSession(sessionData?.session);
        }

        // Set up auth state listener
        const { data: listener } = supabase.auth.onAuthStateChange(( _event: any, session: any) => {
          setSession(session);
        });

        subscription = listener.subscription;

      } catch (err) {
        console.error('Failed to initialize auth:', err);
        setError('Authentication service is not available. Running in offline mode.');
        // For development, we can skip auth when Supabase is not available
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center max-w-md">
          <div className="bg-red-900/20 border border-red-500 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2 text-red-400">Service Unavailable</h2>
            <p className="text-gray-300 mb-4">{error}</p>
            <p className="text-sm text-gray-400">
              Check your internet connection and Supabase configuration.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Login onLogin={() => supabase.auth.getSession().then(({ data }: any) => setSession(data.session))} />;
  }

  return <AdminPanel />;
};

export default AdminApp;
