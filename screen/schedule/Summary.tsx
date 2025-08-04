// SummaryScreen.tsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from '../../Css/schedule/Step01_Goal';

const SummaryScreen = ({ route }:any) => {
    const { group1, group2, group3, group4, group5 } = route.params;

    const promptText = `Tôi muốn bạn đóng vai một chuyên gia dinh dưỡng để xây dựng một kế hoạch ăn uống cá nhân hóa dựa trên các thông tin người dùng cung cấp bên dưới:\n\n
1. Thời gian áp dụng kế hoạch: ${group1.duration}
2. Mục tiêu chính: ${group1.goal}
3. Chế độ ăn mong muốn: ${group1.diet}

4. Số bữa mỗi ngày: ${group2.mealsPerDay}
5. Giờ ăn ưa thích: ${group2.mealTime}
6. Lịch sinh hoạt: ${group2.sleepSchedule}
7. Mức độ hoạt động thể chất: ${group2.physicalActivity}

8. Dị ứng thực phẩm: ${group3.allergy}
9. Bệnh lý hiện tại: ${group3.condition}
10. Đang sử dụng thuốc/TPCN: ${group3.supplement}

11. Thực phẩm yêu thích: ${group4.favoriteFoods}
12. Thực phẩm muốn tránh: ${group4.avoidFoods}
13. Phong cách ẩm thực mong muốn: ${group4.cuisineStyle}

14. Thói quen nấu ăn: ${group5.cookPreference}
15. Ngân sách mỗi ngày: ${group5.budget}
16. Thiết bị nấu ăn sẵn có: ${group5.equipment}
17. Ghi chú đặc biệt: ${group5.note}

👉 Hãy dựa trên tất cả các yếu tố trên để tạo cho tôi một lịch trình ăn uống hàng ngày chi tiết (theo ngày hoặc theo tuần), đảm bảo:
- Đúng với mục tiêu và thời gian đề ra.
- Hạn chế thực phẩm không phù hợp (dị ứng, không thích...).
- Dễ thực hiện với thói quen và thiết bị sẵn có.
- Cân đối dinh dưỡng.
- Có thể gợi ý món ăn cụ thể cho từng bữa (nếu được).

Trình bày kế hoạch thật rõ ràng và dễ áp dụng!`;

    return (
        <ScrollView contentContainerStyle={styles.scroll}>
            <Text style={styles.stepTitle}>Tóm tắt câu trả lời</Text>

            <View style={{ marginTop: 16, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 8 }}>
                <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>
                    Đây là yêu cầu tổng hợp để gửi AI tạo lịch trình ăn uống cho người dùng:
                </Text>
                <Text style={{ fontSize: 16, lineHeight: 22 }}>{promptText}</Text>
            </View>
        </ScrollView>
    );
};

export default SummaryScreen;
