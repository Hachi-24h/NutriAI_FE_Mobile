import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../../Css/schedule/Step01_Goal';

const allergies = ['Không', 'Hải sản', 'Hạt', 'Sữa', 'Khác'];
const conditions = ['Không', 'Tiểu đường', 'Cao huyết áp', 'Gan nhiễm mỡ', 'Dạ dày', 'Khác'];
const supplements = ['Không', 'Thuốc kê đơn', 'Thực phẩm chức năng', 'Cả hai'];

type Props = {
    data: {
        allergy: string;
        condition: string;
        supplement: string;
    };
    setData: (data: Props['data']) => void;
};

const StepGroup3 = ({ data, setData }: Props) => {
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
            <Text style={styles.question}>Bạn có dị ứng với thực phẩm nào không?</Text>
            <View style={styles.optionGroup}>
                {renderOptions(allergies, data.allergy, 'allergy')}
            </View>

            <Text style={styles.question}>Bạn có đang mắc các bệnh lý nào không?</Text>
            <View style={styles.optionGroup}>
                {renderOptions(conditions, data.condition, 'condition')}
            </View>

            <Text style={styles.question}>Bạn có đang dùng thuốc hay thực phẩm chức năng nào không?</Text>
            <View style={styles.optionGroup}>
                {renderOptions(supplements, data.supplement, 'supplement')}
            </View>
        </View>
    );
};

export default StepGroup3;
