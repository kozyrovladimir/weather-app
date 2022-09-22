import {useState} from "react";
import {setLocation} from "../store/reducers/location.slice";
import {locationAPI} from "../services/LocationServices";
import {useDebounce} from "./useDebounce";
import {useAppDispatch} from "./redux";

export const useChangeCityModal = () => {
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

    return {value, setValue, openModal, toggleModal, Locations, onSelect};
}
