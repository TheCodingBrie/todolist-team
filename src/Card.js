import { Draggable } from 'react-beautiful-dnd';
import portrait from "./images/doggo.png"

// el.user.portrait

function Card({ el, index }) {
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
                <span>{el.deadline}th November</span>
              </div>
              
              <p>{el.title}</p>
              
              <div className='cardBottom'>
                <div className="categorie">
                  <h4>{el.categorie}</h4>
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