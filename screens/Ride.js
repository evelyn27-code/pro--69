import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity,Image } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class TransactionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domState: "normal",
      hasCameraPermissions: null,
      scanned: false,
      scannedData: ""
    };
  }

  getCameraPermissions = async domState => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      /*status === "granted" is true when user has granted permission
          status === "granted" is false when user has not granted the permission
        */
      hasCameraPermissions: status === "granted",
      domState: domState,
      scanned: false
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scannedData: data,
      domState: "normal",
      scanned: true
    });
  };

  render() {
    const { domState, hasCameraPermissions, scannedData, scanned } = this.state;
    if (domState === "scanner") {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }

    return (
      <View style={styles.container}>

      <Image
          style={styles.imageIcon}
          source={{
            uri:
              'https://i.pinimg.com/originals/85/8a/f9/858af906483d0c09200041c117ae3431.gif',
          }}
        />
        <Text style={styles.text}>
          {hasCameraPermissions ? scannedData : "Request for Camera Permission"}
        </Text>
        
        
        
          <TouchableOpacity
            style={[styles.button, { marginTop: 30 }]}
            onPress={() => this.getCameraPermissions("scanner")}
          >
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity> 
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#055CF3"
  },
  text: {
    color: "#F7D703",
    fontSize: 23,
    marginTop: 50,
    
  },
  button: {
    width: "50%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7D703",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'white',
    
 },
  buttonText: {
    fontSize: 24,
    color: "#4C5D70"
  },
    imageIcon: {
    width: 150,
    height: 150,
    borderWidth:5,
    borderColor: 'white'
  }
});
