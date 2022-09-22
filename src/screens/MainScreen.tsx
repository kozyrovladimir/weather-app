import React from 'react';
import {View, Text, StyleSheet} from "react-native";

const MainScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.topInfo}>
                <View style={styles.leftTopInfo}>
                </View><View style={styles.rightTopInfo}>
            </View>
            </View>
            <View style={styles.middleInfo}>
                <View style={styles.innerMiddleInfo}>
                    <View style={styles.topInnerMiddleInfo}>
                        <View style={styles.innerTopInnerMiddleInfo}>

                        </View>
                        <View style={styles.innerTopInnerMiddleInfo}>

                        </View>
                    </View>
                    <View style={styles.bottomInnerMiddleInfo}>

                    </View>
                </View>
            </View>
            <View style={styles.bottomInfo}>
                <View style={styles.innerBottomInfo}>
                    <View style={styles.innerInnerBottomInfo}>

                    </View>
                    <View style={styles.innerInnerBottomInfo}>

                    </View>
                </View>
                <View style={styles.innerBottomInfo}>
                    <View style={styles.innerInnerBottomInfo}>

                    </View>
                    <View style={styles.innerInnerBottomInfo}>

                    </View>
                </View>
            </View>
        </View>
    );
};

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#678cbb',
        marginTop: 50,
        padding: 10,
        flex: 1,
    },
    weatherIcon: {
        width: 150,
        height: 150
    },
    autocompleteItem: {
        zIndex: 2,
    },
    topInfo: {
        flexDirection: "row",
        flex: 1,
        borderWidth: 1,
    },
    middleInfo: {
        flex: 4,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    innerMiddleInfo: {
        borderWidth: 1,
        width: 200,
        height: 200,
    },
    topInnerMiddleInfo: {
        borderWidth: 1,
        flex: 2,
        flexDirection: 'row',
    },
    innerTopInnerMiddleInfo: {
        flex: 1,
        borderWidth: 1,
    },
    bottomInnerMiddleInfo: {
        borderWidth: 1,
        flex: 1,
    },
    bottomInfo: {
        flex: 2,
        borderWidth: 1,
    },
    innerBottomInfo: {
        borderWidth: 1,
        flex: 1,
        flexDirection: "row",
    },
    innerInnerBottomInfo: {
        borderWidth: 1,
        flex: 1,
    },
    leftTopInfo: {
        justifyContent: "space-between",
        flex: 2,
        borderWidth: 1,
    },
    rightTopInfo: {
        justifyContent: "space-between",
        flex: 3,
        borderWidth: 1,
    }
});
