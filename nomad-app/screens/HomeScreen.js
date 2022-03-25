import { View, Text, Button } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import useAuth from "../hooks/useAuth";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { logout } = useAuth();

  // useLayoutEffect = () => {
  //   navigation.setOptions({
  //   headerShown: false,
  //   });
  // }

  return (
    <View>
      <Text>I am The HomeScreen</Text>
      <Button
        title="Go to ChatScreen"
        onPress={() => navigation.navigate("Chat")}
      />

      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default HomeScreen;
