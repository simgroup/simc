import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider}from 'react-redux';
import {createStore, applyMiddleware,compose} from 'redux';
import rootReducer from './store/reducer/Index';
import * as serviceWorker from './serviceWorker';
import thunk from "redux-thunk";
import  Loader from "./components/loader/Loader"

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import { PersistGate } from 'redux-persist/integration/react'

import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1'

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel1,
    

  }

const persistedReducer = persistReducer(persistConfig, rootReducer)

const  store= createStore(persistedReducer,compose(applyMiddleware(thunk)))
const persistor = persistStore(store);


ReactDOM.render(
<Provider store={store}>
    <PersistGate loading={Loader} persistor={persistor}>
        <App />
    </PersistGate>
</Provider>
, document.getElementById('root'));

serviceWorker.unregister();
