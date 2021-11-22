import bin from "./images/trash.png"
import { Droppable } from 'react-beautiful-dnd';
import './Trash.css';

function trash({index, state}) {
    return ( 
                <Droppable droppableId={index}>
                    {(provided, snapshot) => {
                        return (
                            <div className="trash"
                            ref={provided.innerRef}
                            >
                            <div className="bin-container">
                                <img src={bin} className="bin" alt="Trash bin"/>
                            </div>
                        </div>
                        )
                    }}
                </Droppable>
     );
} 

export default trash;