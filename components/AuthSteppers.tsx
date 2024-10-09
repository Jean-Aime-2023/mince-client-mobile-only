//@ts-nocheck
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
// @ts-ignore
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import FormInput from './Login/FormInput';
import { PoppinsSemibold, PoppinText } from './StyledText';
import tw from 'twrnc';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as LocalAuth from 'expo-local-authentication';
import CustomButton from './CustomButton';
import { router } from 'expo-router';
import axios from 'axios';

const AuthSteppers = () => {
  const [step1Data, setStep1Data] = useState({
    pin: '',
    confirmPin: '',
  });
  const [phone, setPhone] = useState<string>(''); 
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [lastname, setLastname] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  // Max PIN length
  const PIN_LENGTH = 4;

  // Custom styles for buttons
  const buttonTextStyle = {
    color: '#ffffff', // Text color for the buttons
    fontSize: 16,
  };

  const buttonStyle = {
    backgroundColor: '#5547D7', // Background color of the buttons
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1, // Ensure buttons take available space for justify-between
    alignItems: 'center',
    marginTop: 20,
  };

  // Define the custom styles for the progress steps
  const progressStepsStyle = {
    activeStepIconBorderColor: '#5547D7',
    completedStepIconColor: '#5547D7',
    completedProgressBarColor: '#5547D7',
    activeLabelColor: '#5547D7',
    completedLabelColor: '#5547D7',
  };

  // Function to validate PINs
  const validatePins = () => {
    if (
      step1Data.pin.length !== PIN_LENGTH ||
      step1Data.confirmPin.length !== PIN_LENGTH
    ) {
      Alert.alert(`PIN should be exactly ${PIN_LENGTH} digits`);
      return false;
    }
    if (step1Data.pin !== step1Data.confirmPin) {
      Alert.alert('PIN and Confirm PIN do not match');
      return false;
    }
    return true;
  };

  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  const fallBackToDefaultAuth = () => {
    console.log('fall back password auth');
  };

  const alertComponent = (
    title: string,
    mess: string | undefined,
    btnTxt: string,
    btnFunc: { (): void; (): void }
  ) => {
    return Alert.alert(title, mess, [
      {
        text: btnTxt,
        onPress: btnFunc,
      },
    ]);
  };

  const TwoButtonAlert = () =>
    Alert.alert('You are logged in', 'Hello', [
      {
        text: 'Back',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'PROCEES', onPress: () => console.log('OK Pressed') },
    ]);

  const handleBiometricAuth = async () => {
    const isBiometricAvailable = await LocalAuth.hasHardwareAsync();

    if (!isBiometricAvailable) {
      return alertComponent(
        'Please enter your password',
        'Boimetric auth not supported',
        'OK',
        () => fallBackToDefaultAuth()
      );
    }

    let supportedBoimetrics;
    if (isBiometricAvailable) {
      supportedBoimetrics = await LocalAuth.supportedAuthenticationTypesAsync();
    }

    const savedBiometrics = await LocalAuth.isEnrolledAsync();
    if (!savedBiometrics) {
      return alertComponent(
        'Biometric record not found',
        'Please login with your password',
        'OK',
        () => fallBackToDefaultAuth()
      );
    }

    const biometricAuth = await LocalAuth.authenticateAsync({
      promptMessage: 'Login with biometrics',
      cancelLabel: 'Cancel',
      disableDeviceFallback: false,
    });

    if (biometricAuth) {
      TwoButtonAlert();
    }

    if (biometricAuth.success) {
      // Check if biometric auth was successful
      setFingerprintScanned(true); // Set the state to true
      TwoButtonAlert();
    } else {
      setFingerprintScanned(false); // Reset the state if authentication fails
    }
  };

  const [fingerprintScanned, setFingerprintScanned] = useState(false);

  useEffect(() => {
    async () => {
      const compatible = await LocalAuth.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    };
  }, []);

  const handleCreateAccount = async () => {
    // Validate the form fields
    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      Alert.alert('Validation Error', 'Please fill out all fields.');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      Alert.alert(
        'Validation Error',
        'Password must be at least 6 characters.'
      );
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return;
    }

    // Prepare the request body
    const requestBody = {
      firstname,
      lastname,
      email,
      phone,
      password,
      confirmPassword,
    };
  
    console.log("Request Body:", requestBody); // Log the request body
  
    try {
      const response = await axios.post('https://mincetech-back.onrender.com/api/users/auth/register', requestBody);
      console.log("API Response:", response.data); // Log the response
      Alert.alert('Success', 'Account created successfully!');
      router.push('/login');
    } catch (error) {
      console.log("Error details:", error.response ? error.response.data : error); // Log error details
      Alert.alert('Registration Error', 'Failed to create account. Please try again.');
    }
  };
    

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <View style={styles.container}>
      <ProgressSteps {...progressStepsStyle}>
        <ProgressStep
          label="Pin Configuration"
          nextBtnTextStyle={buttonTextStyle}
          nextBtnStyle={buttonStyle}
          onNext={validatePins} // Add validation before moving to next step
          labelStyle={styles.labelText} // Use custom font for labels
          nextBtnDisabled={
            step1Data.pin.length !== PIN_LENGTH ||
            step1Data.confirmPin.length !== PIN_LENGTH
          } // Disable next button if the PINs are not valid
        >
          <View
            style={tw`text-[17px] bg-white p-4 py-7 rounded-xl border border-gray-200 flex-col gap-6`}
          >
            <View>
              <PoppinsSemibold style={[styles.labelText, tw`text-center pb-3`]}>
                Let’s start by setting up your PIN
              </PoppinsSemibold>
              <PoppinText style={tw`text-[#6B6B6B] text-center`}>
                Enter your personal and more secure PIN for your account.
              </PoppinText>
            </View>

            <View>
              <PoppinText>ENTER PIN</PoppinText>
              <FormInput
                placeholder="Enter PIN"
                value={step1Data.pin}
                onChangeText={(text) =>
                  setStep1Data({ ...step1Data, pin: text })
                }
                keyboardType="numeric"
                maxLength={PIN_LENGTH} // Limit PIN length
                secureTextEntry={true} // Hide the input for security
              />
            </View>

            <View>
              <PoppinText>CONFIRM PIN</PoppinText>
              <FormInput
                placeholder="Confirm PIN"
                value={step1Data.confirmPin}
                onChangeText={(text) =>
                  setStep1Data({ ...step1Data, confirmPin: text })
                }
                keyboardType="numeric"
                maxLength={PIN_LENGTH} // Limit PIN length
                secureTextEntry={true} // Hide the input for security
              />
            </View>
          </View>
        </ProgressStep>

        <ProgressStep
          label="Fingerprint"
          previousBtnTextStyle={buttonTextStyle}
          previousBtnStyle={buttonStyle}
          nextBtnTextStyle={buttonTextStyle}
          nextBtnStyle={buttonStyle}
          labelStyle={styles.labelText}
          style={tw`mb-10`}
          nextBtnDisabled={!fingerprintScanned}
        >
          <View
            style={tw`text-[17px] bg-white p-4 py-7 rounded-xl border border-gray-200 flex-col gap-6 w-full h-full`}
          >
            <View>
              <PoppinsSemibold style={[styles.labelText, tw`text-center pb-3`]}>
                Sacn your fingerprint
              </PoppinsSemibold>
              <PoppinText style={tw`text-[#6B6B6B] text-center`}>
                Touch the behind fingerprint scanner on your phone to scan it
              </PoppinText>
            </View>

            <View style={tw`w-full h-full flex justify-center items-center `}>
              {isBiometricSupported ? (
                <PoppinText style={tw`text-red-600`}>
                  Your device is compatible with Biometrics
                </PoppinText>
              ) : (
                <PoppinText style={tw`text-red-600`}>
                  Fingerprint scanner is available on this device
                </PoppinText>
              )}
              <TouchableOpacity
                onPress={handleBiometricAuth}
                style={tw`p-5 border-gray-200 shadow-xl rounded-full bg-white mb-20`}
              >
                <Ionicons name="finger-print" size={24} color="#6B6B6B" />
              </TouchableOpacity>
            </View>
          </View>
        </ProgressStep>

        <ProgressStep
          label="Personal Info"
          previousBtnTextStyle={buttonTextStyle}
          previousBtnStyle={buttonStyle}
          finishBtnText={'Submit'}
          nextBtnTextStyle={buttonTextStyle}
          nextBtnStyle={buttonStyle}
          labelStyle={styles.labelText}
          onSubmit={handleCreateAccount}
        >
          <View
            style={tw`text-[17px] bg-white p-4 py-7 rounded-xl border border-gray-200 flex-col gap-6`}
          >
            <View>
              <PoppinsSemibold style={[styles.labelText, tw`text-center pb-3`]}>
                Set up your account
              </PoppinsSemibold>
              <PoppinText style={tw`text-[#6B6B6B] text-center`}>
                Enter your personal information to create your account.
              </PoppinText>
            </View>

            <View>
              <PoppinText>Firstname</PoppinText>
              <FormInput
                placeholder="Enter your firstname"
                value={firstname}
                onChangeText={setFirstname}
                keyboardType="default"
                secureTextEntry={false}
              />
            </View>

            <View>
              <PoppinText>Lastname</PoppinText>
              <FormInput
                placeholder="Enter your lastname"
                value={lastname}
                onChangeText={setLastname}
                keyboardType="default"
                secureTextEntry={false}
              />
            </View>

            <View>
              <PoppinText>Email</PoppinText>
              <FormInput
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                secureTextEntry={false}
              />
            </View>

            <View>
              <PoppinText>Phone</PoppinText>
              <FormInput
                placeholder="Enter your mobile number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-number"
                secureTextEntry={false}
              />
            </View>

            <View>
              <PoppinText>Password</PoppinText>
              <FormInput
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                keyboardType="default"
                secureTextEntry={!showPassword}
                icon={
                  <Ionicons
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color="gray"
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />
            </View>

            <View>
              <PoppinText>Confirm Password</PoppinText>
              <FormInput
                placeholder="Confirm password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                keyboardType="default"
                secureTextEntry={!showConfirmPassword}
                icon={
                  <Ionicons
                    name={showConfirmPassword ? 'eye' : 'eye-off'}
                    size={20}
                    color="gray"
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                }
              />
            </View>
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
};

export default AuthSteppers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  labelText: {
    // Poppins font family and custom styles for labels
    fontFamily: 'Poppins',
    color: '#002159',
  },
});
