const initialState = {
    showListForm: false,
    showCardForm: {
        show: false,
        listType: ''
    },
    allLists: [],
    allCards: []
}


const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SHOWLISTFORM":
            return {
                ...state,
                showListForm: true
            }
        case "HIDELISTFORM":
            return {
                ...state,
                showListForm: false
            }
        case "SHOWCARDFORM":
            return {
                ...state,
                showCardForm: {
                    ...state.showCardForm,
                    show: true,
                    listType: action.payload
                }
            }
        case "HIDECARDFORM":
            return {
                ...state,
                showCardForm: {
                    ...state.showCardForm,
                    show: false
                }
            }
        case "ADDLIST": 
            return {
                ...state,
                allLists: [
                    ...state.allLists,
                    {
                        title: action.payload,
                        key: action.payload.trim().replace(/ /g,"-"),
                        createdOn: new Date().getTime() / 1000,
                        cardIds: []
                    }
                ]
            }
        case "ADDCARD":
            let newCardsList = [...state.allCards];
            newCardsList.push({
                id: action.payload.id,
                title: action.payload.title,
                description: action.payload.description,
                listType: action.payload.listType,
                createdOn: new Date().getTime() / 1000,
                isFav: false
            })
            return {
                ...state,
                allCards: [
                    ...newCardsList
                ],
            }

        case "DROPCARD":
            let updatedAllCards = [...state.allCards];
            const draggedCardIndex = updatedAllCards.findIndex(card => card.id === action.payload.id);
            updatedAllCards[draggedCardIndex].listType = action.payload.dropIntoType;
            return {
                ...state,
                allCards: [
                    ...updatedAllCards
                ]
            }
        case "DELETECARD":
            let index = state.allCards.findIndex(function(o){
                return o.id === action.payload;
            })
            let cards = [...state.allCards]
            cards.splice(index, 1);
            return {
                ...state,
                allCards: [
                    ...cards
                ]
            }
        case "DELETELIST":
            let listIndex = state.allLists.findIndex(function(o){
                return o.key === action.payload;
            })
            const lists = [...state.allLists]
            lists.splice(listIndex, 1);

            let resultCards = state.allCards.filter(card => card.listType !== action.payload)
            return {
                ...state,
                allLists: [
                    ...lists
                ],
                allCards: [
                    ...resultCards
                ]
            }
        case "ADDFAVORITE":
            let favCards = [...state.allCards];
            const favCardIndex = favCards.findIndex(card => card.id === action.payload);
            favCards[favCardIndex].isFav = !favCards[favCardIndex].isFav;
            return {
                ...state,
                allCards: [
                    ...favCards
                ]
            }
        default:
            return state
    }
}

export default appReducer;