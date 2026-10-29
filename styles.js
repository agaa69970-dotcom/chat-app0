import { StyleSheet, Platform } from 'react-native';

export const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111418', paddingTop: Platform.OS === 'android' ? 30 : 0 },
  authBox: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 28 },
  input: { backgroundColor: '#1d232b', color: '#fff', borderRadius: 10, padding: 12, marginBottom: 12, textAlign: 'right' },
  btn: { backgroundColor: '#4f8cff', padding: 14, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  btnAlt: { backgroundColor: '#2d3642' },
  btnText: { color: '#fff', fontWeight: 'bold' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: '#222a33' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  headerBtn: { color: '#4f8cff' },
  empty: { color: '#777', textAlign: 'center', marginTop: 60 },
  bubble: { maxWidth: '85%', padding: 12, borderRadius: 14, marginBottom: 10 },
  userBubble: { backgroundColor: '#2b5fd9', alignSelf: 'flex-end' },
  botBubble: { backgroundColor: '#1d232b', alignSelf: 'flex-start' },
  msgText: { color: '#fff', fontSize: 15, lineHeight: 22 },
  thinking: { color: '#4f8cff', textAlign: 'center', paddingBottom: 6 },
  inputRow: { flexDirection: 'row', alignItems: 'center', padding: 10, gap: 8, borderTopWidth: 1, borderTopColor: '#222a33' },
  sendBtn: { backgroundColor: '#4f8cff', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10 },
});
