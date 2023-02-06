import React, {ReactNode} from 'react';
import {StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

type ScreenWrapperProps = {
  children: ReactNode
};
const ScreenWrapper = (props: ScreenWrapperProps) => {
    return (
        <SafeAreaView style={styles.screenWrapper}>
            {props.children}
        </SafeAreaView>
    );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
    screenWrapper: {
        backgroundColor: '#678cbb',
        flex: 1,
        padding: 20,
    }
});
