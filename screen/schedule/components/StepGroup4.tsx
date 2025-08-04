import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../../Css/schedule/Step01_Goal';

const favorites = ['Thịt bò', 'Cá', 'Rau xanh', 'Trái cây', 'Đậu hủ', 'Khác'];
const dislikes = ['Không có', 'Hải sản', 'Mắm', 'Nội tạng', 'Khác'];
const cuisines = ['Việt', 'Kết hợp Tây', 'Nhật', 'Hàn', 'Không quan trọng'];

type Props = {
    data: {
        favoriteFoods: string;
        avoidFoods: string;
        cuisineStyle: string;
    };
    setData: (data: Props['data']) => void;
};

const StepGroup4 = ({ data, setData }: Props) => {
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
            <Text style={styles.question}>Bạn thích ăn những loại thực phẩm nào?</Text>
            <View style={styles.optionGroup}>
                {renderOptions(favorites, data.favoriteFoods, 'favoriteFoods')}
            </View>

            <Text style={styles.question}>Có món nào bạn không thích hoặc không thể ăn không?</Text>
            <View style={styles.optionGroup}>
                {renderOptions(dislikes, data.avoidFoods, 'avoidFoods')}
            </View>

            <Text style={styles.question}>Bạn muốn chế độ ăn theo phong cách nào?</Text>
            <View style={styles.optionGroup}>
                {renderOptions(cuisines, data.cuisineStyle, 'cuisineStyle')}
            </View>
        </View>
    );
};

export default StepGroup4;
