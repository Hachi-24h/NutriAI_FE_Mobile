import { StyleSheet } from "react-native";
import { height, width } from "../../Utils/dimension";
import color from "../../Custom/Color";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: width * 0.05,
        backgroundColor: color.WHITE,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: height * 0.02,
        paddingTop: height * 0.02,
        paddingLeft: width * 0.04,
        borderRadius: width * 0.05,
    },
    shadow: {
        shadowOffset: { width: -5, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 0,
        width: width * 1,
    },
    VtitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.PRIMARY_BLUE,
        borderTopLeftRadius: width * 0.1,
        borderBottomLeftRadius: width * 0.1,
        paddingVertical: height * 0.015,
        marginLeft: width * 0.1,
        paddingHorizontal: width * 0.1,
    },
    title: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
        color: color.BLACK,
        textAlign: 'left',
        flex: 1,
    },
    pageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.02,
    },
    backButton: {
        marginRight: width * 0.02,
        color: color.PRIMARY_BLUE,
    },
    pageTitle: {
        fontSize: height * 0.03,
        fontWeight: 'bold',
        color: color.DARK_GRAY,
    },
    // cardBox: {
    //     backgroundColor: color.WHITE,
    //     borderRadius: width * 0.04,
    //     padding: width * 0.04,
    //     shadowColor: color.GREEN,
    //     shadowOffset: { width: 0, height: 4 },
    //     shadowOpacity: 0.12,
    //     shadowRadius: width * 0.02,
    //     elevation: 6,

    //     // Chiều rộng/cao đảo vai trò vì đã xoay
    //     width: height * 0.75,  // sau khi xoay thành chiều ngang
    //     height: width * 0.9,  // sau khi xoay thành chiều cao

    //     // Xoay và căn chỉnh vị trí
    //     transform: [
    //         { rotate: '90deg' },
    //         { translateX: height * 0.2 },   // chỉnh nếu thấy lệch trái/phải
    //         { translateY: 0 },   // chỉnh nếu thấy lệch trên/dưới
    //     ],

    //     alignSelf: 'center',
    // },

       cardBox: {
        backgroundColor: color.WHITE,
        borderRadius: width * 0.04,
        padding: width * 0.04,
        shadowColor: color.GREEN,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: width * 0.02,
        elevation: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:width*0.025,
        // Chiều rộng/cao đảo vai trò vì đã xoay
        width: width *0.95,  // sau khi xoay thành chiều ngang
        height: height * 0.8,  // sau khi xoay thành chiều cao

    
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: height * 0.02,
        marginBottom: height * 0.02,
    },
    headerTitle: { fontSize: height * 0.025, fontWeight: 'bold', color: color.DARK_GRAY },
    weekNav: { fontSize: height * 0.025, paddingHorizontal: width * 0.02, color: color.PRIMARY_BLUE },
    row: { flexDirection: 'row', minHeight: 90, alignItems: 'center' },
    headerCell: {
        backgroundColor: color.LIGHT_GRAY,
        paddingVertical: 8,
        paddingHorizontal: 4,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        margin: 2,
    },
    labelCell: {
        paddingHorizontal: 8,
        textAlign: 'center',
        fontWeight: '600',
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: color.BACK_BLUE,
        borderRadius: 8,
        margin: 2,
        color: color.DARK_BLUE
    },
    cell: {
        borderWidth: 1,
        borderColor: '#eee',
        padding: 6,
        minHeight: 70,
        justifyContent: 'center',
        backgroundColor: color.WHITE,
        borderRadius: 8,
        margin: 2,
    },
    cellFilled: {
        borderWidth: 1,
        borderColor: color.LIGHT_BLUE,
        backgroundColor: color.LIGHT_BLUE,
        padding: width * 0.02,
        height: height * 0.1,
        minHeight: 100,
        justifyContent: 'center',
        borderRadius: 8,
        margin: height * 0.01,
    },
    mealDish: { fontWeight: '600', fontSize: 14, color: color.DARK_BLUE },
    mealTime: { fontSize: 12, color: color.GRAY },
    emptyText: { textAlign: 'center', color: color.GRAY, fontStyle: 'italic' },
    bold: { fontWeight: 'bold' },
    tableHeaderCell: {
        backgroundColor: color.LIGHT_GRAY,
        paddingVertical: 8,
        paddingHorizontal: 4,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
    },
    todayCellBorder: {
        borderColor: 'red',
        borderWidth: 2,
    }
});

export default styles;