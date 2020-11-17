import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator} from 'react-native';
import { _retrieveData, getWeatherIcon } from '../../appService';
import { useIsFocused } from "@react-navigation/native";

import color from '../constants/Colors';
import NetInfo from "@react-native-community/netinfo";
import moment from 'moment';
 navigationOptions = ({ navigation }) => ({
    title: "Home",
})
 const List = (props) => {

    

    const isVisible = useIsFocused();
    const [isLoading, setLoading] = useState(true);
    const [savedPlaces, setSavedPlaces] = useState([]);


    useEffect(() => {

        //console.log("called when screen open and also on close"); 
        if (isVisible) {
  
          console.log("called when screen open or when back on screen "); 
         
          try {
            // Subscribe
                    const unsubscribe = NetInfo.addEventListener(state => {
                      console.log("Connection type", state.type);
                      console.log("Is connected?", state.isConnected);
                      !state.isConnected ? `${Alert.alert(
                        "NETWORK INFO",
                        "You're currently offline, Press OK to view saved favourite locations.",
                        [
                          { text: "OK", onPress: () => {props.navigation.navigate('List')} }
                        ],
                        { cancelable: false }
                      )}`
                      : state.isConnected
                    });
            
                    // Unsubscribe
                    unsubscribe();
                 } catch (e) {}
            
              
       }
       const asyncFunctionData = async () => {
         try {
           _retrieveData().then(r => {
              const removeDups = JSON.parse(r).filter((v,i,a)=>a.findIndex(t=>(t.name === v.name))===i)
              setSavedPlaces(removeDups);
              //console.log("Loaded", JSON.parse(r))
              setLoading(false);
           })
         } catch (e) {}
       }
       asyncFunctionData();
      }, [setSavedPlaces, isVisible]);
      
      if (isLoading) {
          return <View style={styles.activityLoader}>
            <ActivityIndicator size="large" color="#9bc235"/>
          </View>;
        }

  return (
    <View style={ {flex: 1}}>
      {/* <Text style={styles.header}>{props.route.params.day}</Text> */}
      <ScrollView style={styles.scrollView}>
        {
         savedPlaces.map((r,i) => 
         <TouchableOpacity key={i}
         onPress={() => {
            props.navigation.navigate('ListDatails', {
            locationWeatherData: `${JSON.stringify(r)}`
            }
            
            )}}
         >
          <View   style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            backgroundColor: 'red'
          }, styles.touchable}>
            <View>
             
          <View style={styles.itemContainer}>
              <Text style={styles.title}> {r.name}</Text> 
              <Image style={styles.imgIcon} source={getWeatherIcon(`${r.weather[0].main}`)} />
              <Text style={styles.title}> {r.main.temp}&#8451; </Text>
          </View>
           
        </View>

          </View>
          </TouchableOpacity>
         )    
         
        }
       
        </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}



const styles = StyleSheet.create({
  itemContainer: {
    width:'100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#007fba',
    marginTop: '2%'
  },
  imgIcon:{
    flex: 1,
    width: '5%',
    left: '50%',
    position:'absolute',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
    
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#c7c6c6',
},
activityLoader: {
  flex: 1,
  justifyContent: 'center',
  alignContent: 'center',
  alignSelf: 'center',
},
header:{
  alignSelf:'center', 
  fontSize:50, 
  paddingBottom: 10, 
  padding:10, 
  fontWeight:'bold', 
  color:'white', 
  textDecorationLine:'underline'
}
});

export default List;