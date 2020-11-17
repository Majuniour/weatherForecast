import { AsyncStorage, Alert } from 'react-native';
import { NetInfo } from '@react-native-community/netinfo';
import React, { useState, useEffect } from 'react';

export const currentLocationWeather = (latLon) => {
    console.log("new lance", latLon)
    const URL = `http://api.openweathermap.org/data/2.5/weather?lat=${latLon[0]}&lon=${latLon[1]}&appid=15400b39b890389eb45052fdbd74bfce&units=metric`;
    return URL
}

export const fetch5DayWeatherFocust = (latLon) => {
    console.log("Coordinates", latLon)
    const URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${latLon[0]}&lon=${latLon[1]}&appid=15400b39b890389eb45052fdbd74bfce&units=metric`;
    return URL
}





const fav = [];
export const addToFavourite = (location) => {
   fav.push(JSON.parse(location));
   Alert.alert(
    "SAVE INFO",
    "Successfully saved location",
    [
      { text: "OK", onPress: () => console.log("OK Saved") }
    ],
    { cancelable: false }
  );
  // console.log("Saved Locations", fav);
   
   _storeFavLocations(fav)
}

_storeFavLocations = async (arr) => {
    try {
      //  var favouritePlaces = await AsyncStorage.getItem('favouritePlaces');
      // await AsyncStorage.setItem(
      //   'favouritePlaces', JSON.stringify(arr)
      // );
     
      const favouritePlaces = await AsyncStorage.getItem('favouritePlaces') || '[]';
      console.log("fav",JSON.parse(favouritePlaces))
      const myKey = [...JSON.parse(favouritePlaces), arr[0]];


      //console.log("my key", JSON.stringify(myKey))
      
     // var favouritePlaces = await AsyncStorage.getItem('favouritePlaces');
      await AsyncStorage.setItem(
        'favouritePlaces', JSON.stringify(myKey)
      );
    } catch (error) {
      // Error saving data
    }
  };

  export const _retrieveData = async () => {
    try {
      const savedPlaces = await AsyncStorage.getItem('favouritePlaces');
      if (savedPlaces !== null) {
        // We have data!!
        //console.log("Saved", savedPlaces);
        return savedPlaces
      }
    } catch (error) {
      // Error retrieving data
    }
  };

export const getImage = (image) => {

        switch (image) {
            case "Rain":
                return require("./assets/Images/rain.png")
                break;
            case "Sunny":
                return require("./assets/Images/sunny.png")
                break;
            case "Clouds":
                return require("./assets/Images/clouds.png")
                break;
    
            default:
                return require("./assets/Images/forest_sunny.png");
                break;
        }
}

export const getWeatherIcon = (image) => {

    switch (image) {
        case "Rain":
            return require("./assets/Icons/rain.png")
            break;
        case "Sunny":
            return require("./assets/Icons/clear.png")
            break;
        case "Clouds":
            return require("./assets/Icons/partlysunny.png")
            break;

        default:
            return require("./assets/Icons/clear.png");
            break;
    }
}

export const getColor = (climate) => {

    switch (climate) {
        case "Rain":
            return '#57575D'
            break;
        case "Sunny":
            return '#47AB2F'
            break;
        case "Clouds":
            return '#54717A'
            break;

        default:
          return '#47AB2F'
            break;
    }
}

