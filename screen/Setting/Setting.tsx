import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { ArrowDown2, ArrowLeft2, ArrowRight2, LogoutCurve } from 'iconsax-react-native';
import styles from '../../Css/Setting/Setting';
import color from '../../Custom/Color';
import LinearGradient from 'react-native-linear-gradient';
import gradientPresets from '../../Custom/gradientPresets';
import DropShadow from 'react-native-drop-shadow';
import Animated, {
    SlideInDown,
    Layout,
    SlideOutDown,
    SlideInLeft,
    SlideInRight,
} from 'react-native-reanimated';

const features = [
    {
        id: '1',
        name: 'Account Settings',
        icon: require('../../Icon/acc_set.png'),
        subItems: [
            'Change Password',
            'Add / Remove Gmail',
            'Fingerprint Setup'
        ]
    },
    {
        id: '2',
        name: 'Notification Settings',
        icon: require('../../Icon/edit.png'),
    },
    {
        id: '3',
        name: 'AI Assistant',
        icon: require('../../Icon/edit.png'),
    },
    {
        id: '4',
        name: 'Help & Support',
        icon: require('../../Icon/edit.png'),
    },
];

const SettingScreen = () => {
    const name = 'Thanh Nam';
    const [expandedFeatureId, setExpandedFeatureId] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (expandedFeatureId) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                setExpandedFeatureId(null);
            }, 10000);
        }
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [expandedFeatureId]);

    const handleFeaturePress = (item: any) => {
        if (item.subItems) {
            setExpandedFeatureId(expandedFeatureId === item.id ? null : item.id);
        } else {
            setExpandedFeatureId(null); // đóng nếu nhấn vào mục không có submenu
        }
    };

    const renderItem = ({ item, index }: any) => (
        <Animated.View
            layout={Layout.springify().duration(300)}
            entering={SlideInLeft.duration(300).delay(index * 100)}
        >
            <DropShadow style={[styles.shadowfeature, { shadowColor: color.YELLOW_GRADIENT }]}>
                <TouchableOpacity
                    style={styles.featureItem}
                    onPress={() => handleFeaturePress(item)}>
                    <Image source={item.icon} style={styles.featureIcon} resizeMode="contain" />
                    <Text style={styles.featureText}>{item.name}</Text>

                    {item.id === '1' ? (
                        expandedFeatureId === '1' ? (
                            <ArrowDown2 size={20} color={color.BLACK} variant="TwoTone" style={styles.featureArrow} />
                        ) : (
                            <ArrowRight2 size={20} color={color.BLACK} variant="TwoTone" style={styles.featureArrow} />
                        )
                    ) : (
                        <ArrowRight2 size={20} color={color.BLACK} variant="TwoTone" style={styles.featureArrow} />
                    )}
                </TouchableOpacity>
            </DropShadow>
            {item.subItems && expandedFeatureId === item.id &&
                item.subItems.map((sub: string, subIndex: number) => (
                    <Animated.View
                        key={subIndex}
                        entering={SlideInDown.duration(300).delay(subIndex * 100)}
                        exiting={SlideOutDown.duration(200)}
                        layout={Layout.springify().duration(300)}
                        style={styles.subItem}>
                        <TouchableOpacity style={styles.Vmenu}>
                            <Text style={styles.subItemText}>{sub}</Text>
                            <ArrowRight2 size={20} color={color.BLACK} variant="TwoTone" style={styles.featureArrowmenu} />
                        </TouchableOpacity>
                    </Animated.View>
                ))
            }
        </Animated.View>
    );


    return (
        <LinearGradient
            colors={gradientPresets.airyOceanBlue}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}>

            <Animated.View entering={SlideInRight.duration(300)} style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <ArrowLeft2 size={22} color={color.BLACK} />
                </TouchableOpacity>
                <DropShadow style={[styles.shadow, { shadowColor: color.DARK_GRAY }]}>
                    <View style={styles.VtitleContainer}>
                        <Text style={styles.title}>Setting</Text>
                    </View>
                </DropShadow>
            </Animated.View>
            <DropShadow style={[styles.shadowfeature, { shadowColor: gradientPresets.cottonCandyFade[0] }]}>
                <Animated.View entering={SlideInLeft.duration(300).delay(50)} style={styles.userCard}>
                    <Image
                        source={require('../../Image/sug.png')}
                        style={styles.avatar}
                    />
                    <Text style={styles.username}>{name}</Text>
                </Animated.View>
            </DropShadow>
            <Animated.Text entering={SlideInLeft.duration(300).delay(50)} style={styles.featureTitle}>
                Feature
            </Animated.Text>
            <FlatList
                data={features}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.featureList}
            />

            <TouchableOpacity style={styles.logoutButton}>
                <LogoutCurve size={22} color={color.BLACK} />
                <Text style={styles.logoutText}>Log out</Text>
            </TouchableOpacity>

        </LinearGradient>
    );
};

export default SettingScreen;
