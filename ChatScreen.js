import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { supabase } from './supabase';
import { useChat } from './useChat';
import { s } from './styles';

export default function ChatScreen({ session }) {
  const { messages, text, setText, sending, send, newChat } = useChat(session.user.id);
  const listRef = useRef(null);

  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => supabase.auth.signOut()}>
          <Text style={s.headerBtn}>خروج</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>المساعد الذكي</Text>
        <TouchableOpacity onPress={newChat}>
          <Text style={s.headerBtn}>جديدة</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(_, i) => String(i)}
        contentContainerStyle={{ padding: 12 }}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        ListEmptyComponent={<Text style={s.empty}>اسألني أي سؤال...</Text>}
        renderItem={({ item }) => (
          <View style={[s.bubble, item.role === 'user' ? s.userBubble : s.botBubble]}>
            <Text style={s.msgText} selectable>{item.content}</Text>
          </View>
        )}
      />
      {sending && <Text style={s.thinking}>يفكر ويبحث...</Text>}
      <View style={s.inputRow}>
        <TouchableOpacity style={s.sendBtn} onPress={send} disabled={sending}>
          <Text style={s.btnText}>إرسال</Text>
        </TouchableOpacity>
        <TextInput style={[s.input, { flex: 1, marginBottom: 0 }]} placeholder="اكتب سؤالك"
          placeholderTextColor="#888" value={text} onChangeText={setText} multiline />
      </View>
    </SafeAreaView>
  );
  }
