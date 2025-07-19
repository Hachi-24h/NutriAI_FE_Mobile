// components/CustomFooter.tsx

import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Home,  Scan, Setting2, Notification, Chart } from 'iconsax-react-native';
import color from '../../Custom/Color';




const { width, height } = Dimensions.get('window');


const Footer = () => {

    return (

        <View style={styles.footerContainer}>
            <View style={styles.halfCircle} />
          
            <View style={[styles.buttonfuntion,]} >
                <TouchableOpacity style={styles.navItem}>
                    <Home size={24} color={color.PRIMARY_BLUE} />
                    <Text style={styles.activeLabel}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.navItem]}>
                    <Chart size={24} color="#999" />
                    <Text style={styles.label}>Reports</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.centerWrapper}>
                <LinearGradient
                    colors={["#4DA5FF", "#70D9FF"]}
                    style={styles.centerButton}
                >
                    <TouchableOpacity>
                        <Scan size={28} color="#fff" />
                    </TouchableOpacity>
                </LinearGradient>
            </View>
            <View style={[styles.buttonfuntion]} >
                <TouchableOpacity style={styles.navItem}>
                    <Notification size={24} color="#999" />
                    <Text style={styles.label}>Notification</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Setting2 size={24} color="#999" />
                    <Text style={styles.label}>Setting</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
};

export default Footer;

const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: height * 0.07,
        backgroundColor: color.LIGHT_BLUE,
        elevation: 10,
        // paddingBottom: height * 0.01,
        // paddingHorizontal: width * 0.05,
        // paddingTop: height * 0.01,
        borderTopLeftRadius: height * 0.02,
        borderTopRightRadius: height * 0.02,
        zIndex: 0,
    },
    buttonfuntion: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width * 0.378,
        backgroundColor: color.LIGHT_BLUE,
        marginHorizontal: width * 0.02,
        paddingHorizontal: width * 0.05,
    },
    navItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: height * 0.012,
        color: '#888',
        marginTop: 4,
    },
    activeLabel: {
        fontSize: 12,
        color: color.PRIMARY_BLUE,
        marginTop: 4,
        fontWeight: '600',
    },
    centerWrapper: {
        position: 'absolute',
        bottom: 10,
        top: -25,
        left: (width - 64) / 2,
        zIndex: 10,

    },
    centerButton: {
        width: height * 0.08,
        height: height * 0.08,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 8,
        borderWidth: 2,
        borderColor: color.WHITE,
    },
    halfCircle: {
        width: height * 0.1,                  // Gấp đôi chiều cao để tạo nửa hình tròn
        height: height * 0.06,
        borderTopLeftRadius: height * 0.05,
        borderTopRightRadius: height * 0.05,
        backgroundColor: color.WHITE,              // nếu không dùng gradient
        alignSelf: 'center',
        position: 'absolute',
        top: 0,
        left: (width - height * 0.1) / 2,
        bottom: 0,                             // hoặc -height * 0.075 nếu muốn đẩy ra ngoài một nửa
        zIndex: 3,
        transform: [{ rotate: '180deg' }]

    },
 
});
