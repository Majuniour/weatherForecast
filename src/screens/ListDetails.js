import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator} from 'react-native';
import { currentLocationWeather } from '../../appService';
import axios from "axios";

import moment from 'moment';

 const ListDetails = (props) => {
  //console.log("Props",JSON.parse(props.route.params.dayWeather))
  const selectedLocation = JSON.parse(props.route.params.locationWeatherData);
  //console.log("selectedLocation", selectedLocation)

  let [weatherData, setWeatherData] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => { 
        //console.log("Lat", latLon[1])
        axios.get(`${currentLocationWeather(Object.values(selectedLocation.coord))}`).then(response => {
        //console.log("response", response.data)
          setWeatherData(response.data);
          setLoading(false);
        });
  }, []);

  if (isLoading) {
    return <View style={styles.activityLoader}>
      <ActivityIndicator size="large" color="#9bc235"/>
    </View>;
  }

  return (
    <View style={ {flex: 1, padding:10, borderRadius:10}}>
      <ScrollView style={styles.scrollView}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.grid}><Text style={styles.title}>Weather Description</Text></View>
        <View style={styles.grid2}><Text style={styles.title}>{weatherData.weather[0].description}</Text></View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.grid}><Text style={styles.title}>Weather Condition</Text></View>
        <View style={styles.grid2}><Text style={styles.title}>{weatherData.weather[0].main}</Text></View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.grid}><Text style={styles.title}>Feals Like</Text></View>
        <View style={styles.grid2}><Text style={styles.title}>{weatherData.main.feels_like}&#8451;</Text></View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={styles.grid}><Text style={styles.title}>Humidity</Text></View>
        <View style={styles.grid2}><Text style={styles.title}>{weatherData.main.humidity} %</Text></View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={styles.grid}><Text style={styles.title}>Pressure</Text></View>
        <View style={styles.grid2}><Text style={styles.title}>{weatherData.main.feels_like}&#8451;</Text></View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={styles.grid}><Text style={styles.title}>Current Temp</Text></View>
        <View style={styles.grid2}><Text style={styles.title}>{weatherData.main.temp}&#8451;</Text></View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={styles.grid}><Text style={styles.title}>Min Temp</Text></View>
        <View style={styles.grid2}><Text style={styles.title}>{weatherData.main.temp_min}&#8451;</Text></View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.grid}><Text style={styles.title}>Max Temp</Text></View>
        <View style={styles.grid2}><Text style={styles.title}>{weatherData.main.temp_max}&#8451;</Text></View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.grid}><Text style={styles.title}>Wind Speed</Text></View>
        <View style={styles.grid2}><Text style={styles.title}>{weatherData.wind.speed} km/h</Text></View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.grid}><Text style={styles.title}>Latitude</Text></View>
        <View style={styles.grid2}><Text style={styles.title}>{weatherData.coord.lat}</Text></View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.grid}><Text style={styles.title}>Longitude</Text></View>
        <View style={styles.grid2}><Text style={styles.title}>{weatherData.coord.lon}</Text></View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.grid}><Text style={styles.title}>Last Updated Time</Text></View>
        <View style={styles.grid2}><Text style={styles.title}>{moment.unix(weatherData.dt).format('lll')}</Text></View>
      </View>
        </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    width:'100%',
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
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
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    height: 30,
    alignSelf: 'flex-end',
    padding:5,
    textTransform: 'capitalize'
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
},
grid:{
    backgroundColor:'#007fba',
    width:'50%'
},
grid2:{
    backgroundColor:'#006fba',
    width:'50%'
}
});

export default ListDetails;