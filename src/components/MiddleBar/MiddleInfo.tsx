import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";
import {CurrentWeatherI} from "../../services/WeatherService";

interface MiddleInfoI {
    currentWeather: CurrentWeatherI | undefined,
    weatherIsLoading: boolean,
}

const MiddleInfo: React.FC<MiddleInfoI> = ({currentWeather, weatherIsLoading}) => {
    return (
        <View style={styles.innerMiddleInfo}>
            <View style={styles.topInnerMiddleInfo}>
                <View style={styles.innerTopInnerMiddleInfo}>
                    {currentWeather && <Image
                        style={styles.weatherIcon}
                        source={{
                            uri: `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`,
                        }}
                    />}
                </View>
                <View style={styles.innerTopInnerMiddleInfo}>
                    <Text style={{color: "#fff", fontSize: 52}}>
                        {weatherIsLoading ? '--/--' : currentWeather && Math.round(currentWeather.main.temp)}
                    </Text>
                </View>
            </View>
            <View style={styles.bottomInnerMiddleInfo}>
                <Text style={{color: "#fff", fontSize: 18}}>
                    {weatherIsLoading ? '--/--' : currentWeather && currentWeather.weather[0].description}
                </Text>
            </View>
        </View>
    );
};

export default MiddleInfo;

const styles = StyleSheet.create({
    innerMiddleInfo: {
        aspectRatio: 1,
        width: "80%",
    },
    topInnerMiddleInfo: {
        flex: 2,
        flexDirection: "row",
        alignItems: "flex-end"
    },
    innerTopInnerMiddleInfo: {
        aspectRatio: 1,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    bottomInnerMiddleInfo: {
        flex: 1,
        alignItems: "center"
    },
    weatherIcon: {
        width: "100%",
        height: "100%",
    },
});
