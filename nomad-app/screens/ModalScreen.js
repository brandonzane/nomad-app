import { doc, setDoc } from '@firebase/firestore';
import { useNavigation } from "@react-navigation/core"
import React, { useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import tw from "twrnc";
import { db } from '../firebase'
import useAuth from '../hooks/useAuth';
import { serverTimestamp } from 'firebase/firestore';
import stag from "../assets/stag.png"

const ModalScreen = () => {
  const { user } = useAuth(); 
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);

  const incompleteForm = !image || !job || !age;

  const updateUserProfile = () => {
    setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        displayName: user.displayName,
        photoURL: image,
        job: job,
        age: age,
        timestamp: serverTimestamp()
    }).then(() => {
        navigation.navigate('Home');
    })
    .catch((error) => {
        alert(error.message);
    });
  };

  return (
    <View style={tw`flex-1 items-center pt-1`}>
      <Image
        style={tw`h-30 w-full`}
        resizeMode="contain"
        source={stag} 
        />
        <Text style={tw`text-xl text-gray-500 p-2 font-bold`}>
            Welcome {user.displayName}
        </Text>

        <Text style={tw`text-center p-4 font-bold text-black`}>
            Step 1: The Profile Pic
        </Text>
        <TextInput
            value={image}
            onChangeText={setImage}
            style={tw`text-center text-xl pb-2`} 
            placeholder="Enter your profile pic URL"
        />

        <Text style={tw`text-center p-4 font-bold text-black`}>
            Step 2: The Job
        </Text>
        <TextInput
            value={job}
            onChangeText={setJob}
            style={tw`text-center text-xl pb-2`} 
            placeholder="Enter your job description"
        />

        <Text style={tw`text-center p-4 font-bold text-black`}>
            Step 3: The Age
        </Text>
        <TextInput
            value={age}
            onChangeText={setAge}
            style={tw`text-center text-xl pb-2`} 
            placeholder="Enter your age"
            keyboardType="numeric"
            maxLength={2}
        />
        
        <TouchableOpacity 
            disabled={incompleteForm}
            style={[tw`w-64 p-3 rounded-xl absolute bottom-10`, 
            incompleteForm ? tw`bg-slate-400` : tw`bg-blue-400`]}
            onPress={updateUserProfile}
            >
            <Text style={tw`text-center text-white text-xl`}>Update Profile</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ModalScreen