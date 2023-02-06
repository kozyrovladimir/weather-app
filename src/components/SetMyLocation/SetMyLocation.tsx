import React, {useEffect} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity} from "react-native";
import {useAppDispatch} from "../../hooks/redux";
import * as Location from "expo-location";
import {setLocation} from "../../store/reducers/location.slice";

const SetMyLocation = () => {
    const dispatch = useAppDispatch();

    const setMyLocation = async () => {
        try {
            await Location.requestForegroundPermissionsAsync();
            const {coords} = await Location.getCurrentPositionAsync();
            if (coords) {
                dispatch(setLocation({lat: coords.latitude, lon: coords.longitude}));
            } else {
                throw new Error('Не могу получить доступ локации.');
            }
        } catch (error) {
            Alert.alert(error.name, error.message);
        }
    }

    useEffect(() => {
        setMyLocation();
    }, []);

    return (
        <TouchableOpacity onPress={setMyLocation}>
            <Text style={styles.text}>
                ➣ Mоё местоположение
            </Text>
        </TouchableOpacity>
    );
};

export default SetMyLocation;

const styles = StyleSheet.create({
    text: {
        color: "#fff",
        opacity: 0.6,
        fontSize: 14
    },
});