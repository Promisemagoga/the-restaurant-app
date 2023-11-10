import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar';

import BottomNav from '../Components/BottomNav';
import { useNavigation } from '@react-navigation/native';
import { Tab } from '@rneui/themed';




export default function Home({ setIsAuth }) {

  const [authStatus, setAuthStatus] = useState(true);
  const [index, setIndex] = React.useState(0);
  const navigation = useNavigation()
  useEffect(() => {
    if (!authStatus) {
      setIsAuth(false)
    }
  }, [authStatus])
  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <ScrollView style={styles.homeCont}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20, color: "#7D7C7C" }}>Categories</Text>
        <View style={{ height: 150 }}>
          <ScrollView horizontal>
            <Tab containerStyle={{ flexDirection: 'row', flex: 1 }} value={index} onChange={setIndex} dense
              indicatorStyle={{
                backgroundColor: '#FF9209',
                height: 3,
                display: 'none'
              }}
            >
              <Tab.Item key="cat1">
                <TouchableOpacity style={styles.categoryTab} onPress={() => navigation.navigate("cat1")}>
                  <View style={{ width: "100%", height: 100 }}>
                    <Image source={require("../assets/logo.png")} style={{ width: "100%", height: 100, objectFit: "contain" }} />
                  </View>
                  <Text style={{ fontSize: 14, fontWeight: "bold", color: "#000" }}>Burgers</Text>
                </TouchableOpacity>
              </Tab.Item>
              <Tab.Item key="cat4">
                <TouchableOpacity style={styles.categoryTab} onPress={() => navigation.navigate("cat4")}>
                  <View style={{ width: "100%", height: 100 }}>
                    <Image source={require("../assets/iceCream3-removebg-preview.png")} style={{ width: "100%", height: 80, objectFit: "contain" }} />
                  </View>
                  <Text style={{ fontSize: 15, fontWeight: "bold", color: "#000" }}>Dessert</Text>
                </TouchableOpacity>
              </Tab.Item>
              <Tab.Item key="cat2"  >
                <TouchableOpacity style={styles.categoryTab} onPress={() => navigation.navigate("cat2")}>
                  <View style={{ width: "100%", height: 100 }}>
                    <Image source={require("../assets/3burgers-removebg-preview.png")} style={{ width: "100%", height: 100, objectFit: "contain" }} />
                  </View>
                  <Text style={{ fontSize: 14, fontWeight: "bold", color: "#000" }}>Sharing</Text>
                </TouchableOpacity>
              </Tab.Item>
              <Tab.Item key="cat3">
                <TouchableOpacity style={styles.categoryTab} onPress={() => navigation.navigate("cat3")}>
                  <View style={{ width: "100%", height: 100 }}>
                    <Image source={require("../assets/drink.png")} style={{ width: "100%", height: 100, objectFit: "contain" }} />
                  </View>
                  <Text style={{ fontSize: 14, fontWeight: "bold", color: "#000" }}>Beverages</Text>
                </TouchableOpacity>
              </Tab.Item>
              <Tab.Item key="cat5">
                <TouchableOpacity style={styles.categoryTab} onPress={() => navigation.navigate("cat5")}>
                  <View style={{ width: "100%", height: 100 }}>
                    <Image source={require("../assets/fries4.jpg")} style={{ width: "100%", height: 100, objectFit: "contain" }} />
                  </View>
                  <Text style={{ fontSize: 15, fontWeight: "bold", color: "#000" }}>Sides</Text>
                </TouchableOpacity>
              </Tab.Item>
              <Tab.Item key="cat6" >
                <TouchableOpacity style={styles.categoryTab} onPress={() => navigation.navigate("cat6")}>
                  <View style={{ width: "100%", height: 100 }}>
                    <Image source={require("../assets/kids-meal.png")} style={{ width: "100%", height: 100, objectFit: "contain" }} />
                  </View>
                  <Text style={{ fontSize: 15, fontWeight: "bold", color: "#000" }}>Kiddies</Text>
                </TouchableOpacity>
              </Tab.Item>
            </Tab>
          </ScrollView>
        </View>
        <View style={styles.offersMainCont}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20, color: "#7D7C7C" }}>Offers for you</Text>
          <View style={styles.scrollCour}>
            <View style={{ width: "100%", display: "flex", flexDirection: "row", columnGap: 10 }}>

              <TouchableOpacity onPress={() => navigation.navigate("cat1")} style={styles.offersCont}>
                <View style={{ width: "100%", height: 100 }}>
                  <Image source={require("../assets/logo3.png")} style={{ width: "80%", height: 130, objectFit: "contain" }} />
                </View>

                <Text style={{ color: "#fea70d", fontWeight: "500",fontSize:13, marginTop:"auto"  }}>Mega Meal</Text>
                <Text style={{ color: "#009687", fontSize:12, fontWeight: "bold" }}>10% Off Code: 616F8P</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("cat3")} style={styles.offersCont}>
                <View style={{ width: "100%", height: 100 }}>
                  <Image source={require("../assets/milkshakechoc.png")} style={{ width: "80%", height: 130 }} />
                </View>
                <Text style={{ color: "#fea70d", fontWeight: "500", fontSize:13, marginTop:"auto" }}>Chocolate Milkshake</Text>
                {/* <Text>Creamy Chocolate Milkshake</Text> */}
                <Text style={{ color: "#009687", fontSize: 12, fontWeight: "bold" }}>10% Off Code: 616F13</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: "100%", display: "flex", flexDirection: "row", columnGap: 10 }}>
              <TouchableOpacity onPress={() => navigation.navigate("cat3")} style={styles.offersCont}>
                <View style={{ width: "100%", height: 100 }}>
                  <Image source={require("../assets/icecream11.jpg")} style={{ width: "90%", height: 130, objectFit: "contain" }} />
                </View>
                <Text style={{ color: "#fea70d", fontWeight: "500",fontSize:13, marginTop:"auto"  }}>Rainbow IceCream</Text>
                <Text style={{ color: "#009687", fontSize: 12, fontWeight: "bold" }}>10% Off Code: 616F4C</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("cat6")} style={styles.offersCont}>
                <View style={{ width: "100%", height: 100 }}>
                  <Image source={require("../assets/4c16109a14856753f08070215d75acbf-removebg-preview.png")} style={{ width: "90%", height: 130, objectFit: "contain" }} />
                </View>

                <Text style={{ color: "#fea70d", fontWeight: "500",fontSize:13, marginTop:"auto"  }}>Cheesy Nuggets</Text>
                <Text style={{ color: "#009687", fontSize: 12, fontWeight: "bold" }}>10% Off Code: 616F77</Text>

              </TouchableOpacity>
            </View>

            {/* <Carousel
              data={carouselData}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.carouselContainer}>
                    <Image source={item.img} style={{ width: "100%", height: 250 }} />
                    <Text style={{ color: "#fea70d" }}>{item.name}</Text>
                    <Text style={{ width: 200 }}>{item.description}</Text>
                    <Text style={{ color: "#009687" }}>{item.offer}</Text>
                  </View>
                )
              }}
              sliderWidth={350}
              itemWidth={320}
              autoplay={true}
              loop={true}
              autoplayInterval={3000}
            /> */}
          </View>
        </View>
      </ScrollView>
      <BottomNav setAuthStatus={setAuthStatus} />
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
    marginTop: 100,
    padding: 10,
  },

  categories: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"

  },

  item: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    height: 100,
    margin: 6,
    marginTop: 20,
    padding: 5,
  },

  categoryCont: {
    width: "100%",
    height: 100,
    borderRadius: 100,
    backgroundColor: "#FF9209",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  catCont: {
    marginTop: 50,
  },

  scrollCour: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "column",
    rowGap: 10,


  },

  offersCont: {

    width: 170,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 5,
    padding: 8
  },

  offersMainCont: {
    marginTop: 50,
    marginBottom: 50,

  },

  categoryTab: {
    width: 130,
    height: 140,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // margin: 5,
    padding: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },


});