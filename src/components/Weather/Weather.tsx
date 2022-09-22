import React, {useEffect, useRef, useState} from 'react';
import {Autocomplete, AutocompleteItem, Button, State} from '@ui-kitten/components';
import {StyleSheet, Text, TextInput, View, Image, Alert} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useDebounce} from "../../hooks/useDebounce";
import {LocationI, locationAPI} from "../../services/LocationServices";
import {weatherAPI} from "../../services/WeatherService";
import {setLocation} from "../../store/reducers/location.slice";
import * as Location from 'expo-location';
import {AutocompleteProps} from "@ui-kitten/components/ui/autocomplete/autocomplete.component";

const Weather = () => {
    const dispatch = useAppDispatch();
    const {lat, lon} = useAppSelector(state => state.locationReducer);

    //location
    const getMyLocation = async () => {
        try{
            await Location.requestForegroundPermissionsAsync();
            const {coords} = await Location.getCurrentPositionAsync();
            return coords;
        } catch (error) {
            Alert.alert(error.name, error.message);
        }
    }

    useEffect(() => {
        getMyLocation()
            .then(coords => {
                if (coords) {
                    dispatch(setLocation({lat: coords.latitude, lon: coords.longitude}));
                }
            })
            .catch((error) => {
                Alert.alert(error.name, error.message);
            })
        console.log('effect');
    }, []);

    //end location
    const [value, setValue] = useState<string>('');
    const debouncedValue = useDebounce(value, 1000);

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    }

    const {
        data: currentLocation,
        error: locationError,
        isLoading: locationIsLoading
    } = locationAPI.useGetLocationQuery(debouncedValue);
    const {data: currentWeather, error: weatherError, isLoading: weatherIsLoading} = weatherAPI.useGetWeatherQuery({
        lat,
        lon
    });

    // ui kitten
    const noResults = () => (
        <AutocompleteItem title={'Нет результатов'}/>
    )

    const renderOption = (item: LocationI, index: number) => (
        <AutocompleteItem
            key={lat}
            title={`${item.name} (${item.country})`}/>
    );

    const onSelect = (index: number) => {
        if (currentLocation) {
            setValue(currentLocation[index].name);
            dispatch(setLocation({lat: currentLocation[index].lat, lon: currentLocation[index].lon}));
        }
    };

    return (
        <View style={styles.container}>
            <Text>Текущий город: {weatherIsLoading ? '--/--' : currentWeather && currentWeather.name}</Text>
            {currentWeather && <Image
                style={styles.weatherIcon}
                source={{
                    uri: `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`,
                }}
            />}
            <Text>Температура: {weatherIsLoading ? '--/--' : currentWeather && currentWeather.main.temp}</Text>
            <Text>Погода: {weatherIsLoading ? '--/--' : currentWeather && currentWeather.weather[0].description}</Text>
            <Text>Ветер: {weatherIsLoading ? '--/--' : currentWeather && currentWeather.wind.speed}</Text>
            <Text>Давление: {weatherIsLoading ? '--/--' : currentWeather && currentWeather.main.pressure}</Text>
            <Text>Влажность: {weatherIsLoading ? '--/--' : currentWeather && currentWeather.main.humidity}</Text>
            <Autocomplete
                placement={'bottom end'}
                placeholder='Введите название населенного пункта'
                value={value}
                onSelect={onSelect}
                onChangeText={setValue}>
                {currentLocation ? currentLocation.map(renderOption) : <AutocompleteItem title={'Нет результатов'}/>}
            </Autocomplete>
            <Button onPress={getMyLocation}>My location</Button>
            <StatusBar style="auto"/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
    },
    weatherIcon: {
        width: 150,
        height: 150
    },
    autocompleteItem: {
        zIndex: 2,
    }
});
export default Weather;
