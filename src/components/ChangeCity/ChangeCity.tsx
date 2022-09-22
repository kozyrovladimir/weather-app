import React from 'react';
import {StyleSheet, Text} from "react-native";
import {Autocomplete, AutocompleteItem, Card, Modal} from "@ui-kitten/components";
import {LocationI} from "../../services/LocationServices";
import {useChangeCityModal} from "../../hooks/useChangeCityModal";

const ChangeCity = () => {
    const {setValue, value, openModal, toggleModal, Locations, onSelect} = useChangeCityModal();

    const renderOption = (item: LocationI) => (
        <AutocompleteItem
            key={item.lat}
            title={`${item.name} (${item.country})`}/>
    );

    return (
        <>
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
                        {Locations ? Locations.map(renderOption) :
                            <AutocompleteItem title={'Нет результатов'}/>}
                    </Autocomplete>
                </Card>
            </Modal>
        </>
    );
};

export default ChangeCity;

const styles = StyleSheet.create({
    subText: {
        color: "#fff",
        opacity: 0.6,
        fontSize: 14
    },
});
