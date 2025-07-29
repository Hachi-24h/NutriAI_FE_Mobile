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
const GmailManagerScreen = () => {
  const [gmailList, setGmailList] = useState<string[]>(['user@gmail.com']);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [tempGmail, setTempGmail] = useState('');
  const [selectedGmail, setSelectedGmail] = useState<string | null>(null);

  const openAddModal = () => {
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
    <View style={styles.gmailItem}>
      <Text style={styles.gmailText}>{item}</Text>
      <TouchableOpacity onPress={() => openDeleteModal(item)} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Gmail Accounts</Text>

      <FlatList
        data={gmailList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderGmailItem}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
        <Text style={styles.addButtonText}>+ Add Gmail</Text>
      </TouchableOpacity>

      {/* Add Gmail Modal */}
      <Modal transparent visible={addModalVisible} animationType="slide">
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

      {/* Delete Gmail Modal */}
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
  );
};

export default GmailManagerScreen;
