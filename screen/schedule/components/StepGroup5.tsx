import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../../Css/schedule/Step01_Goal';

const cookingTime = ['Có thời gian nấu', 'Cần thực đơn đơn giản', 'Thường mua bên ngoài'];
const budget = ['< 100k/ngày', '100k - 200k/ngày', '> 200k/ngày', 'Không rõ'];
const equipments = ['Bếp gas', 'Bếp điện', 'Nồi chiên không dầu', 'Lò vi sóng', 'Không có'];
const specialNotes = ['Không', 'Ăn chay kỳ', 'Ưu tiên giảm mỡ', 'Ưu tiên tăng cơ', 'Khác'];

type Props = {
    data: {
        cookPreference: string;
        budget: string;
        equipment: string;
        note: string;
    };
    setData: (data: Props['data']) => void;
};

const StepGroup5 = ({ data, setData }: Props) => {
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
            <Text style={styles.question}>Bạn có thời gian nấu ăn không, hay cần thực đơn đơn giản/dễ mua bên ngoài?</Text>
            <View style={styles.optionGroup}>
                {renderOptions(cookingTime, data.cookPreference, 'cookPreference')}
            </View>

            <Text style={styles.question}>Bạn có ngân sách cụ thể cho mỗi ngày không?</Text>
            <View style={styles.optionGroup}>
                {renderOptions(budget, data.budget, 'budget')}
            </View>

            <Text style={styles.question}>Bạn có thiết bị nấu ăn nào?</Text>
            <View style={styles.optionGroup}>
                {renderOptions(equipments, data.equipment, 'equipment')}
            </View>

            <Text style={styles.question}>Bạn có yêu cầu gì đặc biệt khác không?</Text>
            <View style={styles.optionGroup}>
                {renderOptions(specialNotes, data.note, 'note')}
            </View>
        </View>
    );
};

export default StepGroup5;
