// components/StepGroup1.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../../Css/schedule/Step01_Goal';

const durations = ['1 week', '2 weeks', '3 weeks', '1 month', 'Long-term'];
const goals = ['Lose weight', 'Build muscle', 'Maintain shape', 'Improve health', 'Support medical condition'];
const diets = ['Not sure', 'Keto', 'Eat Clean', 'Mediterranean', 'Vegan', 'Low-carb'];

type Props = {
    data: {
        duration: string;
        goal: string;
        diet: string;
    };
    setData: (data: { duration: string; goal: string; diet: string }) => void;
};

const StepGroup1 = ({ data, setData }: Props) => {
    const renderOptions = (
        options: string[],
        selected: string,
        key: 'duration' | 'goal' | 'diet'
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
            <Text style={styles.question}>1. How long do you want to follow this plan?</Text>
            <View style={styles.optionGroup}>
                {renderOptions(durations, data.duration, 'duration')}
            </View>

            <Text style={styles.question}>2. What is your main goal?</Text>
            <View style={styles.optionGroup}>
                {renderOptions(goals, data.goal, 'goal')}
            </View>

            <Text style={styles.question}>3. Do you follow any specific diet?</Text>
            <View style={styles.optionGroup}>
                {renderOptions(diets, data.diet, 'diet')}
            </View>
        </View>
    );
};

export default StepGroup1;
