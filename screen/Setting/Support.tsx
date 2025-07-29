import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SupportScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛠 Hỗ Trợ Người Dùng</Text>
      <Text style={styles.subtitle}>Bạn cần giúp gì hôm nay?</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChatAI')}>
        <Text style={styles.buttonText}>💬 Chat với AI</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E9F3FF' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 30 },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontSize: 16 },
});

export default SupportScreen;
