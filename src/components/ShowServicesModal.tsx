import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {responsiveWidth} from '../utils';
import {colors} from '../assets/colors';

const ShowServicesModal = ({
  modalVisible,
  setModalVisible,
  data,
  toggleSelection,
  selectedIds,
}: any) => {
  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalText}>Select Services</Text>
          <View>
            <ScrollView>
              <FlatList
                data={data}
                renderItem={({item}) => {
                  const isSelected = selectedIds.includes(item?._id);

                  return (
                    <TouchableOpacity
                      style={[
                        styles.itemBox,
                        {backgroundColor: isSelected ? '#d1e7ff' : '#fff'},
                      ]}
                      onPress={() => toggleSelection(item?._id)}>
                      <Text style={[styles.modalText, {textAlign: 'left', marginBottom: 0}]}>
                        {item?.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </ScrollView>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.closeButton, {backgroundColor: colors.primary}]}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ShowServicesModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
  },
  modalText: {
    marginBottom: 20,
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 10,
    width: responsiveWidth(40),
    alignItems: 'center',
  },
  itemBox: {
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
});
