import React, { useState } from "react";
import { View, Modal, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type ModalButtonProps = {
  buttonText: string;
  children: React.ReactNode;
};

const ModalButton = ({ buttonText, children }: ModalButtonProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity style={styles.openButton} onPress={() => setVisible(true)}>
        <Text style={styles.openButtonText}>{buttonText}</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setVisible(false)}>
              <MaterialCommunityIcons name="close" size={25} style={styles.closeButtonText}></MaterialCommunityIcons>
            </TouchableOpacity>

            {children}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  openButton: {
    backgroundColor: "#007bff",
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  openButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 5,
  },
  closeButtonText: {
    color: "red",
  },
});

export default ModalButton;
