import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Login from './Login';
import AdminPanel from './AdminPanel';

const AdminApp = () => {
  const [session, setSession] = useState<any>(null);
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (!session) {
    return <Login onLogin={() => supabase.auth.getSession().then(({ data }) => setSession(data.session))} />;
  }
  return <AdminPanel />;
};

export default AdminApp;
