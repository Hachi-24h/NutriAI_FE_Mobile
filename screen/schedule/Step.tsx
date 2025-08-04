import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import styles from '../../Css/schedule/Step01_Goal';

import StepHeader from './components/StepHeader';
import StepGroup1 from './components/StepGroup1';
import StepGroup2 from './components/StepGroup2';
import StepGroup3 from './components/StepGroup3';
import StepGroup4 from './components/StepGroup4';
import StepGroup5 from './components/StepGroup5';

interface StepScreenProps {
    navigation: any;
    route: { params?: { returnToStep?: number } };
}

const StepScreen: React.FC<StepScreenProps> = ({ navigation, route }) => {
    const [step, setStep] = useState(1);

    useEffect(() => {
        if (route.params?.returnToStep) {
            setStep(route.params.returnToStep);
        }
    }, [route.params?.returnToStep]);

    const [group1, setGroup1] = useState({ duration: '', goal: '', diet: '' });
    const [group2, setGroup2] = useState({
        mealsPerDay: '',
        mealTime: '',
        sleepSchedule: '',
        physicalActivity: '',
    });
    const [group3, setGroup3] = useState({
        allergy: '',
        condition: '',
        supplement: '',
    });
    const [group4, setGroup4] = useState({
        favoriteFoods: '',
        avoidFoods: '',
        cuisineStyle: '',
    });
    const [group5, setGroup5] = useState({
        cookPreference: '',
        budget: '',
        equipment: '',
        note: '',
    });

    const isCurrentStepValid = () => {
        switch (step) {
            case 1:
                return group1.duration && group1.goal && group1.diet;
            case 2:
                return group2.mealsPerDay && group2.mealTime && group2.sleepSchedule && group2.physicalActivity;
            case 3:
                return group3.allergy && group3.condition && group3.supplement;
            case 4:
                return group4.favoriteFoods && group4.avoidFoods && group4.cuisineStyle;
            case 5:
                return group5.cookPreference && group5.budget && group5.equipment && group5.note;
            default:
                return false;
        }
    };

    const handleNext = () => {
        if (!isCurrentStepValid()) {
            Alert.alert('Vui lòng chọn đầy đủ thông tin trước khi tiếp tục.');
            return;
        }

        if (step < 5) {
            setStep(step + 1);
        } else {
            navigation.navigate('summary', {
                group1,
                group2,
                group3,
                group4,
                group5,
            });
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            navigation.goBack();
        }
    };

    const renderStepComponent = () => {
        switch (step) {
            case 1:
                return <StepGroup1 data={group1} setData={setGroup1} />;
            case 2:
                return <StepGroup2 data={group2} setData={setGroup2} />;
            case 3:
                return <StepGroup3 data={group3} setData={setGroup3} />;
            case 4:
                return <StepGroup4 data={group4} setData={setGroup4} />;
            case 5:
                return <StepGroup5 data={group5} setData={setGroup5} />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
                <StepHeader
                    currentStep={step}
                    onStepPress={(targetStep: number) => {
                        setStep(targetStep); // ✅ Cho nhảy đến bất kỳ bước nào
                    }}
                />
            </View>

            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.header}>
                    <Text style={styles.stepTitle}>Bước {step}</Text>
                    <Text style={styles.stepSubtitle}>Vui lòng hoàn thành thông tin bên dưới</Text>
                </View>

                {renderStepComponent()}
            </ScrollView>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <Text style={styles.backButtonText}>Quay lại</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                    <Text style={styles.nextButtonText}>
                        {step < 5 ? `Bước ${step + 1}` : 'Hoàn tất'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default StepScreen;
