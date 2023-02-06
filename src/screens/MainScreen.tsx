import React from 'react';
import {View, StyleSheet} from "react-native";
import BottomInfo from "../components/BottomBar/BottomInfo";
import MiddleInfo from "../components/MiddleBar/MiddleInfo";
import ChangeCity from "../components/ChangeCity/ChangeCity";
import {useWeather} from "../hooks/useWeather";
import SwitchConversion from "../components/switchConversion/switchConversion";
import CityName from "../components/CityName/CityName";
import SetMyLocation from "../components/SetMyLocation/SetMyLocation";
import ScreenWrapper from "../components/ScreenWrapper/ScreenWrapper";

const MainScreen = () => {
    const {windSpeed, pressure, humidity, chanceOfRain, iconUri, temp, weatherDescription, cityName} = useWeather();
    return (
        <ScreenWrapper>
            <View style={styles.topInfo}>
                <View style={styles.leftTopInfo}>
                    <CityName>
                        {cityName}
                    </CityName>
                    <ChangeCity/>
                </View>
                <View style={styles.rightTopInfo}>
                    <SwitchConversion/>
                    <SetMyLocation/>
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
        </ScreenWrapper>
    );
};

export default MainScreen;

const styles = StyleSheet.create({
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
    leftTopInfo: {
        justifyContent: "space-between",
        flex: 2,
    },
    rightTopInfo: {
        justifyContent: "space-between",
        flex: 3,
        alignItems: "flex-end"
    },
});
