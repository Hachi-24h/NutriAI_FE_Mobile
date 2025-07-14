/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, ScrollView, Image, } from 'react-native';

import { FeatureButton } from './component/FeatureButton';
import LinearGradient from 'react-native-linear-gradient';
import {

    Chart,
    Flag,
    Camera,
    Notification,
    HambergerMenu,
    FtxToken,
} from 'iconsax-react-native';
import color from '../../Custom/Color';
import styles from '../../Css/Home/home'; // Import styles from the new file
import TodayOverview from './component/TodayOverview';
import gradientPresets from '../../Custom/gradientPresets';
import Footer from '../other/footer';


const Home = () => {

    return (
        <View style={{ flex: 1 }}>
            {/* Gradient Header */}
            <LinearGradient
                colors={[color.gradient1, color.gradient2, color.gradient3]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >
                <View style={styles.headerRow}>
                    <HambergerMenu size={24} color={color.WHITE} />
                    <View style={styles.headerTextGroup}>

                        <Text style={styles.headerTitle}>Nutri AI</Text>
                    </View>
                    <Notification size={24} color={color.WHITE} variant="Bold" />
                </View>
            </LinearGradient>

            {/* body */}
            <ScrollView style={styles.container}>
                {/* Chào mừng người dùng */}
                <Text style={styles.greeting}>Chào mừng, Nam!</Text>
                <View style={styles.suggestionBox}>
                    <View style={styles.Vicon}>
                        <Image
                            source={require('../../Image/sug.png')}
                            style={styles.suggestionImage}
                        />
                    </View>
                    <View style={styles.Vtextsugestion}>
                        <Text style={styles.suggestionText}>
                            💡 Mẹo hôm nay: Hãy uống đủ nước để duy trì quá trình trao đổi chất!
                        </Text>
                    </View>
                </View>

                {/* Chức năng */}
                <View>
                    <Text style={styles.sectionTitle}>Main Features</Text>
                    <LinearGradient
                        colors={gradientPresets.oceanBreeze}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}

                        style={styles.cham} />
                    <View style={styles.row}>
                        <FeatureButton
                            label="Gợi ý thực đơn"
                            description="AI thông minh"
                            icon={<Chart size={28} color={color.WHITE} variant="Bold" />}
                            gradientColors={gradientPresets.lavenderDream}

                        />
                        <FeatureButton
                            label="Báo cáo"
                            description="Theo dõi tiến trình"
                            icon={<Chart size={28} color={color.WHITE} variant="Bold" />}
                            gradientColors={gradientPresets.iceMintGlow}
                        />
                    </View>
                    <View style={styles.row}>
                        <FeatureButton
                            label="Mục tiêu"
                            description="Đặt mục tiêu mới"
                            icon={<Flag size={28} color={color.WHITE} variant="Bold" />}
                            gradientColors={gradientPresets.reportCard}
                        />

                        <FeatureButton
                            label="Quét ảnh"
                            description="Nhận diện thức ăn"
                            icon={<Camera size={28} color={color.WHITE} variant="Bold" />}
                            gradientColors={gradientPresets.cottonCandyFade}
                        />
                    </View>
                </View>
                <TodayOverview />


                {/* Bữa ăn gần đây */}
                <View style={styles.mealSection}>
                    <View style={styles.mealHeader}>
                        <View style={styles.mealHeaderLeft}>

                            <FtxToken size={25} color={color.PRIMARY_BLUE} variant="Bold" />

                            <Text style={styles.sectionTitle}>Bữa ăn gần đây</Text>
                        </View>
                        <Text style={styles.viewAll}>Xem tất cả</Text>
                    </View>

                    <View style={styles.mealCard}>
                        <View style={styles.mealRow}>
                            <View style={[styles.dot, { backgroundColor: '#F87171' }]} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.mealTitle}>Phở bò Hà Nội</Text>
                                <Text style={styles.mealTime}>Sáng • 7:30 AM</Text>
                            </View>
                            <View>
                                <Text style={styles.kcal}>420 kcal</Text>
                                <Text style={styles.protein}>Protein: 25g</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.mealCard}>
                        <View style={styles.mealRow}>
                            <View style={[styles.dot, { backgroundColor: '#34D399' }]} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.mealTitle}>Salad cá hồi nướng</Text>
                                <Text style={styles.mealTime}>Trưa • 12:15 PM</Text>
                            </View>
                            <View>
                                <Text style={styles.kcal}>380 kcal</Text>
                                <Text style={styles.protein}>Protein: 32g</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.mealCard}>
                        <View style={styles.mealRow}>
                            <View style={[styles.dot, { backgroundColor: '#34D399' }]} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.mealTitle}>Salad cá hồi nướng</Text>
                                <Text style={styles.mealTime}>Trưa • 12:15 PM</Text>
                            </View>
                            <View>
                                <Text style={styles.kcal}>380 kcal</Text>
                                <Text style={styles.protein}>Protein: 32g</Text>
                            </View>
                        </View>
                    </View>
                </View>
                {/* Mẹo dinh dưỡng */}

            </ScrollView>
            <Footer />
        </View>

    );
};

export default Home;
