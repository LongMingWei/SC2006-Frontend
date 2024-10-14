// app/login.js
/*import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Link , router} from 'expo-router';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      {/* Title *///}
     /* <Text style={styles.title}>PetBuddy</Text>
      <Text style={styles.subtitle}>Login</Text>

      {/* Email Input *///}
    /*  <TextInput
        style={styles.input}
        placeholder="Email*"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input *///}
    /*  <TextInput
        style={styles.input}
        placeholder="Password*"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Login Button *///}
    /*  <TouchableOpacity style={styles.button} 
      onPress={() => router.push('/(auth)/createProfile')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign up link *///}
    /*  <View style={styles.signupTextContainer}>
        <Text>Don’t have an account? </Text>
        <Link href="/registerscreen" style={styles.signupText}>Sign up</Link>
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
  signupTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: 'blue',
  },
});

export default LoginScreen;*/

// app/login.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Link, router } from 'expo-router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic
    console.log('Login with:', email, password);
  };

  return (
    <View style={styles.container}>
      
      {/* Status Bar */}
      <StatusBar barStyle="dark-content" />

      {/* App name */}
      <Text style={styles.appName}>PetBuddy</Text>

      {/* Title */}
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Enter your login information</Text>


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

      {/* Login Button 
      <TouchableOpacity style={styles.button} onPress={handleLogin}>*/}
      <TouchableOpacity style={styles.button} 
      onPress={() => router.push('/(auth)/dummyScreen')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Signup Link */}
      <Text style={styles.signupText}>
        Don't have an account? <Link href="/registerScreen" style={styles.signupLink}>Sign up</Link>
      </Text>
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
    marginTop: 50
    
  },
  title: {
    fontSize: 32,
    fontFamily: 'Jua-Regular',
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: "rgba(0, 0, 0, 0.5)",
    textAlign: 'center',
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
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Regular',
  },
});

export default Login;
