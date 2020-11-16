import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator, Button} from 'react-native';
import { currentLocationWeather, fetch5DayWeatherFocust, getImage, getColor, getWeatherIcon, addToFavourite } from "../../appService";
import useGeoLocation from "../components/geoLocation";
import Colors from '../constants/Colors';
import axios from "axios";

import moment from 'moment';

const Home = props => {

  //console.log("props", props)
    const isVisible = useIsFocused();
    const [isLoading, setLoading] = useState(true);
    let [weatherData, setWeatherData] = useState({});
    let [weatherDataFocust, setWeatherDataFocust] = useState({});
    let [weatherImage, setWeatherImage] = useState({});
    let [weatherColor, setWeatherColor] = useState({});
    let [days, setDays] = useState({});
    let [weeklyDays, setWeeklyDays] = useState({});
    let [geolocation, setGeolocation] = useState({});

    const latLon = useGeoLocation();
    
    useEffect(() => {
      console.log("initial load"); 
      if (isVisible) {
        console.log("reloaded"); 
        if(latLon){
          //console.log("Lat", latLon[1])
          axios.get(`${currentLocationWeather(latLon)}`).then(response => {
            setWeatherData(response.data);
            setWeatherImage(response.data.weather[0].main);
            setWeatherColor(response.data.weather[0].main);
          });
        }
     }

    }, [latLon, isVisible]);

    useEffect(() => {
      if(latLon){
        
        axios.get(`${fetch5DayWeatherFocust(latLon)}`).then(response => {
        //Creating array of days
        const Days = [...new Set(response.data.list.map((w) => moment(w.dt_txt).format('dddd')))]
        const weekDays = response.data.list.reduce((r, c) => (r[moment(c.dt_txt).format('dddd')] = [...r[moment(c.dt_txt).format('dddd')] || [], c], r), {})
        //Creating and grouping objects of array objects by date
        const weatherByDate = response.data.list.reduce((i, val) => {
          i[moment(val.dt_txt).format('dddd')] = val
          return i;
        }, {})
        //console.log("----", weatherByDate)
        Days.shift();
        setGeolocation(latLon);
        setWeatherDataFocust(weatherByDate);
        setDays(Days);
        setWeeklyDays(weekDays);
        setLoading(false);
      });
    }
    }, [latLon]);
  
    if (isLoading) {
      return <View style={styles.activityLoader}>
        <ActivityIndicator size="large" color="#9bc235"/>
      </View>;
    }

  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
    }}>
     
      <View style={styles.imageContainer}>
        <Image style={styles.img} source={getImage(`${weatherImage}`)} />
        <Text style={styles.mainForecast}>{JSON.stringify(weatherData.main.temp)}&#8451;</Text>
        <Text style={styles.weather}>{weatherData.weather[0].main}</Text>
        <Text style={styles.place}>{weatherData.name}</Text>
      </View>
      <View style={{height: '8%', backgroundColor: `${getColor(weatherColor)}`}}>
       <View style={styles.todaysWeather}>
            <Text style={styles.title}> {JSON.stringify(weatherData.main.temp_min)}&#8451; </Text> 
            <Text style={styles.title}> {JSON.stringify(weatherData.main.temp)}&#8451; </Text>
            <Text style={styles.title}> {JSON.stringify(weatherData.main.temp_max)}&#8451; </Text>
        </View>
        <View style={styles.todayHeader}>
            <Text style={styles.label}> Min </Text> 
            <Text style={styles.label}> Current </Text>
            <Text style={styles.label}> Max </Text>
        </View>
      </View>
      <View style={{height: "0.2%", backgroundColor: 'white'}}>
      </View>
      <View style={{height: '34%', backgroundColor: `${getColor(weatherColor)}`}}>
      <ScrollView style={styles.scrollView}>
        {
         days.map(r => 
          <TouchableOpacity key={r} onPress={() => {
            props.navigation.navigate('Details', {
            image: `${weatherImage}`,
            day: `${moment(weatherDataFocust[r].dt_txt).format('dddd')}`,
            weatherData: `${JSON.stringify(weatherData)}`,
            dayWeather: `${JSON.stringify(weeklyDays[r])}`,
            backgroundColor: `${getColor(weatherDataFocust[r].weather[0].main)}`
            }
            
            )}}>
          <View  style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'stretch',
          }, styles.touchable}>
            <View>
             
          <View style={styles.itemContainer}>
            <Text style={styles.title}> {moment(weatherDataFocust[r].dt_txt).format('dddd')}</Text> 
            <Image style={styles.imgIcon} source={getWeatherIcon(`${weatherDataFocust[r].weather[0].main}`)} />
            <Text style={styles.title}> {weatherDataFocust[r].main.temp}&#8451; </Text>
          </View>
        </View>

          </View>
          </TouchableOpacity>
         )    
        }
        </ScrollView>
        <View style={styles.actions}>
                <Button color={Colors.accent} title="Add To Favourite" onPress={() => {addToFavourite(`${JSON.stringify(weatherData)}`)}}/>
                <Button color={Colors.primary} title="View Favourite" onPress={() =>
          props.navigation.navigate('Maps', 
          { 
            coordinates: geolocation,
          })}/>
            </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
  
  
  }





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#47AB2F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer:{
    width: '100%',
    height: '60%',
    overflow: 'hidden'
},
  gridLayout:{
    flexDirection: 'row',
    alignContent: 'flex-start',
  },
  gridHeader:{
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignSelf: 'center'
  },
  header:{
    alignContent:'flex-start',
    paddingLeft: '10%',
    paddingRight: '10%'
  },
  item:{
    paddingTop: 1,
    paddingLeft: '16%',
    paddingRight: '10%'
  },
  mainForecast:{
    position:'absolute',
    bottom: '50%',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    alignContent: 'center',
    alignSelf: 'center'
  },
  weather:{
    position:'absolute',
    bottom: '40%',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    alignContent: 'center',
    alignSelf: 'center',
  },
  place:{
    position:'absolute',
    bottom: '30%',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    alignContent: 'center',
    alignSelf: 'center',
  },
  rowHeight:{
    padding: 10
  },
  item2:{
    alignSelf:'flex-start',
    alignContent:'center'
  },
  img:{
    width:'100%',
    height: '100%'
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
  lineStyle:{
      borderColor: 'white',
      margin:10,
      bottom: 420
  },
  itemContainer: {
    width:'100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  todaysWeather: {
    flex: 1,
    width:'100%',
    padding: 10,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  todayHeader:{
    flex: 1,
    width:'100%',
    padding: 10,
    paddingBottom: 0,
    paddingTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
itemData: {
    flexDirection: 'row',
    alignItems: 'center'
},
quantity: {
    color: '#888',
    fontSize: 16,
    margin: 10
},
title: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#c7c6c6'
},
label:{
  alignSelf: 'center',
  bottom: 5,
  fontSize: 12,
  fontWeight: 'bold',
  color: '#c7c6c6'
},
amount: {
    fontSize: 16,
    marginLeft: 10
},
deleteButton:{
    marginLeft: 20
},
touchable: {
  borderRadius: 10,
  overflow: 'hidden'
},
activityLoader: {
  flex: 1,
  justifyContent: 'center',
  alignContent: 'center',
  alignSelf: 'center',
},
actions: {
  flexDirection:'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '25%',
  paddingHorizontal: 20,
  paddingBottom: 10
}
});


export default Home;