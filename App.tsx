import {setupStore} from "./src/store/store";
import {Provider} from "react-redux";
import Weather from "./src/components/Weather/Weather";
import {ApplicationProvider} from "@ui-kitten/components";
import * as eva from '@eva-design/eva';
import MainScreen from "./src/screens/MainScreen";

export default function App() {
    const store = setupStore();

    return (
        <ApplicationProvider {...eva} theme={eva.light}>
        <Provider store={store}>
            <MainScreen/>
        </Provider>
        </ApplicationProvider>
    );
}
