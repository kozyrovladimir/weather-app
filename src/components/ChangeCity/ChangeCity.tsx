import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {Autocomplete, AutocompleteItem, Card, Modal} from "@ui-kitten/components";
import {locationAPI, LocationI} from "../../services/LocationServices";
import {useAppDispatch} from "../../hooks/redux";
import {useDebounce} from "../../hooks/useDebounce";
import {setLocation} from "../../store/reducers/location.slice";

const ChangeCity = () => {
    const dispatch = useAppDispatch();

    const [value, setValue] = useState<string>('');
    const [openModal, setOpenModal] = useState<boolean>(false);

    const debouncedValue = useDebounce(value);

    const {data: Locations} = locationAPI.useGetLocationQuery(debouncedValue);

    const toggleModal = () => {
        setOpenModal(prevState => !prevState);
    }

    const onSelect = (index: number) => {
        if (Locations) {
            setValue(Locations[index].name);
            dispatch(setLocation({lat: Locations[index].lat, lon: Locations[index].lon}));
        }
        toggleModal();
    };

    const renderOption = (item: LocationI) => (
        <AutocompleteItem
            key={item.lat}
            title={`${item.name} (${item.country})`}/>
    );

    return (
        <>
            <TouchableOpacity onPress={toggleModal}>
                <Text style={styles.subText}>
                    Сменить город
                </Text>
            </TouchableOpacity>
            <Modal
                style={styles.modal}
                visible={openModal}
                backdropStyle={styles.backdrop}
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
    backdrop: {
        backgroundColor: "#000",
        opacity: 0.5
    },
    modal: {
        width: '90%'
    }
});
