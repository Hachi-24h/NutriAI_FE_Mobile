import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../../Css/schedule/Step01_Goal';

const mealCounts = ['2 bữa', '3 bữa', '3 bữa + phụ', 'Tùy ngày'];
const mealTimes = ['7h - 12h - 18h', '8h - 13h - 19h', 'Tự chọn'];
const sleepSchedules = ['6h - 22h', '7h - 23h', 'Không cố định'];
const physicalLevels = ['Ngồi nhiều', 'Tập gym', 'Chạy bộ', 'Vận động nhẹ', 'Khác'];

type Props = {
    data: {
        mealsPerDay: string;
        mealTime: string;
        sleepSchedule: string;
        physicalActivity: string;
    };
    setData: (data: Props['data']) => void;
};

const StepGroup2 = ({ data, setData }: Props) => {
    const renderOptions = (
        options: string[],
        selected: string,
        key: keyof Props['data']
    ) =>
        options.map((option) => (
            <TouchableOpacity
                key={option}
                style={[
                    styles.optionButton,
                    selected === option && styles.selectedButton,
                ]}
                onPress={() => setData({ ...data, [key]: option })}
            >
                <Text
                    style={[
                        styles.optionText,
                        selected === option && styles.selectedText,
                    ]}
                >
                    {option}
                </Text>
            </TouchableOpacity>
        ));

    return (
        <View>
            <Text style={styles.question}>Mỗi ngày bạn muốn ăn bao nhiêu bữa?</Text>
            <View style={styles.optionGroup}>
                {renderOptions(mealCounts, data.mealsPerDay, 'mealsPerDay')}
            </View>

            <Text style={styles.question}>Thời gian các bữa ăn của bạn thường vào lúc nào?</Text>
            <View style={styles.optionGroup}>
                {renderOptions(mealTimes, data.mealTime, 'mealTime')}
            </View>

            <Text style={styles.question}>Bạn thường dậy lúc mấy giờ và đi ngủ lúc mấy giờ?</Text>
            <View style={styles.optionGroup}>
                {renderOptions(sleepSchedules, data.sleepSchedule, 'sleepSchedule')}
            </View>

            <Text style={styles.question}>Mức độ hoạt động thể chất của bạn như thế nào?</Text>
            <View style={styles.optionGroup}>
                {renderOptions(physicalLevels, data.physicalActivity, 'physicalActivity')}
            </View>
        </View>
    );
};

export default StepGroup2;
