import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css';
import _, { template } from 'lodash';
import { v4 } from 'uuid';
import Section from './Section.js';
import Trash from './Trash.js';
import Header from './Header.js'
import bin from './images/trash.png'

function App() {
  /*to add a new task*/
  const [title, setTitle] = useState("")
  const [category, setcategory] = useState("");
  const [tagColor, setTagColor] = useState("#ffffff");
  const [importance, setImportance] = useState("low");
  const [deadline, setDeadline] = useState("");
  const [user, setUser] = useState({
    id: v4(),
    username: "",
    portrait: ""
  });

  const [menuButton, setMenuButton] = useState(false);

  /*setting up the data structure: everytime state get called, it is showing the following informations. They are gonna be retured by mapping through the items function at the bottom. Set state is also called by moving an item or adding an item*/
  const [state, setState] = useState({
    "todo": {
      section: "Todo",
      items: []
    },
    "in-progress": {
      section: "In Progress",
      items: []
    },
    "done": {
      section: "Completed",
      items: []
    }
  })

  /*after dragging, we want to have the item on the dragged-to state and not staying in the old one*/
  /*data comes from the react dnd - like destination & source*/
  const handleDragEnd = ({ destination, source }) => {
    /*no destination -> not dropped in droppable -> moved outside the actual droppable, but didn't move it to an droppable, so it moves back to the actual one*/
    if (!destination) {
      return
    }

    if (destination.droppableId === "trash") {
      setState(prev => {
        
        prev = {...prev}

        prev[source.droppableId].items.splice(source.index, 1)

        return prev
      })

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
    setState(prev => {
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
    if (title === "") return
    setState(prev => {
      return {
        /*copy the previous state*/
        ...prev,
        /*set todo equal to the data structure that we're using*/
        todo: {
          section: "Todo",
          items: [
            {
              id: v4(),
              title: title,
              category: category,
              tagColor: tagColor,
              importance: importance,
              deadline: deadline,
              user: user
            },
            /*copy previous items and add the new item to it*/
            ...prev.todo.items
          ]
        }
      }
    })
    /*clearing the entered text in the input field*/
    setTitle("");
    setcategory("");
    
  }

  /*Local storage*/

  const LOCAL_STORAGE_KEY = 'todoApp.todos'

  /*loading the stored items*/
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setState(storedTodos)
  }, [])

  /*saving function*/
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))
  }, [state])


  /*add task by pressing key button*/
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      addItem();
    }};

  const handleExpand = () => {
    setMenuButton(true);
  }

  const handleCollapse = () => {
    setMenuButton(false);
  }

  function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }

  return (
    /* mapping through the different dropables - in our case status of todo,inprogress,done*/
    /*data is data inside the states of "todo","in-progress","done"*/
    /*key is gonna be the "todo",.. itself*/
    /*inside droppable we have to put a funtion, that is calling the children (props)*/
    /*props are provided by us from Droppable by react--beautifuldnd - are essential for us to use dnd*/

    <div className="App">
      <Header 
        title={title}
        category={category}
        setTitle={setTitle}
        setcategory={setcategory}
        deadline={deadline}
        setDeadline={setDeadline}
        addItem={addItem}
        setTagColor={setTagColor}
        setImportance={setImportance}
        menuButton={menuButton}
        handleKeyDown={handleKeyDown}
        handleCollapse={handleCollapse}
        handleExpand={handleExpand}
        hexToRGB={hexToRGB}
        setUser={setUser}
        tagColor={tagColor}
         />
      <img className="trash" src={bin} alt="" />
      <div className='sections'>
        <DragDropContext onDragEnd={handleDragEnd}>
          {_.map(state, (data, key) => {
            return (
              <Section index={key} data={data} />
            )
          })}
          <Trash index={"trash"} data={state} />
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;

