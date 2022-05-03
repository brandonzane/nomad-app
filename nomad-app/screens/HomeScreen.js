import { View, Text, Button, TouchableOpacity, Image, StyleSheet} from "react-native";
import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import stag from "../assets/stag.png";
import { useNavigation } from "@react-navigation/core";
import useAuth from "../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context"
import tw from "twrnc";
import { db } from '../firebase'
import {Ionicons, Entypo} from'@expo/vector-icons'
import Swiper from 'react-native-deck-swiper';
import { doc, onSnapshot, collection, setDoc, query, getDocs, where } from "@firebase/firestore";
import generateId from '../lib/generateId';
import { serverTimestamp } from 'firebase/firestore';

const DUMMY_DATA=[
  {
    firstName:'Brandon',
    lastName:'Mushori',
    occupation:'Software Engineer',
    photoURL:'https://brandonzane.com/assets/img/profile1.jpg',
    age:25
  },
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
  const [profiles, setProfiles] = useState([]);
  const swipeRef = useRef(null);

  useLayoutEffect(
    () => 
    onSnapshot(doc(db, 'users', user.uid), snapshot => {
      if (!snapshot.exists()) {
        navigation.navigate('Modal')
      }
    }),
   []
   );

   useEffect(() => {
    let unsub;

    const fetchCards = async () => {

      const passes = await getDocs(collection(db, 'users', user.uid, 'passes')).then
      (snapshot => snapshot.docs.map((doc) => doc.id)
      );

      const swipes = await getDocs(collection(db, 'users', user.uid, 'passes')).then
      (snapshot => snapshot.docs.map((doc) => doc.id)
      );

      const passedUserIds = passes.length > 0 ? passes : ['test'];
      const swipedUserIds = swipes.length > 0 ? passes : ['test'];

      console.log([...passedUserIds, ...swipedUserIds]);

      unsub = onSnapshot(
        query(
          collection(db, 'users'),
          where('id', 'not-in', [...passedUserIds, ...swipedUserIds])
        ),
        (snapshot) => {
        setProfiles(
          snapshot.docs.filter(doc => doc.id !== user.uid).map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    };

    fetchCards();
    return unsub;
  }, [db])

  const swipeLeft = (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    console.log(`You swiped PASS on ${userSwiped.displayName}`);

    setDoc(doc(db, 'users', user.uid, 'passes', userSwiped.id),
    userSwiped)
  };
  const swipeRight = async(cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    const loggedInProfile = await (
      await getDoc(doc(db, 'users', user.uid))
    ).data();

    // Checking if user swiped on you... make sure you put this in a cloud function for production
    getDoc(doc(db, 'users', userSwiped.id, 'swipes', user.uid)).then(
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          // user has matched with you before you matched withg them
          // Create a Match
          console.log(`Hooray, You Matched with ${userSwiped.displayName}`);

          setDoc(doc(db, 'users', user.uid, 'swipes', userSwiped.id),
          userSwiped
          );

          // CREATE A MATCH!
          setDoc(doc(db, 'matches', generateId(user.uid, userSwiped.id)),{
            users: {
              [user.uid]: loggedInProfile,
              [userSwiped.id]: userSwiped
            },
            usersMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp()
          });
          
            navigation.navigate('Match', {
              loggedInProfile,
              userSwiped,
            });
        } else {
          // User has swiped as first interaction between the two or didn't get swiped on...

          console.log(`You swiped on ${userSwiped.displayName} (${userSwiped.job})`
          );
          setDoc(
            doc(db, 'users', user.uid, 'swipes', userSwiped.id),userSwiped);
        }
      }
    );
  };
  

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
      

        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image 
            style={tw`h-20 w-20`}
            source={ stag }
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
        ref={swipeRef}
          containerStyle={{backgroundColor: "transparent"}}
          cards={profiles}
          stackSize={3}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={(cardIndex)=>{
            console.log("Swipe PASS")
            swipeLeft(cardIndex)
          }}
          onSwipedRight={(cardIndex)=>{
            console.log("Swipe MATCH")
            swipeRight(cardIndex)
          }}
          backgroundColor={"#4FD0E9"}
          overlayLabels={{
            left: {
              title:"NOPE",
                        style:{
                            label:{
                                textAlign:'right',
                                color:'red'
                            }
                        }
                    },
                    right:{
                        title:"MATCH",
                        style:{
                            label:{
                                textAlign:'left',
                                color:'green'
                            }
                        }
                    }
          }}
          renderCard={(card) => card ? (
            <View style={tw`bg-white h-3/4 rounded-xl`}>
              <Image
                style={tw`absolute top-0 h-full w-full rounded-xl`}
                source={{ uri: card.photoURL }}
              />

              <View style={[tw
                `absolute bottom-0 bg-white w-full flex-row justify-between items-center h-20 px-6 py-2 rounded-b-xl`,
                  styles.cardShadow,
                ]}>
                <View>
                  <Text style={tw`text-xl font-bold`}>
                    {card.displayName}
                  </Text>
                  <Text>
                    {card.job}
                  </Text>
                </View>
                  <Text style={tw`text-2xl font-bold`}>
                    {card.age}
                  </Text>
              </View>
            </View>
          ) : (
            <View
            style={[tw`relative bg-white h-3/4 rounded-xl justify-center items-center`,
              styles.cardShadow,]}
            >
              <Text style={tw`text-2xl text-red-400 font-bold pb-5`}>No More Profiles</Text>

              <Image
                style={tw`h-65 w-full`}
                height={100}
                width={100}
                source={{ uri: "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"}}
              />
            </View>
          )} 
        />
      </View>
      {/* End of Cards */}
      <View style={tw`flex flex-row justify-evenly`}>
        <TouchableOpacity 
          onPress={() => swipeRef.current.swipeLeft()}
          style={tw`items-center justify-center rounded-full w-16 h-15 bg-red-400`}
        >
          <Entypo name="cross" color="white" size={36} />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => swipeRef.current.swipeRight()}
          style={tw`items-center justify-center rounded-full w-16 h-15 bg-emerald-600`}
        >
          <Entypo name="heart" color="white" size={36} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  cardShadow: {
      shadowColor:'#000',
      shadowOffset:{
          width:0,
          height:1
      },
      shadowOpacity:0.2,
      shadowRadius:1.41,
      elevation:2
  }
})