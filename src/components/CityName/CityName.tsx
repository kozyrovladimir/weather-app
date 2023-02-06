import React from 'react';
import {StyleSheet, Text} from "react-native";

type CtyNameProps = {
    children: string;
}
const CityName = (props: CtyNameProps) => {
    return (
        <Text style={styles.cityText}>
            {props.children}
        </Text>
    );
};

export default CityName;

const styles = StyleSheet.create({
    cityText: {
        color: "#fff",
        fontSize: 30
    }
});
