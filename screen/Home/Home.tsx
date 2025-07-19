/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, } from 'react-native';

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
import SideMenu from './component/SideMenu';


const Home = () => {
    const tip = " Stay hydrated to keep your metabolism running efficiently! "
    const [menuVisible, setMenuVisible] = useState(false);

    const handleMenuSelect = (option: string) => {
        console.log('Selected:', option);
        setMenuVisible(false);
    };
    return (
        <View style={{ flex: 1, backgroundColor: color.LIGHT_BLUE }}>
            {/* Gradient Header */}
            <LinearGradient
                colors={[color.gradient1, color.gradient2, color.gradient3]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => setMenuVisible(true)}>
                        <HambergerMenu size={24} color={color.WHITE} />
                    </TouchableOpacity>
                    <View style={styles.headerTextGroup}>

                        <Text style={styles.headerTitle}>Nutri AI</Text>
                    </View>
                    <Notification size={24} color={color.WHITE} variant="Bold" />
                </View>
            </LinearGradient>

            {/* body */}
            <ScrollView style={styles.container}>
                {/* Chào mừng người dùng */}
                <Text style={styles.greeting}>Hello, Nam!</Text>
                <View style={styles.suggestionBox}>
                    <View style={styles.Vicon}>
                        <Image
                            source={require('../../Image/sug.png')}
                            style={styles.suggestionImage}
                        />


                    </View>
                    <View style={styles.Vtextsugestion}>
                        <Text style={styles.suggestionText}>
                            💡 Today’s Tip:{tip}
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
                            label="Scan Image"
                            description="Recognize food"
                            icon={<Camera size={28} color={color.WHITE} variant="Bold" />}
                            gradientColors={gradientPresets.cottonCandyFade}
                        />
                        <FeatureButton
                            label="Meal Suggestions"
                            description="Smart AI"
                            icon={<Chart size={28} color={color.WHITE} variant="Bold" />}
                            gradientColors={gradientPresets.lavenderDream}

                        />

                    </View>
                    <View style={styles.row}>
                        <FeatureButton
                            label="Goals"
                            description="Set new targets"
                            icon={<Flag size={28} color={color.WHITE} variant="Bold" />}
                            gradientColors={gradientPresets.reportCard}
                        />
                        <FeatureButton
                            label="Reports"
                            description="Track your progress"
                            icon={<Chart size={28} color={color.WHITE} variant="Bold" />}
                            gradientColors={gradientPresets.iceMintGlow}
                        />

                    </View>
                </View>
                <TodayOverview />


                {/* Bữa ăn gần đây */}
                <View style={styles.mealSection}>
                    <View style={styles.mealHeader}>
                        <View style={styles.mealHeaderLeft}>

                            <FtxToken size={25} color={color.PRIMARY_BLUE} variant="Bold" />

                            <Text style={styles.sectionTitle}>What You Ate</Text>
                        </View>
                        <Text style={styles.viewAll}>View all</Text>
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
            <SideMenu
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                onSelect={handleMenuSelect}
            />
            <Footer />
        </View>

    );
};

export default Home;
