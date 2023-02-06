import {setupStore} from "./src/store/store";
import {Provider} from "react-redux";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {ApplicationProvider} from "@ui-kitten/components";
import * as eva from '@eva-design/eva';
import MainScreen from "./src/screens/MainScreen";

export default function App() {
    const store = setupStore();

    return (
        <SafeAreaProvider>
            <ApplicationProvider {...eva} theme={eva.light}>
                <Provider store={store}>
                    <MainScreen/>
                </Provider>
            </ApplicationProvider>
        </SafeAreaProvider>
    );
}
