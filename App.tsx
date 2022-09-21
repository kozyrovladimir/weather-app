import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useAppDispatch, useAppSelector} from "./src/hooks/redux";
import {useState} from "react";
import {useDebounce} from "./src/hooks/useDebounce";
import {locationAPI} from "./src/services/LocationServices";
import {weatherAPI} from "./src/services/WeatherService";
import {setupStore} from "./src/store/store";
import {Provider} from "react-redux";
import Weather from "./src/components/Weather/Weather";

export default function App() {
    const store = setupStore();

    return (
        <Provider store={store}>
          <Weather/>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
