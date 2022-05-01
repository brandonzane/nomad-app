import { useNavigation } from "@react-navigation/core";
import { View, Text, Button, ImageBackground, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import useAuth from "../hooks/useAuth";
import tw from "twrnc";



const LoginScreen = () => {
    const { signInWithGoogle, loading } = useAuth();
    const navigation = useNavigation();

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown:false,
      });
    }, []);


    return (
      <View style={tw`flex-1`}>
        <ImageBackground
        resizeMode="cover"
        style={tw`flex-1`}
          source={{ uri: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iTdEptqNukjs/v1/-1x-1.jpg" }}
        >
          <Text style={[tw`absolute bottom-80 text-white p-12`, { fontFamily: "Branda", fontSize: 50}]}>Nomad App</Text>
          <TouchableOpacity
           style={[tw`text-blue-100 absolute bottom-40 w-60 bg-slate-200 p-4 shadow-xl shadow-white rounded-full`,
            { marginHorizontal: `25%`}
            ]}
            onPress={signInWithGoogle}
            >
            <Text style={[tw`font-bold text-center text-slate-800`, { fontFamily: "Branda", fontSize: 15}]}>Begin My Journey</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
};

export default LoginScreen;
