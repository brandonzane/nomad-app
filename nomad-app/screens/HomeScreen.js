import { View, Text, Button, TouchableOpacity, Image, Stylesheet } from "react-native";
import React, { useLayoutEffect } from "react";
import kLogo from "../assets/k-logo.png";
import { useNavigation } from "@react-navigation/core";
import useAuth from "../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context"
import tw from "twrnc";
import {Ionicons, Entypo} from'@expo/vector-icons'
import Swiper from 'react-native-deck-swiper';

const DUMMY_DATA=[
  {
      firstName:'Elizabeth',
      lastName:'Olsen',
      occupation:'Actress',
      photoURL:'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE5NTU2MzE2NTE5MzAyNjY3/elizabeth-olsen-20631899-1-402.jpg',
      age:32
  },
  {
      firstName:'Jennifer',
      lastName:'Lawrence',
      occupation:'Actress',
      photoURL:'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTQzMjgyNDgwNjIxODIzNTU5/jennifer-lawrence_gettyimages-626382596jpg.jpg',
      age:31
  },
  {
      firstName:'Ketanji',
      lastName:'Jackson',
      occupation:'Federal Judge',
      photoURL:'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTg3OTA2MDAxMzg5NzU3NDkx/gettyimages-1238879023.jpg',
      age: 52
  },
  {
      firstName:'Carolina',
      lastName:'Herrera',
      occupation:'Designer',
      photoURL:'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTgzODQ1MTYzMjMwMDQ1NDQw/gettyimages-845798352.jpg',
      age:83
  },
  {
      firstName:'Elon',
      lastName:'Musk',
      occupation:'Tesla CEO',
      photoURL:'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTc5OTk2ODUyMTMxNzM0ODcy/gettyimages-1229892983-square.jpg',
      age:40
  },
  {
      firstName:'Rafael',
      lastName:'Nadal',
      occupation:'Tennis player',
      photoURL:'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTc5ODc2ODQzNzY2MTYzMDU1/gettyimages-982701222.jpg',
      age:35
  }
]


const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={tw`flex-1`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between px-5`}>
        <TouchableOpacity onPress={logout}>
          <Image
            style={tw`h-10 w-10 rounded-full`}
            source={{ uri: user.photoURL }} 
          />
        </TouchableOpacity>
      

        <TouchableOpacity>
          <Image 
            style={tw`h-14 w-14`}
            source={ kLogo }
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#367C78" />
        </TouchableOpacity>
      </View>
      {/* End of Header */}

      {/* Cards */}
      <View style={tw`flex-1 -mt-6`}>
        <Swiper 
          containerStyle={{backgroundColor: "transparent"}}
          cards={DUMMY_DATA}
          stackSize={2}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          renderCard={(card) => (
            <View style={tw`bg-white h-3/4 rounded-xl`}>
              <Image
                style={tw`absolute top-0 h-full w-full rounded-xl`}
                source={{ uri: card.photoURL }}
              />

              <View style={tw`absolute bottom-0 bg-white w-full flex-row justify-between items-between h-20 px-6 py-2 rounded-b-xl`}>
                <View>
                  <Text style={tw`text-xl font-bold`}>
                    {card.firstName} {card.lastName}
                  </Text>
                  <Text>
                    {card.occupation}
                  </Text>
                </View>
                  <Text style={tw`text-2xl font-bold`}>
                    {card.age}
                  </Text>
              </View>
            </View>
          )}
        />
      </View>
      {/* End of Cards */}
    </SafeAreaView>
  );
};

export default HomeScreen;
