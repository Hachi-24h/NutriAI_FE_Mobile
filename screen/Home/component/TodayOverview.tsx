import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import color from '../../../Custom/Color';

const { height } = Dimensions.get('window');

const TodayOverview = () => {
    //   const today = new Date();
    //   const dayOfWeek = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'][today.getDay()];
    //   const dateStr = `${dayOfWeek}, ${today.toLocaleDateString('vi-VN')}`;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Today’s Overview</Text>
                {/* <Text style={styles.date}>{dateStr}</Text> */}
            </View>

            <View style={styles.row}>
                <InfoBox value="1,245" unit="Calories Consumed" sub="Remaining: 555" bg="#FFF4EC" color="#FF8A00" />
                <InfoBox value="85g" unit="Protein" sub="85% of goal" bg="#F0F7FF" color={color.PRIMARY_BLUE} />
                <InfoBox value="156g" unit="Carbs" sub="78% of goal" bg="#ECFAF1" color="#27AE60" />

            </View>

            <ProgressLine label="Calo" current={1245} target={1800} color="#FF8A00" />
            <ProgressLine label="Protein" current={85} target={100} color={color.PRIMARY_BLUE} />
        </View>
    );
};

const InfoBox = ({ value, unit, sub, bg, color }: any) => (
    <View style={[styles.infoBox, { backgroundColor: bg }]}>
        <Text style={[styles.infoValue, { color }]}>{value}</Text>
        <Text style={styles.infoUnit}>{unit}</Text>
        <Text style={[styles.infoSub, { color }]}>{sub}</Text>
    </View>
);

const ProgressLine = ({ label, current, target, color }: any) => {
    const percent = (current / target) * 100;

    return (
        <View style={styles.progressWrapper}>
            <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>{label}</Text>
                <Text style={styles.progressText}>{current} / {target}</Text>
            </View>
            <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${percent}%`, backgroundColor: color }]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.WHITE,
        borderRadius: height * 0.02,
        marginTop: height * 0.02,
        padding: height * 0.02,
        elevation: 6, // tăng nhẹ để đổ bóng rõ hơn
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#F0F0F0', // sáng hơn một chút
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: color.DARK_GRAY,
    },
    date: {
        fontSize: 14,
        color: color.GRAY,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
        marginBottom: 16,
        flexWrap: 'wrap',
    },
    infoBox: {
        width: '30%',
        paddingVertical: height * 0.02,
        paddingHorizontal: 6,
        borderRadius: 12,
        alignItems: 'center',
    },
    infoValue: {
        fontSize: 18,
        fontWeight: '700',
    },
    infoUnit: {
        fontSize: 13,
        color: color.DARK_GRAY,
    },
    infoSub: {
        fontSize: 12,
        marginTop: 4,
        opacity: 0.9,
    },
    progressWrapper: {
        marginTop: 12,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    progressLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: color.DARK_GRAY,
    },
    progressText: {
        fontSize: 13,
        color: color.GRAY,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: 8,
        borderRadius: 4,
    },
});

export default TodayOverview;
