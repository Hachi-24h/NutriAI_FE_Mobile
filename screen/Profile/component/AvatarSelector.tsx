import React from 'react';
import {

  Image,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';
import color from '../../../Custom/Color';
import LinearGradient from 'react-native-linear-gradient';
import gradientPresets from '../../../Custom/gradientPresets';
import { ArrowLeft2 } from 'iconsax-react-native';

interface Props {
  name?: string;
}

const { height, width } = Dimensions.get('window');

const AvatarSelector: React.FC<Props> = ({ name }) => {
  const [avatarUri, setAvatarUri] = React.useState('https://i.imgur.com/K5oARFf.png');

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.assets && response.assets.length > 0) {
        setAvatarUri(response.assets[0].uri || avatarUri);
      }
    });
  };

  const deleteAvatar = () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn xóa ảnh đại diện không?',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Xóa', onPress: () => setAvatarUri('') },
      ],
      { cancelable: true },
    );
  };

  return (
    <MenuProvider>
      <LinearGradient
        colors={gradientPresets.reportCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.avatarContainer}>

        <Menu>
          <MenuTrigger
            triggerOnLongPress
            customStyles={{ TriggerTouchableComponent: TouchableOpacity }}>
            <LinearGradient
              colors={gradientPresets.cottonCandyFade} // dãy màu gradient bạn muốn
              style={styles.gradientBorder}
            >
              <Image source={avatarUri ? { uri: avatarUri } : require('../../../Image/sug.png')} style={styles.avatar} />
            </LinearGradient>
          </MenuTrigger>
        
          <MenuOptions optionsContainerStyle={styles.menuOptions}>
            <MenuOption onSelect={openGallery} text="Change avatar" style={[styles.textopt]} />
            <MenuOption onSelect={deleteAvatar} text="Delete avatar" style={styles.textopt} />
          </MenuOptions>
        </Menu>
          <TouchableOpacity style={styles.buttonBack}>
            <ArrowLeft2 size={height* 0.05} color={color.WHITE} />
          </TouchableOpacity>
        <Text style={styles.name}>{name}</Text>
      </LinearGradient>
    </MenuProvider>
  );
};

export default AvatarSelector;

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    height: height * 0.25,
    backgroundColor: color.BLUE_BUTTON,
    paddingTop: height * 0.02,
    borderBottomLeftRadius: width * 0.1,
    borderBottomRightRadius: width * 0.1,
  },
  // avatar: {
  //   width: width * 0.3,
  //   height: width * 0.3,
  //   borderRadius: width * 0.15,
  //   borderWidth: 3,
  //   borderColor: color.BLACK,
  // },
  name: {
    marginTop: height * 0.02,
    color: color.WHITE,
    fontSize: height * 0.03,
    fontWeight: 'bold',
  },
  menuOptions: {
    marginLeft: width * 0.1,
    backgroundColor: color.WHITE,
    borderRadius: 8,
    shadowColor: color.SHADOW_BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 4,
    shadowRadius: width * 0.02,
    width: width * 0.4,

  },
  textopt: {
    fontSize: width * 0.01,
    color: color.BLACK,
    paddingVertical: width * 0.02,
    paddingHorizontal: width * 0.05,
    fontWeight: '500',
  },
  gradientBorder: {
    padding: 3, // độ dày viền
    borderRadius: width * 0.165, // bán kính viền lớn hơn ảnh bên trong
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
  },
  buttonBack:{
    position: 'absolute',
    top: height * 0.02,
    left: width * 0.05,
  }
});
