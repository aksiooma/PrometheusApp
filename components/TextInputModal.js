import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  } from 'react-native';
import { useKeyboard } from './IsKeyboardOpen';
import ShelveButton from './ShelveButton';

const TextInputModal = ({ visible, onClose, onSubmit, story, isEdit }) => {
  const [desc, setDesc] = useState('');
  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  const isKeyBoardOpen = useKeyboard();

  useEffect(() => {
    if (isEdit) {

      setDesc(story);
    }
  }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {

    if (valueFor === 'desc') setDesc(text);
  };

  const handleSubmit = () => {
    if (!desc.trim()) return onClose();

    if (isEdit) {
      onSubmit(desc);
    } else {
      onSubmit(desc);
      setDesc('');
    }
    onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setDesc('');
    }
    onClose();
  };

  return (

    <View
      keyboardDismissMode="on-drag"
      style={styles.view}
    >

      <StatusBar hidden />
      <Modal visible={visible} animationType='fade'>
        <View style={styles.container}>
          <TextInput
            value={desc}
            multiline
            style={[styles.input, styles.desc]}
            onChangeText={text => handleOnChangeText(text, 'desc')}
          />

          <View style={styles.btnContainer}>

            <ShelveButton
              size={15}
              antIconName='check'
              onPress={handleSubmit}
            />
            <ShelveButton
              size={15}
              style={{ marginLeft: 15 }}
              antIconName='close'
              onPress={closeModal}
            />

          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 5,
    backgroundColor: '#181818',
  },
  input: {
    marginVertical: 40,
    borderBottomWidth: 2,
    color: '#F9FBFF',
    fontSize: 20,

  },
  desc: {
    height: 380,
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    opacity: 0.9,
    marginVertical: -33,
  },
});

export default TextInputModal;