import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Navbar from '../Components/Navbar';
import Carousel from 'react-native-snap-carousel';
import carouselData from '../carouselData';
import BottomNav from '../Components/BottomNav';
import { useNavigation } from '@react-navigation/native';




export default function Home() {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <ScrollView style={styles.homeCont}>
        <View style={styles.catCont}>
          <Text style={{ fontSize: 25, marginBottom: 20, marginTop: 20, color: "#7D7C7C" }}>Categories</Text>
          <View style={styles.categories}>
            <TouchableOpacity style={styles.item} >
              <Image source={require("../assets/logo.png")} style={{ width: "100%", height: 70 }} />
              <Text>Burgers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Image source={require("../assets/sharing.png")} style={{ width: "100%", height: 70 }} />
              <Text>Sharing Meals</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Image source={require("../assets/drink.png")} style={{ width: "100%", height: 70 }} />
              <Text>Bevarages</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Image source={require("../assets/cake.png")} style={{ width: "100%", height: 70 }} />
              <Text>Dessert</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Image source={require("../assets/fries.png")} style={{ width: "100%", height: 70 }} />
              <Text>Sides</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Image source={require("../assets/kids-meal.png")} style={{ width: "100%", height: 70 }} />
              <Text>Kiddies Meal</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.offersMainCont}>
          <Text style={{ fontSize: 25, marginBottom: 20, marginTop: 20, color: "#7D7C7C" }}>Offers for you</Text>
          <View style={styles.scrollCour}>
            <Carousel
              data={carouselData}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.carouselContainer}>
                    <Image source={item.img} style={{ width: "100%", height: 250 }} />
                    <Text style={{color: "#fea70d"}}>{item.name}</Text>
                    <Text style={{width:200}}>{item.description}</Text>
                    <Text style={{color:"#009687"}}>{item.offer}</Text>
                  </View>
                )
              }}
              sliderWidth={300}
              itemWidth={320}
              autoplay={true}
              loop={true}
              autoplayInterval={3000}
            />
          </View>
        </View>
      </ScrollView>
      <BottomNav/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  homeCont: {
    marginTop: 120,
    padding: 10
  },

  categories: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },

  item: {
    width: "30%",
    margin: 6,
    padding: 5,
  },

  catCont: {
    marginTop: 100,
  },

  scrollCour: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  carouselContainer:{
    // backgroundColor: "#000",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  }

});