import React from 'react';
import {Image, StyleSheet, Text, View} from "react-native";

interface MiddleInfoI {
    iconUri: string | null,
    temp: string,
    weatherDescription: string,
}

const MiddleInfo: React.FC<MiddleInfoI> = ({iconUri, temp, weatherDescription}) => {
    return (
        <View style={styles.innerMiddleInfo}>
            <View style={styles.topInnerMiddleInfo}>
                <View style={styles.innerTopInnerMiddleInfo}>
                    {iconUri && <Image
                        style={styles.weatherIcon}
                        source={{
                            uri: iconUri
                        }}
                    />}
                </View>
                <View style={styles.innerTopInnerMiddleInfo}>
                    <Text style={styles.tempText}>
                        {temp}
                    </Text>
                </View>
            </View>
            <View style={styles.bottomInnerMiddleInfo}>
                <Text style={styles.weatherDescriptionText}>
                    {weatherDescription.toUpperCase()}
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
    tempText: {
        color: "#fff",
        fontSize: 46
    },
    weatherDescriptionText: {
        color: "#fff",
        fontSize: 18,
    }
});
