import 'react-native-url-polyfill/auto';
import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator,
  KeyboardAvoidingView, Platform, StyleSheet, StatusBar, Alert, SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://swsxmlgoavjeklccylsc.supabase.co';
const SUPABASE_KEY = 'sb_publishable_dYFZUkr5IJY9KPiWtShDlg_Exay5I9G';
const FUNCTION_NAME = 'hyper-function';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (isSignUp) => {
    if (!email || !password) return Alert.alert('تنبيه', 'أدخل البريد وكلمة المرور');
    setLoading(true);
    const fn = isSignUp ? supabase.auth.signUp : supabase.auth.signInWithPassword;
    const { data, error } = await fn.call(supabase.auth, { email: email.trim(), password });
    setLoading(false);
    if (error) return Alert.alert('خطأ', error.message);
    if (isSignUp && !data.session) {
      Alert.alert('تم', 'تحقق من بريدك لتأكيد الحساب ثم سجّل الدخول.');
    }
  };

  return (
    <SafeAreaView style={s.container}>
      <View style={s.authBox}>
        <Text style={s.title}>المساعد الذكي</Text>
        <TextInput style={s.input} placeholder="البريد الإلكتروني" placeholderTextColor="#888"
          autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <TextInput style={s.input} placeholder="كلمة المرور" placeholderTextColor="#888"
          secureTextEntry value={password} onChangeText={setPassword} />
        {loading ? <ActivityIndicator color="#4f8cff" /> : (
          <>
            <TouchableOpacity style={s.btn} onPress={(
