import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const ChatScreen = () => {
  const [messages, setMessages] = useState<{ id: string; sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now().toString(), sender: 'user', text: input };
    const aiMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: `🤖 Trả lời giả lập: "${input}"`,
    };

    setMessages([...messages, userMessage, aiMessage]);
    setInput('');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={[styles.message, item.sender === 'user' ? styles.userMsg : styles.aiMsg]}>
            {item.sender === 'user' ? '🧑: ' : ''}{item.text}
          </Text>
        )}
        contentContainerStyle={styles.chatArea}
      />

      <View style={styles.inputArea}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Nhập tin nhắn..."
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F8FF' },
  chatArea: { padding: 16 },
  message: { fontSize: 16, marginVertical: 6 },
  userMsg: { textAlign: 'right', color: '#000' },
  aiMsg: { textAlign: 'left', color: '#007AFF' },
  inputArea: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  sendText: { color: '#fff', fontWeight: 'bold' },
});

export default ChatScreen;
