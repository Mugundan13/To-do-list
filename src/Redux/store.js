import { createStore } from "redux"
import appReducer from "./Reducers"

const persistedState = localStorage.getItem('appState') ? JSON.parse(localStorage.getItem('appState'))  
    : {
        showListForm: false,
        showCardForm: {
            show: false,
            listType: ''
        },
        allLists: [],
        allCards: []
    }
const store = createStore(appReducer, persistedState);

store.subscribe(()=>{
    localStorage.setItem('appState', JSON.stringify(store.getState()))
})

export default store