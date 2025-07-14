import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import color from '../../../Custom/Color';

const { height } = Dimensions.get('window');

interface FeatureButtonProps {
    label: string;
    description: string;
    icon: React.ReactNode;
    gradientColors: string[];
    onPress?: () => void;
}

export const FeatureButton: React.FC<FeatureButtonProps> = ({
    label,
    description,
    icon,
    gradientColors,
    onPress,
}) => (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
        <LinearGradient colors={gradientColors} style={styles.button}>
            <View style={styles.icon}>{icon}</View>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.description}>{description}</Text>
        </LinearGradient>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        margin: height * 0.01,
        borderRadius: 24,
        overflow: 'hidden',        // giúp gradient và bo góc gọn
        elevation: 8,              // đổ bóng rõ nét hơn
        backgroundColor: '#fff',   // fallback nếu gradient không render ngay
    },

    button: {
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 140,
        paddingVertical: 16,
        paddingHorizontal: 12,
    },
    icon: {
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        fontWeight: '700',
        color: color.WHITE,
        textAlign: 'center',
    },
    description: {
        fontSize: 13,
        marginTop: 4,
        color: color.WHITE,
        opacity: 0.9,
        textAlign: 'center',
    },
});
