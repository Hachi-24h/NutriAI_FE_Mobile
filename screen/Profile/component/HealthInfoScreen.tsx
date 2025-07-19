import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import color from './Color';
import gradientPresets from './gradientPresets';

const HealthInfoScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Thông tin sức khỏe</Text>
      </View>

      {/* Khối thông tin cá nhân */}
      <View style={styles.card}>
        <Text style={styles.cardText}>
          Đây là nơi chứa các field như:{"\n"}
          - Chiều cao{"\n"}
          - Cân nặng{"\n"}
          - Tuổi{"\n"}
          - Chỉ số BMI (tự tính)
        </Text>
      </View>

      {/* Khối bệnh án */}
      <View style={styles.card}>
        <Text style={styles.cardText}>
          Các bệnh án đã được cung cấp sẽ liệt kê ra tại đây.{"\n"}
          Có nút thêm và sửa thông tin.
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>+ Thêm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOutline}>
            <Text style={styles.buttonTextOutline}>Sửa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default HealthInfoScreen;
