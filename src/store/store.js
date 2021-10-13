import { createStore } from "redux";
import reducers from "./reducers/index";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
    key: '@root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default () => {
    let store = createStore(persistedReducer)
    let persistor = persistStore(store)
    return { store, persistor }
}