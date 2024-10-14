// app/register.js
/*import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Link, router } from 'expo-router';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreePolicy, setAgreePolicy] = useState(false);

  return (
    <View style={styles.container}>
      {/* Title *///}
     /* <Text style={styles.title}>PetBuddy</Text>
      <Text style={styles.subtitle}>Registration</Text>

      {/* Username Input *///}
     /* <TextInput
        style={styles.input}
        placeholder="Username*"
        value={username}
        onChangeText={setUsername}
      />

      {/* Email Input *///}
     /* <TextInput
        style={styles.input}
        placeholder="Email*"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input *///}
     /* <TextInput
        style={styles.input}
        placeholder="Password*"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Confirm Password Input *///}
      /*<TextInput
        style={styles.input}
        placeholder="Confirm your password*"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {/* Register Button *///}
     /* <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* Login link *///}
    /*  <View style={styles.loginTextContainer}>
        <Text>Already have an account? </Text>
        <Link href="/loginScreen" style={styles.loginText}>Login</Link>
      </View>
      <StatusBar style='dark'/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'orange',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  loginTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: 'blue',
  },
});

export default RegisterScreen;*/

// app/register.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, KeyboardAvoidingView, Platform, ScrollView, Modal, Button } from 'react-native';
import { Link, router } from 'expo-router';
import Checkbox from 'expo-checkbox';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const isFormValid =
    username &&
    email &&
    password &&
    confirmPassword &&
    termsAccepted &&
    password === confirmPassword;
    
  const handleRegister = () => {
    // Handle registration logic
    console.log('Register with:', username, email, password, confirmPassword);

    if (!isFormValid) {
      alert('Please fill all fields, ensure passwords match, and accept the terms and conditions.');
      return;
    }
    alert('Registration successful!');
    router.push('../(auth)/createProfile');
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

          {/* App name */}
          <Text style={styles.appName}>PetBuddy</Text>

          {/* Title */}
          <Text style={styles.title}>Registration</Text>
          <Text style={styles.subtitle}>Enter your information</Text>

          {/* Username */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Username*</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          {/* Email */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email*</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          {/* Password */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Password*</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {/* Confirm Password */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Confirm Password*</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          {/* Terms and Conditions Checkbox */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={termsAccepted}
            onValueChange={setTermsAccepted}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxLabel}>
            I acknowledge that I have read the{' '}
            <Text style={styles.linkText} onPress={() => setIsModalVisible(true)}>
            Terms and Conditions</Text>.
          </Text>
        </View>

          {/* Register Button */}
          <TouchableOpacity
          style={[styles.button]}
          onPress={handleRegister}
        >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <Text style={styles.signupText}>
            Already have an account? <Link href="/loginscreen" style={styles.signupLink}>Login</Link>
          </Text>

          <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Terms and Conditions</Text>
              <Text style={styles.modalText}>
                {/* Insert your actual terms and conditions here */}
                By using PetBuddy, you agree that the developer will not be liable for any damages or any privacy issue that may arise from the usage of this app.
              </Text>
            </ScrollView>
            <Button title="Close" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>

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
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: 'Jua-Regular',
    color: '#FFA154',
    textAlign: 'center',
    marginVertical: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Jua-Regular',
    color: 'black',
    textAlign: 'center',
   
  },
  subtitle: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: "rgba(0, 0, 0, 0.5)",
    textAlign: 'center',
    marginBottom: 10,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    borderStyle: "solid",
    borderColor: "#ffa154",
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 12,
    color: '#333',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#FFA154',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
    marginHorizontal: 90,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Jua-Regular',
  },
  signupText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  signupLink: {
    color: 'blue',
    fontFamily: 'Poppins-Regular',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'justify',
  },
});

export default Register;
