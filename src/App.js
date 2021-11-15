import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import './App.css';
import _ from 'lodash';
import { v4 } from 'uuid';

const item = {
  id: v4(),
  name: "Clean the house"
  category: 
  importance:
  deadline:
  user:
}

const item2 = {
  id: v4(),
  name: "Wash dishes"
}

const item3 = {
  id: v4(),
  name: "Grocery Shopping"
}

function App() {
  /*to add a new task*/
  const [text, setText] = useState("")

  /*setting up the data structure*/
  const [state, setstate] = useState({
    "todo": {
      title: "Todo",
      items: [item]
    },
    "in-progress": {
      title: "In Progress",
      items: [item2]
    },
    "done": {
      title: "Completed",
      items: [item3]
    }
  })
  /*after dragging, we want to have the item on the dragged-to state and not staying in the old one*/
  /*data comes from the react dnd - like destination & source*/
  const handleDragEnd = ({ destination, source }) => {
    /*no destination -> not dropped in droppable -> moved outside the actual droppable, but didn't move it to an droppable, so it moves back to the actual one*/
    if (!destination) {
      return
    }
    /*dropped in same place, then do nothing -> didn't  move it outside the actual droppable*/
    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }
    /*to actually move it from the source to the destination, we create a copy of the items first*/
    /*source.droppableID takes the id, eg "Todo", "in-progress"..*/
    /*items is taking the items inside this id's. Inside the items are indexes, eg item1 and item2 are index 0 and 1*/
    /*creating a copy of item before removing it from the state*/
    const itemCopy = { ...state[source.droppableId].items[source.index] }
    /*then remove it from the actual location*/
    setstate(prev => {
      /*creating a copy of the previous state*/
      prev = { ...prev }
      /*going into the items - inside the items, we're moving a set of items from source.index, but removing just 1 item*/
      prev[source.droppableId].items.splice(source.index, 1)
      /*instead of just deleting it, we wanna move it to the new state*/
      /*use the destination and put the copied item there - that could be the same destination with reodering items or a new destination*/
      /*we're using the data structure with droppableID's to exactly tell where to move the items - droppableID="todo"usw.*/
      /*splice works in two ways: either just deleting items or deleting them and add items to replace what we deleted*/
      /*function: from our copied stat "prev", we're going into the droppableId (eg "done"), we'Re going further into the items of eg"done" and splice from the destination index (e.g. [0]) , removes nothing (0) and it adds an item*/
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)


      return prev
    })
  }


  const addItem = () => {
    setstate(prev => {
      return {
        /*copy the previous state*/
        ...prev,
        /*set todo equal to the data structure that we're using*/
        todo: {
          title: "Todo",
          items: [
            {
              id: v4(),
              name: text
            },
            /*copy previous items and add the new item to it*/
            ...prev.todo.items
          ]
        }
      }
    })
    /*clearing the entered text in the input field*/
    setText("")
  }

  return (
    /* mapping through the different dropables - in our case status of todo,inprogress,done*/
    /*data is data inside the states of "todo","in-progress","done"*/
    /*key is gonna be the "todo",.. itself*/
    /*inside droppable we have to put a funtion, that is calling the children (props)*/
    /*props are provided by us from Droppable by react--beautifuldnd - are essential for us to use dnd*/
    <div className="App">
      <div className="additems">
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={addItem}>Add</button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
          return (
            <div key={key} className={"column"}>
              <h3>{data.title}</h3>
              <Droppable droppableId={key}>
                {(provided, snapshot) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={"droppable-col"}
                    >
                      {data.items.map((el, index) => {
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
                                  {el.name}
                                </div>
                              )
                            }}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )
                }}
              </Droppable>
            </div>
          )
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
