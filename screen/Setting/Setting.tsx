import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { ArrowLeft2, ArrowRight2, LogoutCurve } from 'iconsax-react-native';
import styles from '../../Css/Setting/Setting';
import color from '../../Custom/Color';
import LinearGradient from 'react-native-linear-gradient';
import gradientPresets from '../../Custom/gradientPresets';
import DropShadow from 'react-native-drop-shadow';

const features = [
    { id: '1', name: 'Account Settings', icon: require('../../Icon/acc_set.png') },
    { id: '2', name: 'Notification Settings', icon: require('../../Icon/edit.png') },
    { id: '3', name: 'AI Assistant', icon: require('../../Icon/edit.png') },
    { id: '4', name: 'Help & Support', icon: require('../../Icon/edit.png') },
];

const SettingScreen = () => {
    const name = 'Thanh Nam';
    const renderItem = ({ item }: any) => (
        <TouchableOpacity style={styles.featureItem}>
            <Image source={item.icon} style={styles.featureIcon} resizeMode="contain" />
            <Text style={styles.featureText}>{item.name}</Text>
            <ArrowRight2 size={20} color={color.BLACK} variant="TwoTone" style={styles.featureArrow} />
        </TouchableOpacity>
    );

    return (
        <LinearGradient
            colors={gradientPresets.airyOceanBlue}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}>




            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <ArrowLeft2 size={22} color={color.BLACK} />
                </TouchableOpacity>
                <DropShadow style={styles.shadow}>
                    <View style={styles.VtitleContainer}>
                        <Text style={styles.title}>Setting</Text>
                    </View>
                </DropShadow>
            </View>

            {/* Thông tin user */}
            <View style={styles.userCard}>
                <Image
                    source={require('../../Image/sug.png')}
                    style={styles.avatar}
                />
                <Text style={styles.username}>{name}</Text>
            </View>

            {/* Danh sách tính năng */}
            <Text style={styles.featureTitle}>Feature</Text>
            <FlatList
                data={features}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.featureList}
            />

            {/* Đăng xuất */}
            <TouchableOpacity style={styles.logoutButton}>
                <LogoutCurve size={22} color={color.BLACK} />
                <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>

        </LinearGradient >
    );
};

export default SettingScreen;
