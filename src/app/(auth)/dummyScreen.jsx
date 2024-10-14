import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView } from "react-native";
import { Redirect, Link, router } from 'expo-router';
import { useFonts } from "expo-font";

const WelcomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>

      {/* Status Bar */}
      <StatusBar barStyle="dark-content" />

      {/*Title*/}
      <Text style={styles.pretitle}>For data storing and linking pages</Text>
      <Text style={styles.title}>Dummy page!</Text>
      
      {/* Mascot Image */}
      <Image 
        source={require('../../assets/images/corgi.png')} // Add the image to the assets folder
        style={styles.image}
      />
      
     {/* Description */}
      <Text style={styles.description}>
        Used in AddPetProfile,login,caretakerprofile
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  pretitle: {
    color: 'black',
    fontSize: 32,
    fontFamily: 'Jua-Regular',
    fontWeight: '400',
  },
  title: {
    color: '#FFA154',
    fontSize: 64,
    fontFamily: 'Jua-Regular',
    fontWeight: '400',
  },
  image: {
    height: 210,
    width: 200,
    marginBottom: 20,
  },
  description: {
    color: 'black',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    marginHorizontal: 51,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFA154',
    padding: 15,
    borderRadius: 6,
    marginTop: 20,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    borderRadius: 6,
    border: '1px #FFA154 solid',
    
  },
});

export default WelcomeScreen;