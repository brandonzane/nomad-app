import { View, Text } from "react-native";
import React, {createContext, useContext} from "react";
import * as Google from 'expo-google-app-auth';
// import * as WebBrowser from "expo-web-browser";

// WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext({});

const config = {
    androidClientId: '463646179309-skhgvusa77uvr2260ctdmt6ue0jro2c5.apps.googleusercontent.com',
    iosClientId: '463646179309-9cbtfar061a8oitl1oqec3f6mha5569q.apps.googleusercontent.com',
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
}

export const AuthProvider = ({ children }) => {

    const signInWithGoogle = async () => {
        await Google.logInAsync(config).then(async (logInResult) => {
            if(logInResult.type === "success") {
            }
        })
    }

  return(
    <AuthContext.Provider
     value={{
        user: null,
        signInWithGoogle
     }}
     >
        {children}
    </AuthContext.Provider>
    )
};

export default function useAuth() {
  return useContext(AuthContext);
}
