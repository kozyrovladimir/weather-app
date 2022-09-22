import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {CurrentWeatherI} from "../../services/WeatherService";

interface BottomInfoI {
    currentWeather: CurrentWeatherI | undefined,
    weatherIsLoading: boolean,
}

const BottomInfo: React.FC<BottomInfoI> = ({currentWeather, weatherIsLoading}) => {
    return (
        <View style={styles.bottomBarWrapper}>
            <View style={styles.innerBottomInfo}>
                <View style={styles.innerInnerBottomInfo}>
                    <Text style={styles.subText}>
                        Ветер
                    </Text>
                    <Text style={styles.infoText}>
                        {weatherIsLoading ? '--/--' : currentWeather && `${Math.round(currentWeather.wind.speed)} м/с`}
                    </Text>
                </View>
                <View style={styles.innerInnerBottomInfo}>
                    <Text style={styles.subText}>
                        Давление
                    </Text>
                    <Text style={styles.infoText}>
                        {weatherIsLoading ? '--/--' : currentWeather && `${currentWeather.main.pressure} мм рт. ст.`}
                    </Text>
                </View>
            </View>
            <View style={styles.innerBottomInfo}>
                <View style={styles.innerInnerBottomInfo}>
                    <Text style={styles.subText}>
                        Влажность
                    </Text>
                    <Text style={styles.infoText}>
                        {weatherIsLoading ? '--/--' : currentWeather && `${currentWeather.main.humidity} %`}
                    </Text>
                </View>
                <View style={styles.innerInnerBottomInfo}>
                    <Text style={styles.subText}>
                        Вероятность дождя
                    </Text>
                    <Text style={styles.infoText}>
                        {weatherIsLoading ? '--/--' : currentWeather && `${currentWeather.clouds.all} %`}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default BottomInfo;

const styles = StyleSheet.create({
    bottomBarWrapper: {
        width: "100%",
        height: "100%",
    },
    innerBottomInfo: {
        flex: 1,
        flexDirection: "row",
    },
    innerInnerBottomInfo: {
        flex: 1,
        justifyContent: "flex-end"
    },
    subText: {
        color: "#fff",
        opacity: 0.6,
        fontSize: 14
    },
    infoText: {
        color: "#fff",
        fontSize: 18
    }
});
