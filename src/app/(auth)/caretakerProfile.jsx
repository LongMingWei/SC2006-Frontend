// app/caretakerprofile.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { Link, router } from 'expo-router';

const CaretakerProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    experience: '',
    services: '',
    rates: '',
    availability: '',
    location: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every((field) => field.trim() !== '');
    setIsFormValid(allFieldsFilled);
  }, [formData]);

  const handleSubmit = () => {
    // Handle the form submission
    //console.log(formData);
    if (isFormValid) {
      console.log(formData);
      Alert.alert("Success", "Profile saved successfully!");
      router.push('../(auth)/dummyScreen');
    } 
    else {
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

      {/* Title */}
      <Text style={styles.title}>Create Profile</Text>
      <Text style={styles.subtitle}>Caretaker</Text>

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

        {/* Work Experience */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Work experience*</Text>
          <TextInput
            style={styles.input}
            placeholder="6 months, 1 year, etc."
            value={formData.experience}
            onChangeText={(text) => handleInputChange('experience', text)}
          />
        </View>

        {/* Types of Services */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Types of services*</Text>
          <TextInput
            style={styles.input}
            placeholder="Pet walking, Grooming, etc."
            value={formData.services}
            onChangeText={(text) => handleInputChange('services', text)}
          />
        </View>

        {/* Service Rates */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Service rates*</Text>
          <TextInput
            style={styles.input}
            placeholder="$50/hr, etc."
            value={formData.rates}
            onChangeText={(text) => handleInputChange('rates', text)}
          />
        </View>

        {/* Availability */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Availability*</Text>
          <TextInput
            style={styles.input}
            placeholder="Saturday afternoons, etc."
            value={formData.availability}
            onChangeText={(text) => handleInputChange('availability', text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Location*</Text>
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
  button: {
    backgroundColor: '#ffa154',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Jua-Regular',
  },
});

export default CaretakerProfile;

