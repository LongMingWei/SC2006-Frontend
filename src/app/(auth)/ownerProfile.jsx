// app/ownerprofile.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar, Alert } from 'react-native';
import { Link, router } from 'expo-router';

const OwnerProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    location: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const requiredFieldsFilled = formData.name.trim() !== '' && formData.dob.trim() !== '' && formData.gender.trim() !== '';
    setIsFormValid(requiredFieldsFilled);
  }, [formData]);

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    if (isFormValid) {
      // Perform form submission logic here
      console.log(formData);
      Alert.alert("Success", "Profile saved successfully!");
    } else {
      Alert.alert("Error", "Please fill out all required fields.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Status Bar */}
      <StatusBar barStyle="dark-content" />

      {/* App name and greeting */}
      <View style={styles.headerContainer}>
        <Text style={styles.appName}>PetBuddy</Text>
        <Text style={styles.greeting}>Hi, John!</Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>Create Profile</Text>
      <Text style={styles.subtitle}>Pet owner</Text>

      {/* Form fields */}
      <View style={styles.form}>
        {/* Name */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Name*</Text>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
          />
        </View>

        {/* Date of Birth */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Date of Birth*</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YY"
            value={formData.dob}
            onChangeText={(text) => handleInputChange('dob', text)}
          />
        </View>

        {/* Gender */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Gender*</Text>
          <TextInput
            style={styles.input}
            placeholder="Your gender"
            value={formData.gender}
            onChangeText={(text) => handleInputChange('gender', text)}
          />
        </View>

        {/* Location */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Your location"
            value={formData.location}
            onChangeText={(text) => handleInputChange('location', text)}
          />
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <Image source={require('../../assets/images/line1.png')}style={styles.image} />

      {/* Add Pet Section */}
      <View style={styles.addPetContainer}>
       <TouchableOpacity style={styles.iconButton} onPress={() => router.push('../(auth)/addPetProfile')}>
        <Image
          source={require('../../assets/images/addIcon.png')}
          style={styles.addPetIcon} // Styling for the custom icon
        />
        <Text style={styles.addPetText}>+</Text>
      </TouchableOpacity>
      <Text style={styles.addPetLabel}>Start adding your pet!</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
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
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 24,
    fontFamily: 'Jua-Regular',
    color: '#FFA154',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    marginVertical: 20,
  },
  formGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    width: 120,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 6,
    borderStyle: "solid",
    borderColor: "#ffa154",
    padding: 10,
  },
  image: {  
    marginVertical: 20,
    marginHorizontal: 13,
  },
  button: {
    backgroundColor: '#ffa154',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: -17,
    marginLeft: 250,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Jua-Regular',
  },
  addPetContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  addPetButton: {
    backgroundColor: 'orange',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    alignItems: 'center',
    marginTop: 40,
    
  },
  customIcon: {
    width: 60, // Customize the size  icon
    height: 60,
  },
  addPetText: {
    color: 'white',
    fontSize: 0,
    fontWeight: 'bold',
  },
  addPetLabel: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
  },
});

export default OwnerProfile;

