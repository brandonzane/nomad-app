import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import * as Google from 'expo-google-app-auth';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut } from '@firebase/auth';
import { auth } from '../firebase';

// WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext({});

const config = {
    androidClientId: '463646179309-6i8i2p332khk1qbd3deojnlmbie9o0qk.apps.googleusercontent.com',
    iosClientId: '463646179309-9cbtfar061a8oitl1oqec3f6mha5569q.apps.googleusercontent.com',
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
}

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(
        () =>
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // Logged in...
                setUser(user);
            } else{
                // Logged out...
                setUser(null);
            }

            setLoadingInitial(false);
        }),
        []
    );

    const logout = () => {
        setLoading(true);

        signOut(auth)
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    };

    const signInWithGoogle = async () => {
        setLoading(true);

        await Google.logInAsync(config).then(async (logInResult) => {
            if(logInResult.type === "success") {
                // login
                const { idToken, accessToken } = logInResult;
                const credential = GoogleAuthProvider.credential(idToken, accessToken);
                await signInWithCredential(auth, credential);
            }

            return Promise.reject();
        })
        .catch(error=>setError(error))
        .finally(()=>setLoading(false));
    };

    const memoedValue = useMemo(
    () => ({
        user,
        loading,
        error,
        signInWithGoogle,
        logout,
    }), [user, loading, error])

  return(
    <AuthContext.Provider value={memoedValue}>
        {!loadingInitial && children}
    </AuthContext.Provider>
    )
};

export default function useAuth() {
  return useContext(AuthContext);
}
