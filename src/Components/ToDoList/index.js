import {useSelector, useDispatch} from "react-redux";
import { Droppable } from "react-beautiful-dnd";

import "./ToDoList.scss";
import Card from "../Card";

const ToDoList = (props) => {
    let sortBy = useSelector(state => state.sortByType) || 'Time-Descending';
    console.log(sortBy)
    let cards = useSelector(state => state.allCards.filter((card) => card.listType === props.listDetails.key));
    switch(sortBy) {
        case "Title-Ascending":
            cards = cards.sort((a,b) => a.title.localeCompare(b.title));
            break;
        case "Title-Descending":
            cards = cards.sort((a,b) => b.title.localeCompare(a.title));
            break;
        case "Time-Ascending":
            cards = cards.sort((a,b) => a.createdOn - b.createdOn);
            break;
        case "Time-Descending" :
            cards = cards.sort((a,b) => b.createdOn - a.createdOn);
            break;
        default:
            cards = cards.sort((a,b) => b.createdOn - a.createdOn);
    }

    const dispatch = useDispatch();

    const showCardForm = () => {
        dispatch({type: "SHOWCARDFORM", payload: props.listDetails.key})
    }
    const deleteList = () => {
        dispatch({type: "DELETELIST", payload: props.listDetails.key})
    }
    return (
        
        <div className="list">
            <div className="list-heading">
                <p className="list-title">{props.listDetails.title} <span className="list-count" title={`${props.listDetails.title.toUpperCase()} Count`}>{cards.length}</span></p>
                <p className="list-delete" onClick={deleteList} title={`Delete ${props.listDetails.title.toUpperCase()}`}></p>
            </div>
            <Droppable droppableId={props.listDetails.key}>
                {(provided) => <div className={`listsContainer ${cards.length === 0 && "noCards"}`} ref={provided.innerRef} {...provided.droppableProps}>
                    {cards.length > 0 ? cards.map((card, index) => <Card key={card.id} card={card} index={index}/>) : <p>no cards</p>}
                    {provided.placeholder}
                </div>}
            </Droppable>
            
            <div onClick={showCardForm} className="add-card" title={`Add Task to ${props.listDetails.title.toUpperCase()}`}><span>+</span>Add Card</div>
        </div>
    )
}

export default ToDoList;