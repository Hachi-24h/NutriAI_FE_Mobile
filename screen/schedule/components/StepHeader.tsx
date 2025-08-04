// StepHeader.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import color from '../../../Custom/Color';

import Animated, { SlideInLeft, SlideOutLeft, Layout } from 'react-native-reanimated';
import DropShadow from 'react-native-drop-shadow';

const { width, height } = Dimensions.get('window');

const stepTitles = ['1', '2', '3', '4', '5'];

const stepColors = [
    color.PRIMARY_BLUE,
    color.GREEN,
    color.YELLOW_GRADIENT,
    '#F66D44',  // orange
    '#A259FF',  // purple
];

const shadowColors = [
    '#2F80ED99', // blue shadow
    '#25A18E99', // green shadow
    '#FDC83099', // yellow shadow
    '#F66D4499', // orange shadow
    '#A259FF99', // purple shadow
];

type StepHeaderProps = {
    currentStep: number;
    onStepPress?: (step: number) => void;
};

const StepHeader = ({ currentStep, onStepPress }: StepHeaderProps) => {
    return (
        <View style={styles.container}>
            {stepTitles.map((title, index) => {
                const stepNumber = index + 1;
                const isActive = currentStep === stepNumber;
                const fillColor = isActive ? stepColors[index] : color.WHITE;
                const shadowColor = isActive ? shadowColors[index] : color.SHADOW_BLACK;
                const strokeColor = isActive ? stepColors[index] : color.GRAY;
                const textColor = isActive ? color.WHITE : color.BLACK;

                return (
                    <Animated.View
                        key={index}
                        style={[
                            styles.svgWrapper,
                            index > 0 && { marginLeft: -width * 0.045 },
                            { zIndex: stepTitles.length - index },
                        ]}
                        entering={SlideInLeft.duration(400).delay(index * 100)}
                        exiting={SlideOutLeft.duration(200)}
                        layout={Layout.springify().duration(300)}
                    >
                        <DropShadow style={[styles.shadowWrapper, { shadowColor }]}>  
                            <TouchableOpacity
                                onPress={() => {
                                    if (onStepPress) {
                                        onStepPress(stepNumber);
                                    }
                                }}
                            >
                                <View style={styles.arrowContainer}>
                                    <Svg width={width * 0.22} height={height * 0.075} viewBox="0 0 100 60">
                                        <Path
                                            d="M0 0 H80 L100 30 L80 60 H0 Z"
                                            fill={fillColor}
                                            stroke={strokeColor}
                                            strokeWidth="2"
                                        />
                                    </Svg>
                                    <Text style={[styles.stepText, { color: textColor }]}> {stepNumber} </Text>
                                </View>
                            </TouchableOpacity>
                        </DropShadow>
                    </Animated.View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: height * 0.03,
        flexWrap: 'wrap',
    },
    svgWrapper: {
        position: 'relative',
        alignItems: 'center',
    },
    arrowContainer: {
        position: 'relative',
        width: width * 0.22,
        height: height * 0.075,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepText: {
        position: 'absolute',
        fontSize: height * 0.019,
        fontWeight: '700',
        textAlign: 'center',
    },
    stepLabel: {
        marginTop: 4,
        fontSize: 12,
        textAlign: 'center',
        color: '#555',
    },
    shadowWrapper: {
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
    },
});

export default StepHeader;
