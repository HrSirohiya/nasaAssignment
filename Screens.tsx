import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    StyleSheet,
    Alert
  } from 'react-native';
import {RootStackParamList} from './App';
import axios from 'axios';


type ScreenNavigationProp<
  T extends keyof RootStackParamList
> = StackNavigationProp<RootStackParamList, T>;

type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;
type Props<T extends keyof RootStackParamList> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};
export const HomeScreen: React.FC<Props<'HomeScreen'>> = ({navigation}) => {
    const [asteroidId, setAsteroidId] = useState("");
   

    const getDataUsingAsyncAwaitGetCall = async () => {

        try {
          const response = await axios.get(
            'https://api.nasa.gov/neo/rest/v1/neo/'+asteroidId+'?api_key=j0JEsO6cmDRcbxefZ4EzfoOPZebG0kcYsPc2rJDS',
          );
          console.log('response---',JSON.stringify(response.data));

             navigation.navigate('DetailsScreen', {
            name:JSON.stringify(response.data.name),
            nasaJplUri:JSON.stringify(response.data.nasa_jpl_url),
            isPotentiallyHazardousAsteroid:JSON.stringify(response.data.is_potentially_hazardous_asteroid)
            
          })


        } catch (error) {
          // handle error
          console.log('respoooooonse',JSON.stringify(error));

          Alert.alert(JSON.stringify(error)) 
        }
      };



      const getDataUsingAsyncAwaitGetCall2 = async () => {

        try {
          const response = await axios.get(
            'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=j0JEsO6cmDRcbxefZ4EzfoOPZebG0kcYsPc2rJDS',
          );
          const randomNumber = Math.floor(Math.random() * response.data.near_earth_objects.length);
          console.log('response---',JSON.stringify(response.data));
            navigation.navigate('DetailsScreen', {
            name:JSON.stringify(response.data.near_earth_objects[randomNumber].name),
            nasaJplUri:JSON.stringify(response.data.near_earth_objects[randomNumber].nasa_jpl_url),
            isPotentiallyHazardousAsteroid:JSON.stringify(response.data.near_earth_objects[randomNumber].is_potentially_hazardous_asteroid)

            
          })


        } catch (error) {
          // handle error
          console.log('respoooooonse',JSON.stringify(error));
          Alert.alert(JSON.stringify(error)) 
         
        }
      };

  return (
    <View style={styles.heading}>
    <Text >Enter Asteroid Id </Text>
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Enter Asteroid ID"
        value={asteroidId}
        keyboardType="numeric"
        onChangeText={text => setAsteroidId(text)}
      />

       <Button
        disabled={!asteroidId || asteroidId.length<7}
        title="Submit"
        onPress={getDataUsingAsyncAwaitGetCall}
      />

      <View style={styles.form}>
      <Button
        title="Random Asteroid'"
        onPress={getDataUsingAsyncAwaitGetCall2}
      />
      </View>

     
    </View>
  </View>

  
  );
};

export const DetailsScreen: React.FC<Props<'DetailsScreen'>> = ({route}) => {
  const {name,nasaJplUri,isPotentiallyHazardousAsteroid} = route.params;

return (
    <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start',padding:20}}>
      <Text style={styles.buttonText} >Asteroid Details </Text>
      <Text style={styles.titleText}>Name : <Text style={styles.valueText}>{name}</Text></Text>
      <Text style={styles.titleText}>NasaJplUri : <Text style={styles.valueText}>{nasaJplUri}</Text></Text>
      <Text style={styles.titleText}>IsPotentiallyHazardousAsteroid : <Text style={styles.valueText}>{isPotentiallyHazardousAsteroid}</Text></Text>
      {/* <Text>{otherParam}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
    heading: {
      marginTop:20,
      margin:20
      
      
    },
    form: {
      marginTop: 5,
    },
    input: {
      padding: 15,
      borderColor: 'rgba(0, 0, 0, 0.2)',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 20,
    },
    textView: {
      padding: 5,
      borderColor: 'rgba(0, 0, 0, 0.2)',
      marginBottom: 20,
      color: '#000',
      fontWeight: '800'
    },
    addItemButton: {
      backgroundColor: '#eb8634',
      paddingVertical: 20,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {color: '#000',marginBottom:10,  fontSize: 20,fontWeight: "bold"},
   
    titleText: {color: '#000',marginBottom:10,  fontSize: 14,fontWeight: "bold"},
    valueText: {color: '#000',marginBottom:10,  fontSize: 13,fontWeight: "500"},

  })