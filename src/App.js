import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css';
import _ from 'lodash';
import { v4 } from 'uuid';
import Section from "./Section.js";
import trash from "./images/trash.png"
import Window from './Window';
import ReactModal from 'react-modal';
import { StateContext, IDContext, TitleContext, CategorieContext, ImportanceContext, DeadlineContext, UserContext } from './Context';

// const item = {
//   id: v4(),
//   title: "Clean the house",
//   categorie: "Sport",
//   importance: "low",
//   deadline: date.getDate(),
//   user: {
//     name: "Jenny",
//     picture: {portrait}
//   }
// }

ReactModal.setAppElement('#root')

function App() {
  /*to add a new task*/
  const [title, setTitle] = useState("")
  const [categorie, setCategorie] = useState("");
  const [importance, setImportance] = useState("low");
  const [deadline, setDeadline] = useState(null);
  const [user, setUser] = useState([]);


  /*Modal*/
  const [show, setShow] = useState(false);

  const [temp, setTemp] = useState({});


  /*edit function Modal*/
  /*to see, if we're editing*/
  //const [isEditing, setIsEditing] = useState(false);
  /*to know, which item is edited*/
  //const [currentItem, setCurrentItem] = useState({});



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

  /*popupwindow*/
  const onOpen = () => setShow(true);

  const onClose = () => setShow(false);

  /*sending the elements of items up to the "parent" */
  const onCard = (el) => setTemp(el);


  /*const variableOne = state.item.filter(item => item.id === id);*/


  /*We funnel all changes through that one handler but then distinguish which input the change is coming from using the name*/
  /*const handleChange = (el) => {
      const value = el.target.value;
      setTemp({
        /*because we are using a single state object that contains multiple properties, we're spreading (...state) the existing state back into the new state value, merging it manually, when calling setState. */

  /*we're targeting each input field by their name and taking the value in it*/
  /*create a dynamic key name in the object. Because the form name props match the state property keys, the title input will set the title state and so on.*/
  // [el.target.name]: value
  //});
  //}


  /*updating values in modal*/
  const handleChange = (el) => {
    /*creating new const in order to change the values of temp*/
    const name = el.target.name
    const value = el.target.value
    setTemp({
      ...temp,
      [name]: value
    })
  }


  const handleUpdate = () => {
    const newTodos = state.todo.items.map((el) => {
      if (el.id === temp.id) return temp;
      return el
    })
    console.log(newTodos)
    const newInProgress = state['in-progress'].items.map((el) => {
      if (el.id === temp.id) return temp;
      return el
    })
    console.log(newInProgress)

    const newDone = state.done.items.map((el) => {
      if (el.id === temp.id) return temp;
      return el
    })
    console.log(newDone)

    return setState({
      'todo': {
        section: "Todo",
        items: newTodos
      },
      'in-progress': {
        section: 'In-Progress',
        items: newInProgress
      },
      'done': {
        section: 'Completed',
        items: newDone
      }
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
              categorie: categorie,
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
    setCategorie("");
  }

  /*Local storage*/

  const LOCAL_STORAGE_KEY = 'todoApp.todos'

  /*loading the stored items*/
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setState(storedTodos)
    console.log('load')
  }, [])

  /*saving function*/
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))
    console.log('save')
  }, [state]) 
  


  /*add task by pressing key button*/
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      addItem();
    }
  };


  /*update modal by pressing enter button with keyup*/
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleUpdate();
    }
  };
  /*
    const cardItems = todos.map((todo) => {
      ...todo,
      user: users.find(user => todo.user === user.id)
    })
  */



  return (
    /* mapping through the different dropables - in our case status of todo,inprogress,done*/
    /*data is data inside the states of "todo","in-progress","done"*/
    /*key is gonna be the "todo",.. itself*/
    /*inside droppable we have to put a funtion, that is calling the children (props)*/
    /*props are provided by us from Droppable by react--beautifuldnd - are essential for us to use dnd*/

    <div className="App" id="App">
      <div className="header">
        <div className="additems" onKeyDown={handleKeyDown}>
          {/* <Todolist todos={todos} /> */}
          <TitleContext.Provider value={title}>
            <span>Task: </span>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </TitleContext.Provider>
          <CategorieContext.Provider value={categorie}>
            <span>Categorie: </span>
            <input type="text" value={categorie} onChange={(e) => setCategorie(e.target.value)} />
          </CategorieContext.Provider>
          <ImportanceContext.Provider value={importance}>
            <label for="importance">Task importance: </label>
            <select id="importance" name="importance">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </ImportanceContext.Provider>
          <DeadlineContext.Provider value={deadline}>
            <span>Due for: </span>
            <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          </DeadlineContext.Provider>
          <UserContext.Provider value={user}>
            <label for="user">User: </label>
            <select id="user" name="user">
              <option value="user1"></option>
              <option value="user2"></option>
              <option value="user3"></option>
            </select>
          </UserContext.Provider>
          <button onClick={addItem}>Add</button>
        </div>
      </div>
      <img className="trash" src={trash} alt="" />
      <div className='sections'>
        <IDContext.Provider value={state}>
          <DragDropContext onDragEnd={handleDragEnd}>
            {_.map(state, (data, key) => {
              return (
                <Section onOpen={onOpen} index={key} onCard={onCard} data={data} />
              )
            })}
          </DragDropContext>
        </IDContext.Provider>
      </div>
      <Window
        handleChange={handleChange}
        temp={temp}
        onClose={onClose}
        show={show}
        handleUpdate={handleUpdate}
        handleKeyUp={handleKeyUp}
      />
    </div>
  );
}

export default App;

