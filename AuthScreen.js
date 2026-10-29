import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import { supabase } from './supabase';
import { s } from './styles';

export default function AuthScreen() {
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
    if (isSignUp && !data.session) Alert.alert('تم', 'تحقق من بريدك ثم سجّل الدخول.');
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
            <TouchableOpacity style={s.btn} onPress={() => submit(false)}>
              <Text style={s.btnText}>تسجيل الدخول</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.btn, s.btnAlt]} onPress={() => submit(true)}>
              <Text style={s.btnText}>إنشاء حساب</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
  }
