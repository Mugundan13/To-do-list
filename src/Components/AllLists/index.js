import {useSelector} from "react-redux";
import {DragDropContext} from "react-beautiful-dnd";
import {useDispatch} from "react-redux";

import ToDOList from "../ToDoList";
import "./AllLists.scss"

const AllLists = (props) => {
    const dispatch = useDispatch()
    const lists = useSelector(state => state.allLists);

    const onDragEnd = result => {
        const {destination, source, draggableId} = result;

        if(!destination) {
            return;
        }
        if(destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }
        dispatch({type: "DROPCARD", payload: {id: draggableId, dropIntoType: destination.droppableId}})
    }

    return (
        <div className={`listsOuter ${lists.length === 0 && 'noLists'}`}>
            <DragDropContext
            onDragEnd={onDragEnd}
            >
                {lists.length > 0 ? lists.map((list, index) => <ToDOList key={index} listDetails={list}/>) : <p>No List Available</p>}
            </DragDropContext>
        </div>
    )
}

export default AllLists;