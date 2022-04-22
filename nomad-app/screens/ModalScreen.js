import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import tw from "twrnc";
import useAuth from '../hooks/useAuth';
import stag from "../assets/stag.png"

const ModalScreen = () => {
  const { user } = useAuth();  
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);

  const incompleteForm = !image || !job || !age;

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
            onChangeText={text => setImage(text)}
            style={tw`text-center text-xl pb-2`} 
            placeholder="Enter your profile pic URL"
        />

        <Text style={tw`text-center p-4 font-bold text-black`}>
            Step 2: The Job
        </Text>
        <TextInput
            value={job}
            onChangeText={text => setJob(text)}
            style={tw`text-center text-xl pb-2`} 
            placeholder="Enter your job description"
        />

        <Text style={tw`text-center p-4 font-bold text-black`}>
            Step 3: The Age
        </Text>
        <TextInput
            value={age}
            onChangeText={text => setAge(text)}
            style={tw`text-center text-xl pb-2`} 
            placeholder="Enter your age"
        />
        
        <TouchableOpacity 
            disabled={incompleteForm}
            style={[tw`w-64 p-3 rounded-xl absolute bottom-10 bg-slate-400`]}>
            <Text style={tw`text-center text-white text-xl`}>Update Profile</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ModalScreen