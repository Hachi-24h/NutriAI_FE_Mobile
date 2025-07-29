import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import styles from '../../Css/Setting/gmail';
import { ArrowLeft2, AddCircle, Trash } from 'iconsax-react-native';
import DropShadow from 'react-native-drop-shadow';
import color from '../../Custom/Color';
import { useNavigation } from '@react-navigation/native';
import Footer from '../other/footer';

const GmailManagerScreen = () => {
  const navigation = useNavigation();
  const [gmailList, setGmailList] = useState<string[]>(['user@gmail.com', "hachi2sam@ái.com", "hachisam@23ái.com", "hachis23am@ái.com", "hachisam@ái.com"]);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [tempGmail, setTempGmail] = useState('');
  const [selectedGmail, setSelectedGmail] = useState<string | null>(null);

  const openAddModal = () => {
    if (gmailList.length >= 5) {
      Alert.alert('Limit Reached', 'You can only store up to 5 Gmail addresses.');
      return;
    }
    setTempGmail('');
    setAddModalVisible(true);
  };

  const confirmAddGmail = () => {
    if (!tempGmail.includes('@') || !tempGmail.includes('.')) {
      Alert.alert('Invalid Gmail', 'Please enter a valid Gmail address.');
      return;
    }

    Alert.alert(
      'Confirm Gmail',
      `Are you sure this is your Gmail?\n\n${tempGmail}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            setGmailList([...gmailList, tempGmail]);
            setAddModalVisible(false);
          },
        },
      ]
    );
  };

  const openDeleteModal = (gmail: string) => {
    if (gmailList.length <= 1) {
      Alert.alert('Cannot Delete', 'At least one Gmail must be kept.');
      return;
    }
    setSelectedGmail(gmail);
    setDeleteModalVisible(true);
  };

  const confirmDeleteGmail = () => {
    if (!selectedGmail) return;

    setGmailList(gmailList.filter(g => g !== selectedGmail));
    setDeleteModalVisible(false);
    setSelectedGmail(null);
  };

  const renderGmailItem = ({ item }: { item: string }) => (
    <DropShadow style={styles.shadowItem}>
      <View style={styles.gmailItem}>
        <Text style={styles.gmailText}>{item}</Text>
        <TouchableOpacity onPress={() => openDeleteModal(item)} style={styles.deleteButton}>
          <Trash size={18} color={color.WHITE} />
        </TouchableOpacity>
      </View>
    </DropShadow>
  );

  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ArrowLeft2 size={22} color={color.BLACK} />
          </TouchableOpacity>
          <View style={styles.titleBox}>
            <Text style={styles.headerTitle}>Setting {'>'} Change Gmail</Text>
          </View>
        </View>

        {/* Caption */}
        <Text style={styles.caption}>
          You can add or remove the Gmail accounts used to connect with services. One Gmail must always be kept.
        </Text>

        {/* Gmail List + Add */}
        <View style={styles.listContainer}>
          <FlatList
            data={gmailList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderGmailItem}
            contentContainerStyle={styles.list}
          />

          <View style={styles.addWrapper}>
            <TouchableOpacity onPress={openAddModal} style={styles.floatingAdd}>
              <AddCircle size={36} color={color.PRIMARY_BLUE} variant="Bold" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Add Gmail Modal */}
        <Modal transparent visible={addModalVisible} animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Enter New Gmail</Text>
              <TextInput
                value={tempGmail}
                onChangeText={setTempGmail}
                placeholder="example@gmail.com"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={() => setAddModalVisible(false)} style={styles.cancelBtn}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={confirmAddGmail} style={styles.okBtn}>
                  <Text style={styles.okText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Delete Modal */}
        <Modal transparent visible={deleteModalVisible} animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Delete Gmail</Text>
              <Text style={styles.confirmText}>
                Are you sure you want to delete this Gmail?
              </Text>
              <Text style={styles.gmailText}>{selectedGmail}</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={() => setDeleteModalVisible(false)} style={styles.cancelBtn}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={confirmDeleteGmail} style={styles.okBtn}>
                  <Text style={styles.okText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <Footer />
    </>
  );
};

export default GmailManagerScreen;
