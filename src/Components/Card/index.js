import {useDispatch} from "react-redux";
import { Draggable } from "react-beautiful-dnd";

import "./Card.scss";

const Card = ({card, index}) => {
    const dispatch = useDispatch();

    const deleteCard = () => {
        dispatch({type: "DELETECARD", payload: card.id})
    }
    const addFavorite = () => {
        dispatch({type: "ADDFAVORITE", payload: card.id})
    }
    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided) => <div className="cardContainer" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <p className="title">{card.title}</p>
                <p className="description">{card.description}</p>
                <div className="cardActivity">
                    <span className={`favorite ${card.isFav && "favCard"}`} onClick={addFavorite} title={card.isFav ? "Marked as Favorite" : "Mark as Favorite"}></span>
                    <span onClick={deleteCard} className="deleteCard" title="Delete Task"></span>
                </div>
                
            </div>}
        </Draggable>
    )
}

export default Card;