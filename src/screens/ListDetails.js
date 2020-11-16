import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import { getWeatherIcon, getColor } from '../../appService';

import moment from 'moment';

 const ListDetails = (props) => {
  //console.log("Props",JSON.parse(props.route.params.dayWeather))
  const selectedLocation = JSON.parse(props.route.params.locationWeatherData);
  console.log("selectedLocation", selectedLocation)

  return (
    <View style={ {flex: 1}}>
      <ScrollView style={styles.scrollView}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={styles.grid}><Text style={styles.title}>Feals Like</Text></View>
        <View style={styles.grid2}><Text style={styles.title}>{selectedLocation.main.feels_like}&#8451;</Text></View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={styles.grid}><Text style={styles.title}>Humidity</Text></View>
        <View style={styles.grid2}><Text style={styles.title}>{selectedLocation.main.humidity}&#8451;</Text></View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={styles.grid}><Text style={styles.title}>Pressure</Text></View>
        <View style={styles.grid2}><Text style={styles.title}>{selectedLocation.main.feels_like}&#8451;</Text></View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={styles.grid}><Text style={styles.title}>Current Temp</Text></View>
        <View style={styles.grid2}><Text style={styles.title}>{selectedLocation.main.temp}&#8451;</Text></View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={styles.grid}><Text style={styles.title}>Min Temp</Text></View>
        <View style={styles.grid2}><Text style={styles.title}>{selectedLocation.main.temp_min}&#8451;</Text></View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={styles.grid}><Text style={styles.title}>Max Temp</Text></View>
        <View style={styles.grid2}><Text style={styles.title}>{selectedLocation.main.temp_max}&#8451;</Text></View>
      </View>
          {/* <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            backgroundColor: 'red'
          }, styles.touchable}> */}
          {/* <View style={styles.itemContainer}>
             <Text style={styles.title}>Feals Like: {selectedLocation.main.feels_like}&#8451; </Text> 
             <Text style={styles.title}>Humidity: {selectedLocation.main.humidity}</Text>
             <Text style={styles.title}>Pressure: {selectedLocation.main.pressure}</Text>
             <Text style={styles.title}>Temp: {selectedLocation.main.temp}</Text>
             <Text style={styles.title}>Min Temp: {selectedLocation.main.temp_min}</Text>
             <Text style={styles.title}>Max Temp: {selectedLocation.main.temp_max}</Text>
          </View> */}
           
        

          {/* </View>   */}
        
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
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    height: 50,
    padding: 2,
    alignContent:'center',
    alignSelf: 'flex-end'
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
    height:'50%',
    width:'50%'
},
grid2:{
    backgroundColor:'#006fba',
    height:'50%',
    width:'50%'
}
});

export default ListDetails;