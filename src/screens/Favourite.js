import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { AsyncStorage } from 'react-native';
import { _retrieveData, locations } from '../../appService'
import { useIsFocused } from "@react-navigation/native";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

import moment from 'moment';

const Maps = (props) => {

    const isVisible = useIsFocused();
    const [isLoading, setLoading] = useState(true);
    const [savedPlaces, setSavedPlaces] = useState([]);

    useEffect(() => {

      //console.log("called when screen open and also on close"); 
      if (isVisible) {

        console.log("called when screen open or when back on screen "); 
     }
     const asyncFunctionData = async () => {
       try {
         _retrieveData().then(r => {
            setSavedPlaces(JSON.parse(r));
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

          return(

              <MapView
                style={{ flex: 1 }}
                region={{
                  "latitude": Number(`${props.route.params.coordinates[0]}`),
                  "longitude": Number(`${props.route.params.coordinates[1]}`),
                  latitudeDelta: 0.5,
                  longitudeDelta: 0.5 * (screenWidth / screenHeight),
                }}
            >
                    {savedPlaces.map((marker, index) => {
                      const coords = {
                          latitude: marker.coord.lat,
                          longitude: marker.coord.lon,
                      };

                // const metadata = `Status: ${marker.statusValue}`;

                return (
                  // <Text>
                  //   {marker.coord.lat + Math.random()} - {marker.coord.lon + Math.random()} 
                  // </Text>
                    <MapView.Marker
                        key={index}
                        coordinate={coords}
                        title={`Place: ` + marker.name}
                        description={`Temperature: ` + marker.main.temp.toString()  + ` °C`}
                      //     image: ``,
                      //     day: `${moment(marker.dt_txt).format('dddd')}`,
                      //     weatherData: `${JSON.stringify(weatherData)}`,
                      //     dayWeather: `${JSON.stringify(weeklyDays[r])}`,
                      //     backgroundColor: `${getColor(weatherDataFocust[r].weather[0].main)}`
                      //   })
                      // }
                    />
                );
              })}
            </MapView>
          )          
            }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#47AB2F',
      alignItems: 'center',
      justifyContent: 'center',
    },
    activityLoader: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
      }
})

export default Maps;