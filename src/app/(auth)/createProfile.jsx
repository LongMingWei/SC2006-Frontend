// app/createProfile.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';
import { Redirect, Link, router } from 'expo-router';

const CreateProfile = () => {
  return (
    
    <View style={styles.container}>
       <View style={styles.headerContainer}>
        <Text style={styles.appName}>PetBuddy</Text>
        <Text style={styles.greeting}>Hi, John!</Text>
      </View>
      <View style={styles.container2}>

      {/* Status Bar */}
      <StatusBar barStyle="dark-content" />

      {/* App name and greeting */}
      <Text style={styles.title}>Create Profile</Text>
      <Image source={require('../../assets/images/whitepuppy.png')}style={styles.image} />

      <Text style={styles.subtitle}>What are you signing up to be?</Text>

      <TouchableOpacity style={styles.button} 
      onPress={() => router.push('/(auth)/caretakerProfile')}>
        <Text style={styles.buttonText}>Caretaker</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} 
      onPress={() => router.push('/(auth)/ownerProfile')}>
        <Text style={styles.buttonText}>Pet Owner</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 

  },
  container2: { 
    flex: 1, 
    padding: 20, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
  },
  appName: {
    fontSize: 20,
    fontFamily: 'Jua-Regular',
    color: '#FFA154',
  },
  greeting: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#FFA154',
  },
  
  title: { 
    fontSize: 32, 
    fontFamily: 'Jua-Regular',
    color: 'black', 
    textAlign: 'center' 
  },
  image: { 
    width: 160, 
    height: 180, 
    marginVertical: 20 
  },
  subtitle: { 
    fontSize: 15, 
    fontFamily: 'Poppins-Regular',
    marginBottom: 20 
  },
  button: { 
    backgroundColor: '#FFA154', 
    padding: 15, 
    borderRadius: 10, 
    marginVertical: 10, 
    width: '50%', 
    alignItems: 'center' 
  },
  buttonText: { 
    color: 'white', 
    fontSize: 24,
    fontFamily: 'Jua-Regular',
  },
});

export default CreateProfile;
