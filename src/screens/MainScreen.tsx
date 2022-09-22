import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Alert, Image} from "react-native";
import {Autocomplete, AutocompleteItem, Button, Card, Modal} from '@ui-kitten/components';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import * as Location from "expo-location";
import {setLocation} from "../store/reducers/location.slice";
import {useDebounce} from "../hooks/useDebounce";
import {locationAPI, LocationI} from "../services/LocationServices";
import {weatherAPI} from "../services/WeatherService";
import BottomInfo from "../components/BottomBar/BottomInfo";
import MiddleInfo from "../components/MiddleBar/MiddleInfo";

const MainScreen = () => {
    const dispatch = useAppDispatch();
    const {lat, lon} = useAppSelector(state => state.locationReducer);

    //location
    const getMyLocation = async () => {
        try {
            await Location.requestForegroundPermissionsAsync();
            const {coords} = await Location.getCurrentPositionAsync();
            return coords;
        } catch (error) {
            Alert.alert(error.name, error.message);
        }
    }

    const getMyLocationHandler = () => {
        getMyLocation()
            .then(coords => {
                if (coords) {
                    dispatch(setLocation({lat: coords.latitude, lon: coords.longitude}));
                }
            })
            .catch((error) => {
                Alert.alert(error.name, error.message);
            })
    }

    useEffect(() => {
        getMyLocation()
            .then(coords => {
                if (coords) {
                    dispatch(setLocation({lat: coords.latitude, lon: coords.longitude}));
                }
            })
            .catch((error) => {
                Alert.alert(error.name, error.message);
            })
    }, []);

    //end location
    const [value, setValue] = useState<string>('');
    const debouncedValue = useDebounce(value);

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    }

    const {
        data: currentLocation,
        error: locationError,
        isLoading: locationIsLoading
    } = locationAPI.useGetLocationQuery(debouncedValue);
    const {data: currentWeather, error: weatherError, isLoading: weatherIsLoading} = weatherAPI.useGetWeatherQuery({
        lat,
        lon
    });

    // ui kitten
    const noResults = () => (
        <AutocompleteItem title={'Нет результатов'}/>
    )

    const renderOption = (item: LocationI, index: number) => (
        <AutocompleteItem
            key={lat}
            title={`${item.name} (${item.country})`}/>
    );

    //functionality for modal window
    const [openModal, setOpenModal] = useState<boolean>(false);
    const toggleModal = () => {
        setOpenModal(prevState => !prevState);
    }

    const onSelect = (index: number) => {
        if (currentLocation) {
            setValue(currentLocation[index].name);
            dispatch(setLocation({lat: currentLocation[index].lat, lon: currentLocation[index].lon}));
        }
        toggleModal();
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.topInfo}>
                    <View style={styles.leftTopInfo}>
                        <View style={{width: "100%", height: "100%", justifyContent: "space-between"}}>
                            <Text style={{color: "#fff", fontSize: 30}}>
                                {weatherIsLoading ? '--/--' : currentWeather && currentWeather.name}
                            </Text>
                            <Text onPress={toggleModal} style={styles.subText}>
                                Сменить город
                            </Text>
                            <Modal
                                style={{width: '90%'}}
                                visible={openModal}
                                backdropStyle={{backgroundColor: "#000", opacity: 0.3}}
                                onBackdropPress={toggleModal}>
                                <Card disabled={true}>
                                    <Autocomplete
                                        placeholder='Введите название населенного пункта'
                                        value={value}
                                        onSelect={onSelect}
                                        onChangeText={setValue}>
                                        {currentLocation ? currentLocation.map(renderOption) :
                                            <AutocompleteItem title={'Нет результатов'}/>}
                                    </Autocomplete>
                                </Card>
                            </Modal>
                        </View>
                    </View>
                    <View style={styles.rightTopInfo}>
                        <View style={{width: "100%", height: "100%", justifyContent: "space-between", alignItems: "flex-end"}}>
                            <View>

                            </View>
                            <Text onPress={getMyLocationHandler} style={styles.subText}>
                                🌎 Mоё местоположение
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.middleInfo}>
                    <MiddleInfo
                        weatherIsLoading={weatherIsLoading}
                        currentWeather={currentWeather}
                    />
                </View>
                <View style={styles.bottomInfo}>
                    <BottomInfo
                        currentWeather={currentWeather}
                        weatherIsLoading={weatherIsLoading}
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
    autocompleteItem: {
        zIndex: 2,
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
    bottomInfo: {
        flex: 2,
    },
    innerBottomInfo: {
        flex: 1,
        flexDirection: "row",
    },
    innerInnerBottomInfo: {
        flex: 1,
        justifyContent: "flex-end"
    },
    leftTopInfo: {
        justifyContent: "space-between",
        flex: 2,
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
    }
});
