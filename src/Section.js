import Card from './Card';
import { Droppable } from 'react-beautiful-dnd';
import './App.css';

function Section ({index, data}) {
    return (  
        <div key={index} className={`column-${index}`}>
            <h3>{data.section}</h3>
            <Droppable droppableId={index}>
            {(provided, snapshot) => {
                return (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`droppable-col-${index}`}
                >
                    {data.items.map((el, idx) => <Card el={el} index={idx}/>)}
                    {provided.placeholder}
                </div>
                )
            }}
        </Droppable>
        </div>
);
}

export default Section ;