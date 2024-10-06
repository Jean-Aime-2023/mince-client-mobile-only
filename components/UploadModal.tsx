import {
    ActivityIndicator,
    Modal,
    Pressable,
    StyleSheet,
    View,
    TouchableOpacity,
  } from 'react-native';
  import React from 'react';
  import tw from 'twrnc';
  import { PoppinsSemibold, PoppinText } from './StyledText';
  import { MaterialCommunityIcons } from '@expo/vector-icons';
  
  const UploadModal = ({
    modalVisible,
    onBackPress,
    onCameraPress,
    onGalleryPress,
    onRemovePress,
    isLoading = false,
  }: any) => {
    return (
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <Pressable style={styles.modalBackground} onPress={onBackPress}>
          <View style={styles.modalContainer}>
            {isLoading ? (
              <ActivityIndicator size={70} color={'#5547D7'} />
            ) : (
              <View style={tw`flex-col gap-5 items-center`}>
                <PoppinsSemibold>Profile Photo</PoppinsSemibold>
                <View style={tw`flex-row justify-between items-center gap-5`}>
                  <View style={tw`flex-col gap-1 items-center`}>
                    <TouchableOpacity onPress={onCameraPress}>
                      <MaterialCommunityIcons
                        name="camera-outline"
                        size={30}
                        color={'black'}
                      />
                    </TouchableOpacity>
                    <PoppinText>Camera</PoppinText>
                  </View>
                  <View style={tw`flex-col gap-1 items-center`}>
                    <TouchableOpacity onPress={onGalleryPress}>
                      <MaterialCommunityIcons
                        name="image-outline"
                        size={30}
                        color={'black'}
                      />
                    </TouchableOpacity>
                    <PoppinText>Gallery</PoppinText>
                  </View>
                  <View style={tw`flex-col gap-1 items-center`}>
                    <TouchableOpacity onPress={onRemovePress}>
                      <MaterialCommunityIcons
                        name="trash-can-outline"
                        size={30}
                        color={'black'}
                      />
                    </TouchableOpacity>
                    <PoppinText>Remove</PoppinText>
                  </View>
                </View>
              </View>
            )}
          </View>
        </Pressable>
      </Modal>
    );
  };
  
  export default UploadModal;
  
  const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContainer: {
      width: '80%',
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  