import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Alert} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import {useAppDispatch} from "../hooks/redux";
import * as Location from "expo-location";
import {setLocation} from "../store/reducers/location.slice";
import BottomInfo from "../components/BottomBar/BottomInfo";
import MiddleInfo from "../components/MiddleBar/MiddleInfo";
import ChangeCity from "../components/ChangeCity/ChangeCity";
import {useWeather} from "../hooks/useWeather";
import SwitchConversion from "../components/switchConversion/switchConversion";

const MainScreen = () => {
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

    const {windSpeed, pressure, humidity, chanceOfRain, iconUri, temp, weatherDescription, cityName} = useWeather();
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.topInfo}>
                    <View style={styles.leftTopInfoWrapper}>
                        <View style={styles.leftTopInfo}>
                            <Text style={styles.cityText}>
                                {cityName}
                            </Text>
                            <ChangeCity/>
                        </View>
                    </View>
                    <View style={styles.rightTopInfo}>
                        <View style={{
                            width: "100%",
                            height: "100%",
                            justifyContent: "space-between",
                            alignItems: "flex-end"
                        }}>
                            <SwitchConversion/>
                            <Text onPress={setMyLocation} style={styles.subText}>
                                ➣ Mоё местоположение
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.middleInfo}>
                    <MiddleInfo
                        temp={temp}
                        iconUri={iconUri}
                        weatherDescription={weatherDescription}
                    />
                </View>
                <View style={styles.bottomInfo}>
                    <BottomInfo
                        pressure={pressure}
                        chanceOfRain={chanceOfRain}
                        humidity={humidity}
                        windSpeed={windSpeed}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default MainScreen;

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#678cbb',
        flex: 1,
    },
    container: {
        padding: 20,
        flex: 1,
    },
    weatherIcon: {
        width: "100%",
        height: "100%",
    },
    topInfo: {
        flexDirection: "row",
        flex: 1,
    },
    middleInfo: {
        flex: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    bottomInfo: {
        flex: 2,
    },
    leftTopInfoWrapper: {
        justifyContent: "space-between",
        flex: 2,
    },
    leftTopInfo: {
        width: "100%",
        height: "100%",
        justifyContent: "space-between"
    },
    rightTopInfo: {
        justifyContent: "space-between",
        flex: 3,
    },
    subText: {
        color: "#fff",
        opacity: 0.6,
        fontSize: 14
    },
    infoText: {
        color: "#fff",
        fontSize: 18
    },
    cityText: {
        color: "#fff",
        fontSize: 30
    }
});
