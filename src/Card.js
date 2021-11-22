import { Draggable } from 'react-beautiful-dnd';
import portrait from "./images/doggo.png"
import Window from "./Window"
import React, { useContext, Fragment, useState} from "react";


// el.user.portrait


function Card({ el, index, onOpen, onCard, handleSubmit }) {
  console.log()

const onClick = (el) => {
  onCard(el) 
  onOpen()
}

  return (
    <Fragment>
        <Draggable key={el.id} index={index} draggableId={el.id}>
        {(provided, snapshot) => {
          return (
            <div
              onClick={() => onClick(el)}
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
      </Fragment> 
  );
}

export default Card;