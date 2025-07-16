import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Animated,
    TouchableWithoutFeedback,
} from 'react-native';
import color from '../../../Custom/Color';

const { height, width } = Dimensions.get('window');

interface SideMenuProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (option: string) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ visible, onClose, onSelect }) => {
    const slideAnim = useRef(new Animated.Value(-width * 0.7)).current;
    const [show, setShow] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (visible) {
            setShow(true);
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start();

            timeoutRef.current = setTimeout(() => {
                handleClose();
            }, 10000);
        } else if (show) {
            Animated.timing(slideAnim, {
                toValue: -width * 0.7,
                duration: 300,
                useNativeDriver: false,
            }).start(() => {
                setShow(false);
            });

            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    const handleClose = () => {
        Animated.timing(slideAnim, {
            toValue: -width * 0.7,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            setShow(false);
            onClose();
        });
    };

    if (!show) return null;

    return (
        <TouchableWithoutFeedback onPress={handleClose}>
            <View style={styles.overlay}>
                <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
                    <View style={styles.functionMain}>
                        <TouchableOpacity style={styles.menuItem} onPress={() => { onSelect('Profile'); handleClose(); }}>
                            <Text style={styles.menuText}>Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem} onPress={() => { onSelect('Meal History'); handleClose(); }}>
                            <Text style={styles.menuText}>Meal History</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem} onPress={() => { onSelect('Settings'); handleClose(); }}>
                            <Text style={styles.menuText}>Settings</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem} onPress={() => { onSelect('Tutorial'); handleClose(); }}>
                            <Text style={styles.menuText}>Tutorial</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem} onPress={() => { onSelect('Change Password'); handleClose(); }}>
                            <Text style={styles.menuText}>Change Password</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.menuItem, { marginTop: height * 0.4 }]} onPress={() => { onSelect('Logout'); handleClose(); }}>
                            <Text style={styles.menuText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    menuContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: width * 0.6,
        backgroundColor: color.WHITE,
        paddingVertical: height * 0.05,
        paddingHorizontal: width * 0.05,
        elevation: 8,
        height: height,
    },
    functionMain: {
        height: height * 0.9,
        width: '100%',
    },
    menuItem: {
        paddingVertical: height * 0.02,
        borderBottomWidth: 1,
        borderBottomColor: color.BACK_BLUE,
    },
    menuText: {
        fontSize: height * 0.022,
        color: color.BLUE_BUTTON,
    },
});

export default SideMenu;
