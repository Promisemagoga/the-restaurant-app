import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navbar from '../Components/Navbar';
import Carousel from 'react-native-snap-carousel';
import carouselData from '../carouselData';



export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <ScrollView style={styles.homeCont}>
        <View style={styles.catCont}>
          <Text style={{ fontSize: 25, marginBottom: 20, marginTop: 20, color: "#7D7C7C" }}>Categories</Text>
          <View style={styles.categories}>
            <View style={styles.item}>
              <Image source={require("../assets/logo.png")} style={{ width: "100%", height: 70 }} />
              <Text>Burgers</Text>
            </View>
            <View style={styles.item}>
              <Image source={require("../assets/sharing.png")} style={{ width: "100%", height: 70 }} />
              <Text>Sharing Meals</Text>
            </View>
            <View style={styles.item}>
              <Image source={require("../assets/drink.png")} style={{ width: "100%", height: 70 }} />
              <Text>Berages</Text>
            </View>
            <View style={styles.item}>
              <Image source={require("../assets/cake.png")} style={{ width: "100%", height: 70 }} />
              <Text>Dessert</Text>
            </View>
            <View style={styles.item}>
              <Image source={require("../assets/fries.png")} style={{ width: "100%", height: 70 }} />
              <Text>Sides</Text>
            </View>
            <View style={styles.item}>
              <Image source={require("../assets/kids-meal.png")} style={{ width: "100%", height: 70 }} />
              <Text>Kiddies Meal</Text>
            </View>
          </View>
        </View>
        <View style={styles.offersMainCont}>
          <Text style={{ fontSize: 25, marginBottom: 20, marginTop: 20, color: "#7D7C7C" }}>Offers for you</Text>
          <View style={styles.scrollCour}>
            <Carousel
             sliderWidth={300}
             itemWidth={200}
            >
            {
              carouselData.map((item) => (
        
                  <View>
                    <Image source={item.img } style={{ width: 200, height: 200 }} />
                    <Text>{item.name}</Text>
                    <Text>{item.description}</Text>

                  </View>
              
              )
              )
             
              }
             
            </Carousel>
          </View>
        </View>
      </ScrollView>
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

  categories: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },

  item: {
    // backgroundColor: "pink",
    width: "30%",
    margin: 6,
    padding: 5,
  },

  catCont: {
    marginTop: 100,
  }

});