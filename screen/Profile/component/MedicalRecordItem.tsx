import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import gradientPresets from '../../../Custom/gradientPresets';

type MedicalRecordItemProps = {
    title: string;
    date: string;
    severity: 'Nhẹ' | 'Trung bình' | 'Nặng';
    onPressDetail: () => void;
};

const MedicalRecordItem = ({ title, date, severity, onPressDetail }: MedicalRecordItemProps) => {
    return (
      <LinearGradient
        colors={gradientPresets.cottonCandyFade}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
        >
      
   
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.severity, severityStyles[severity]]}>{severity}</Text>
      </View>
      <Text style={styles.date}>🗓 {date}</Text>

      <TouchableOpacity style={styles.button} onPress={onPressDetail}>
        <Text style={styles.buttonText}>Xem chi tiết</Text>
      </TouchableOpacity>
     </LinearGradient >
  );
};

const severityStyles = {
    'Nhẹ': { color: '#4CAF50' },
    'Trung bình': { color: '#FFC107' },
    'Nặng': { color: '#F44336' },
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    severity: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    date: {
        marginTop: 8,
        fontSize: 14,
        color: '#666',
    },
    button: {
        marginTop: 12,
        backgroundColor: '#007AFF',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 14,
    },
});

export default MedicalRecordItem;
