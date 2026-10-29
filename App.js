import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import { supabase } from './supabase';
import AuthScreen from './AuthScreen';
import ChatScreen from './ChatScreen';
import { s } from './styles';

export default function App() {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, sess) => setSession(sess));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return <View style={[s.container, { justifyContent: 'center' }]}><ActivityIndicator color="#4f8cff" /></View>;
  }
  return (
    <>
      <StatusBar barStyle="light-content" />
      {session ? <ChatScreen session={session} /> : <AuthScreen />}
    </>
  );
       }
