import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Keyboard,
  StatusBar,
} from "react-native";

import SvgQRCode from "react-native-qrcode-svg";
import { QRCode as CustomQRCode } from "react-native-custom-qr-codes-expo";

const { width, height } = Dimensions.get("screen");

export default function App() {
  const [QRcodeValue, setQRcodeValue] = useState("");

  const [inputTextValue, setInputTextValue] = useState("");

  const [showQRCodeError, setShowQRCodeError] = useState(false);
  const handleGenerateQR = (e) => {
    if (inputTextValue) {
      setQRcodeValue(inputTextValue);
      setInputTextValue("");
      setShowQRCodeError(false);
    } else {
      setShowQRCodeError(true);
    }
  };

  const QrMarkup = QRcodeValue ? (
    <CustomQRCode
      logo={require("./assets/cbu-logo20.png")}
      logoSize={50}
      codeStyle="circle"
      size={width * 0.9}
      content={QRcodeValue}
    />
  ) : null;

  const errorMarkup = showQRCodeError ? (
    <Text style={{ textAlign: "center", color: "red", marginVertical: 7 }}>
      Please enter value
    </Text>
  ) : null;
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ecf0f1" />
      <TouchableOpacity
        style={{
          flex: 1,
          width: "100%",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
        onPress={() => Keyboard.dismiss()}
      >
        <View>{QrMarkup}</View>
        <View
          style={{ paddingHorizontal: 20, width: "100%", marginVertical: 10 }}
        >
          <TextInput
            style={styles.input}
            placeholder="Enter QRcode value"
            onChangeText={(e) => setInputTextValue(e)}
            value={inputTextValue}
          />
          {errorMarkup}
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleGenerateQR()}
          >
            <Text style={styles.text}>Generate QRcode</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingTop: 20,
    alignItems: "center",
    backgroundColor: "#ecf0f1",
  },
  input: {
    padding: 9,
    fontSize: 14,
    backgroundColor: "whitesmoke",
    borderColor: "green",
    borderWidth: 2,
    borderRadius: 7,
    width: "100%",
  },
  button: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
    backgroundColor: "green",
    marginVertical: 20,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
