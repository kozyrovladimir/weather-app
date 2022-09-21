import React, {useState} from 'react';
import { Autocomplete, AutocompleteItem } from '@ui-kitten/components';
import {StyleSheet, Text, TextInput, View, Image} from "react-native";
import {StatusBar} from "expo-status-bar";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useDebounce} from "../../hooks/useDebounce";
import {locationAPI} from "../../services/LocationServices";
import {weatherAPI} from "../../services/WeatherService";

const Weather = () => {
    const {lat, lon} = useAppSelector(state => state.locationReducer);
    const dispatch = useAppDispatch();

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

    //ui kitten
    // const movies = [
    //     { title: 'Star Wars' },
    //     { title: 'Back to the Future' },
    //     { title: 'The Matrix' },
    //     { title: 'Inception' },
    //     { title: 'Interstellar' },
    // ];
    //
    // const filter = (item: { title: any; }, query: string) => item.title.toLowerCase().includes(query.toLowerCase());
    //
    // export const AutocompleteSimpleUsageShowcase = () => {
    //
    //     const [value, setValue] = React.useState(null);
    //     const [data, setData] = React.useState(movies);
    //
    //     const onSelect = (index: number) => {
    //         setValue(movies[index].title);
    //     };
    //
    //     const onChangeText = (query) => {
    //         setValue(query);
    //         setData(movies.filter(item => filter(item, query)));
    //     };

    // const renderOption = (item, index) => (
    //     <AutocompleteItem
    //         key={index}
    //         title={item.title}
    //     />
    // );

    return (
        <View style={styles.container}>
            <Text>Текущий город: {weatherIsLoading ? '--/--' : currentWeather && currentWeather.name}</Text>
            {/*<Autocomplete*/}
            {/*    placeholder='Введите название населенного пункта'*/}
            {/*    value={value}*/}
            {/*    onSelect={onSelect}*/}
            {/*    onChangeText={setValue}>*/}
            {/*    {data.map(renderOption)}*/}
            {/*</Autocomplete>*/}
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
            <StatusBar style="auto"/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
    },
    weatherIcon: {
        width: 150,
        height: 150
    }
});
export default Weather;
