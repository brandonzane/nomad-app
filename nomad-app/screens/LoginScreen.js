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
          source={{ uri: "https://tinder.com/static/tinder.png" }}
        >
          <TouchableOpacity style={tw`absolute bottom-40 w-52`}>
            <Text>Sign In and Get Travelling</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
};

export default LoginScreen;
