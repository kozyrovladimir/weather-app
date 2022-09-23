import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useAppDispatch} from "../../hooks/redux";
import {setConvention} from "../../store/reducers/convention.slice";

const SwitchConversion = () => {
    const [conversion, setLocalConversion] = React.useState<'celsius' | 'fahrenheit'>('celsius');

    const dispatch = useAppDispatch();

    const setCelsius = () => {
        setLocalConversion("celsius");
        dispatch(setConvention({convention: "celsius"}));
    }

    const setFahrenheit = () => {
        setLocalConversion('fahrenheit');
        dispatch(setConvention({convention: "fahrenheit"}));
    }

    const celsiusButtonColor = conversion === 'celsius' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0)';
    const fahrenheitButtonColor = conversion === 'fahrenheit' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0)';

    return (
        <View style={styles.switchConversionWrapper}>
            <TouchableOpacity style={styles.touchable} onPress={setCelsius}>
                <View style={{
                    borderBottomLeftRadius: 8,
                    borderTopLeftRadius: 8,
                    flex: 1,
                    backgroundColor: `${celsiusButtonColor}`,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                >
                    <Text style={styles.switchText}>C</Text>
                </View>
            </TouchableOpacity >
            <TouchableOpacity style={styles.touchable} onPress={setFahrenheit}>
                <View style={{
                    backgroundColor: `${fahrenheitButtonColor}`,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={styles.switchText}>F</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default SwitchConversion;

const styles = StyleSheet.create({
    switchConversionWrapper: {
        flexDirection: 'row',
        borderRadius: 8,
        width: 80,
        height: 30,
        borderWidth: 1,
        borderColor: '#fff',
    },
    switchText: {
        color: '#fff',
        opacity: 0.6,
    },
    touchable: {
        flex: 1
    }
});
