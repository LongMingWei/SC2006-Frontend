// app/addPetProfile.js
/*import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';
import { Link, router } from 'expo-router';

const AddPetProfile = () => {
  const [petName, setPetName] = useState('');
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [health, setHealth] = useState('');
  const [preferences, setPreferences] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Profile</Text>
      <Text style={styles.subtitle}>Pet 1</Text>

      <TouchableOpacity>
        <Text style={styles.linkText}>Add profile picture</Text>
      </TouchableOpacity>

      <TextInput style={styles.input} placeholder="Pet's name" value={petName} onChangeText={setPetName} />
      <TextInput style={styles.input} placeholder="Species" value={species} onChangeText={setSpecies} />
      <TextInput style={styles.input} placeholder="Breed" value={breed} onChangeText={setBreed} />
      <TextInput style={styles.input} placeholder="Age" value={age} onChangeText={setAge} />
      <TextInput style={styles.input} placeholder="Health Conditions" value={health} onChangeText={setHealth} />
      <TextInput style={styles.input} placeholder="Preferences" value={preferences} onChangeText={setPreferences} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <StatusBar style='dark'/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: 'orange', textAlign: 'center' },
  subtitle: { fontSize: 20, marginVertical: 20 },
  linkText: { color: 'blue', textAlign: 'center', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginVertical: 10 },
  button: { backgroundColor: 'orange', padding: 15, borderRadius: 10, alignItems: 'center', marginVertical: 20 },
  buttonText: { color: 'white', fontSize: 16 }
});

export default AddPetProfile; */

// app/addpetprofile.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, KeyboardAvoidingView, Platform, ScrollView, Image, Alert } from 'react-native';
import { Link } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const AddPetProfile = () => {
  const [formData, setFormData] = useState({
    petName: '',
    species: '',
    breed: '',
    age: '',
    healthConditions: '',
    preferences: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  useEffect(() => {
    const requiredFieldsFilled =
      (formData.petName !== '') && 
      (formData.species !== '') && 
      (formData.breed !== '') && 
      (formData.age !== '') && 
      (formData.healthConditions !== '')
      
    setIsFormValid(requiredFieldsFilled);
  }, [formData]);

  // Handle form submission
  const handleSubmit = () => {
    if (isFormValid) {
      // Perform form submission logic here
      console.log(formData);
      Alert.alert("Success", "Pet profile saved successfully!");
    } else {
      Alert.alert("Error", "Please fill out all required fields.");
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={10} // Adjust this offset as needed
      >
        <ScrollView showsVerticalScrollIndicator={false}>

          {/* Status Bar */}
          <StatusBar barStyle="dark-content" />

          {/* App name and greeting */}
          <View style={styles.headerContainer}>
            <Text style={styles.appName}>PetBuddy</Text>
            <Text style={styles.greeting}>Hi, John!</Text>
          </View>

          {/* Title and pet image */}
          <Text style={styles.title}>Create Profile</Text>
          <Text style={styles.subtitle}>Pet</Text>
          <Image source={require('../../assets/images/brownpuppy.png')}style={styles.image} />
         {/* Signup Link */}
          <Text style={styles.addPetProfilePicture}>
            <Link href="/dummyScreen" style={styles.addPetProfilePictureLink}>Add profile picture</Link> {/*to add to database*/}
          </Text>

          {/* Form fields */}
          <View style={styles.form}>
            {/* Pet Name */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Pet Name*</Text>
              <TextInput
                style={styles.input}
                placeholder="Your pet's name"
                value={formData.petName}
                onChangeText={(text) => handleInputChange('petName', text)}
              />
            </View>

            {/* Species */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Species*</Text>
              <TextInput
                style={styles.input}
                placeholder="Dog, cat, etc."
                value={formData.species}
                onChangeText={(text) => handleInputChange('species', text)}
              />
            </View>

            {/* Breed */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Breed*</Text>
              <TextInput
                style={styles.input}
                placeholder="Chihuahua, British Short Hair, etc."
                value={formData.breed}
                onChangeText={(text) => handleInputChange('breed', text)}
              />
            </View>

            {/* Age */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Age*</Text>
              <TextInput
                style={styles.input}
                placeholder="6 months, 1 year, etc."
                value={formData.age}
                onChangeText={(text) => handleInputChange('age', text)}
              />
            </View>

            {/* Health Conditions */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Health Conditions*</Text>
              <TextInput
                style={styles.input}
                placeholder="Healthy, breathing difficulty, etc."
                value={formData.healthConditions}
                onChangeText={(text) => handleInputChange('healthConditions', text)}
              />
            </View>

            {/* Preferences */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Preferences</Text>
              <TextInput
                style={styles.input}
                placeholder="If any"
                value={formData.preferences}
                onChangeText={(text) => handleInputChange('preferences', text)}
              />
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
  },
  image: {  
    marginVertical: 10,
    alignSelf: 'center'
  },
  addPetProfilePicture: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  addPetProfilePictureLink: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Regular',
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
    width: 140, // Increased to accommodate longer labels
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
  button: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 90,
  
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Jua-Regular',
  },
});

export default AddPetProfile;
