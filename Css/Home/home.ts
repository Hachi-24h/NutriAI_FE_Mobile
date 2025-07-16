import { StyleSheet, Dimensions } from 'react-native';
import color from '../../Custom/Color';

const { height, width } = Dimensions.get('window');


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: height * 0.02,
        marginTop: height * 0.1,
        // paddingTop: height * 0.1, // Adjusted to account for the header
        backgroundColor: color.WHITE,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        paddingHorizontal: height * 0.02,
        paddingVertical: height * 0.02,
        paddingBottom: 24,
    },

    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    headerTextGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: height * 0.05,
        width: height * 0.05,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: '#ffffff',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 4,
        letterSpacing: 1,
        textTransform: 'uppercase',
        fontStyle: 'italic',
    },

    headerSubtitle: {
        fontSize: 13,
        color: color.WHITE,
        opacity: 0.85,
        marginTop: 4,
    },
    greeting: {
        fontSize: 22,
        fontWeight: '600',
        color: '#1E3C72', // Xanh dương đậm hiện đại
        marginTop: 12,
        marginBottom: 4,
        textAlign: 'left',
        letterSpacing: 0.5,
    },

    subtext: {
        fontSize: 16,
        fontWeight: '400',
        color: '#4A6FA5', // Xanh nhạt dịu
        marginBottom: 16,
        textAlign: 'left',
        opacity: 0.9,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: color.DARK_GRAY,
        marginLeft: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mealCard: {
        backgroundColor: color.WHITE,
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
        shadowColor: color.SHADOW_BLACK,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    mealHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 12,
    },

    mealHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    mealHeaderIcon: {
        fontSize: 16,
        marginRight: 6,
    },

    viewAll: {
        fontSize: 14,
        color: color.PRIMARY_BLUE,
        fontWeight: '500',
        textDecorationLine: 'underline',
    },

    mealRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: color.RED,
        marginRight: 12,
    },
    mealTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: color.BLACK,
    },
    mealTime: {
        fontSize: 13,
        color: color.GRAY,
    },
    kcal: {
        fontSize: 14,
        fontWeight: '600',
        color: color.PRIMARY_BLUE,
        textAlign: 'right',
    },
    protein: {
        fontSize: 13,
        color: color.GRAY,
        textAlign: 'right',
    },
    tipCard: {
        backgroundColor: color.LIGHT_GRAY,
        borderRadius: 12,
        padding: 14,
        marginTop: 16,
        marginBottom: 30,
    },
    tipTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 6,
        color: color.BLACK,
    },
    tipText: {
        fontSize: 14,
        color: color.GRAY,
        lineHeight: 20,
    },
    mealSection: {
        backgroundColor: color.WHITE,
        borderRadius: height * 0.02,
        marginTop: height * 0.02,
        padding: height * 0.02,
        elevation: 6, // tăng nhẹ để đổ bóng rõ hơn
        marginBottom: height * 0.05,
        borderWidth: 1,
        borderColor: '#F0F0F0', // sáng hơn một chút
    },
    cham: {
        height: height * 0.08,
        width: height * 0.08,
        elevation: 12,
        borderRadius: height * 0.05,
        marginBottom: height * 0.02,
        position: 'absolute',
        top: height * 0.18,
        left: width * 0.38,
        zIndex: 109,
    },
    suggestionBox: {
        flexDirection: 'row',
        backgroundColor: color.WHITE,
        width: '100%',
        paddingVertical: height * 0.04,
    },
    suggestionText: {
        fontSize: 14,
        color: '#1C3D63',
        fontStyle: 'italic',
        lineHeight: 20,
        textAlign: 'left',
        padding:height* 0.01,
    },
    Vtextsugestion: {
        backgroundColor: color.WHITE,
        borderRadius: 16,
        elevation: 3,
        borderLeftWidth: 4,
        borderLeftColor: '#2A86FF',
        marginBottom: height * 0.02,
        marginHorizontal: height * 0.02,
        width: '80%',
    },
    Vicon: {
        paddingTop: height * 0.03,
    },
    suggestionImage: {
        width: 50,
        height: 50,
    }
});

export default styles;
