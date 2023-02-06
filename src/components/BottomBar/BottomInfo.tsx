import React from 'react';
import {StyleSheet, Text, View} from "react-native";

interface BottomInfoI {
    windSpeed: string,
    pressure: string,
    humidity: string,
    chanceOfRain: string,
}

const BottomInfo: React.FC<BottomInfoI> = ({windSpeed, pressure, humidity, chanceOfRain}) => {
    return (
        <View style={styles.bottomBarWrapper}>
            <View style={styles.innerBottomInfo}>
                <View style={styles.innerInnerBottomInfo}>
                    <Text style={styles.subText}>
                        Wind Speed
                    </Text>
                    <Text style={styles.infoText}>
                        {windSpeed}
                    </Text>
                </View>
                <View style={styles.innerInnerBottomInfo}>
                    <Text style={styles.subText}>
                        Pressure
                    </Text>
                    <Text style={styles.infoText}>
                        {pressure}
                    </Text>
                </View>
            </View>
            <View style={styles.innerBottomInfo}>
                <View style={styles.innerInnerBottomInfo}>
                    <Text style={styles.subText}>
                        Humidity
                    </Text>
                    <Text style={styles.infoText}>
                        {humidity}
                    </Text>
                </View>
                <View style={styles.innerInnerBottomInfo}>
                    <Text style={styles.subText}>
                        Chance of Rain
                    </Text>
                    <Text style={styles.infoText}>
                        {chanceOfRain}
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
        justifyContent: "flex-end",
    },
    subText: {
        color: "#fff",
        opacity: 0.6,
        fontSize: 14,
        textAlign: "center",
    },
    infoText: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
    }
});
