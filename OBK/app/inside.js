// src/app/inside.js
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Button, SafeAreaView } from 'react-native';
import { Linking } from 'react-native';

const Inside = ({ route }) => {
  // const { device } = route.params; // Get device data passed from App screen\
  const { device } = route.params || {}; // Default to an empty object if undefined

  if (!device) {
    return <Text>Loading...</Text>; // Show loading or fallback UI if 'device' is not found
  }
  const goBack = () => {
    navigation.goBack(); // Go back to the previous screen in the stack
  };
  const openWiki = () => {
    if (device.wiki) {
      Linking.openURL(device.wiki).catch(err =>
        console.error("Couldn't load page", err)
      );
    } else {
      console.warn("No wiki URL provided for this device.");
    }
  };

console.log(device)
  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
   

  

        
        <Text style={styles.title}>{device.name}</Text>
      </View>

      <Image source={{ uri: device.image }} style={styles.image} />
      <TouchableOpacity onPress={openWiki} style={styles.linkButton}>
          <Text style={styles.linkText}>Check</Text>
        </TouchableOpacity>
      <View style={styles.detailsContainer}>


      
              <Text style={styles.text}> Name: {device.vendor || 'Unknown Vendor'} {device.name || 'Unknown Name'} ({device.model || 'Unknown Model'})</Text>
        <Text style={styles.text}>Chipset (Module): {device.chip}{device.board}</Text>
        {device.keywords && (
          <Text style={styles.text}>Keywords: {device.keywords.join(', ')}</Text>
        )}
        <Text style={styles.text}>Description: {device.description || 'No description available.'}</Text>
      </View>
    </ScrollView>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
   
    marginBottom: 20, },
    title: { fontSize: 24, fontWeight: 'bold', color: '#333', },
    image: { width: '100%', height: 200, resizeMode: 'contain', marginBottom: 20, },
    detailsContainer: { marginTop: 20, },
    text: { fontSize: 16, color: '#555', marginBottom: 10, },
    linkButton: {
      backgroundColor: '#262525', // Optional, for better visibility
      padding: 10,
      borderRadius: 5,
      alignItems: 'center', // Centers content horizontally
      justifyContent: 'center', // Centers content vertically
      marginBottom: 20, // Space below the button
    },
    linkText: {
      color: '#D3D3D3',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center', // Center text explicitly
    },


    safeArea: {
      flex: 1,
      paddingTop: 40,}


   });

    export default Inside;