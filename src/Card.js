import { Draggable } from 'react-beautiful-dnd';
import portrait from "./images/doggo.png"
import './Card.css';

// el.user.portrait

function Card({ el, index }) {
  console.log(el.id)
    return (
        <Draggable key={el.id} index={index} draggableId={el.id}>
        {(provided, snapshot) => {
          return (
            <div
              className={`item ${snapshot.isDragging && "dragging"}`}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div className="cardTop">
                <div className={el.importance}></div>
                <span>{el.deadline}</span>
              </div>
              
              <p className="task">{el.title}</p>
              
              <div className='cardBottom'>
                <div className={el.category ? "category" : ""}
                style={{
                  backgroundColor: `${el.tagColor}`
                }}>
                  <h4>{el.category}</h4>
                </div>
                <div className="portrait-container">
                  <img className="portrait" src={portrait} alt=""/>
                </div>
              </div>
            </div>
          )
        }}
      </Draggable>
    );
}

export default Card;