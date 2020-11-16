import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import { getWeatherIcon, getColor } from '../../appService';

import moment from 'moment';

 const Details = (props) => {
  //console.log("Props",JSON.parse(props.route.params.dayWeather))
  const today = JSON.parse(props.route.params.dayWeather);
  const color = props.route.params.backgroundColor;

  // console.log("Background", color)

  return (
    <View style={ {flex: 1,backgroundColor: `${color}`}}>
      <Text style={styles.header}>{props.route.params.day}</Text>
      <ScrollView style={styles.scrollView}>
        {
         today.map(r => 
          <View key={r.dt}  style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            backgroundColor: 'red'
          }, styles.touchable}>
            <View>
             
          <View style={styles.itemContainer}>
              <Text style={styles.title}> {moment(r.dt_txt).format('LTS')}</Text> 
              <Image style={styles.imgIcon} source={getWeatherIcon(`${r.weather[0].main}`)} />
              <Text style={styles.title}> {r.main.temp}&#8451; </Text>
          </View>
           
        </View>

          </View>

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

export default Details;