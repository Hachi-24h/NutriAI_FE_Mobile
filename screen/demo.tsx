import React, { useState } from "react";
import {
  View,
  Button,
  ActivityIndicator,
  StyleSheet,
  Text,
  Alert,
} from "react-native";





const HomeScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState<boolean>(false);

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 Chào bạn!</Text>
      <Text style={styles.subtitle}>
        Ấn nút dưới đây để bắt đầu bài kiểm tra từ vựng
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <Button title="📝 Bắt đầu làm bài"  />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#666",
  },
});
