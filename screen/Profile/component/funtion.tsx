import React from 'react';
import { View, Text,  ScrollView } from 'react-native';
import styles from '../../../Css/profile/funtion';
const UserProfileScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hồ sơ cá nhân</Text>

      {/* Thông tin người dùng */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
        <View style={styles.infoRow}><Text style={styles.label}>Họ tên:</Text><Text>Phan Thanh Nam</Text></View>
        <View style={styles.infoRow}><Text style={styles.label}>Tuổi:</Text><Text>28</Text></View>
        <View style={styles.infoRow}><Text style={styles.label}>Chiều cao:</Text><Text>170 cm</Text></View>
        <View style={styles.infoRow}><Text style={styles.label}>Cân nặng:</Text><Text>65 kg</Text></View>
        <View style={styles.infoRow}><Text style={styles.label}>Giới tính:</Text><Text>Nam</Text></View>
      </View>

      {/* Mục tiêu sức khỏe */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mục tiêu sức khỏe</Text>
        <Text>🚶 8,000 bước/ngày</Text>
        <Text>🔥 2,200 kcal/ngày</Text>
        <Text>💧 2.5 lít nước/ngày</Text>
        <Text>🛌 7-8 giờ ngủ/ngày</Text>
      </View>

      {/* Tiến trình */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tiến trình gần đây</Text>
        <View style={styles.placeholder}><Text style={styles.placeholderText}>[Biểu đồ tiến trình ở đây]</Text></View>
      </View>

      {/* Bệnh án */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bệnh án</Text>
        <Text>🩺 Cao huyết áp (2022)</Text>
        <Text>🏥 Viêm họng (2023)</Text>
        <Text>💊 Dị ứng kháng sinh</Text>
      </View>

      {/* Cài đặt */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cài đặt</Text>
        <Text>🔔 Thông báo: Bật</Text>
        <Text>🌐 Ngôn ngữ: Tiếng Việt</Text>
        <Text>🔒 Bảo mật 2 lớp: Đã bật</Text>
      </View>
    </ScrollView>
  );
};

export default UserProfileScreen;
