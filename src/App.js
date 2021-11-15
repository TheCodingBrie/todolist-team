import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import checked from "./images/checked.png"
import cancel from "./images/cancel.png"
import cog from "./images/cog.png"
import redo from "./images/redo.png"
import urgent from "./images/urgent.png"
import trash from "./images/trash.png"

function App() {
  return (
    <div className="App">
      <div>
        <label>Add Todo</label>
        <input type="text" placeholder="Task"></input>
        <input type="text" placeholder="Categorie"></input>
        <label for="selector">
          <select id="selector">
            <option selected>Green</option>
            <option>Yellow</option>
            <option>Red</option>
          </select>
        </label>
        <input type="date"></input>
        <button>Add</button>
      </div>

      <hr />

      {/* Dynamic tabs*/}
      <Tabs>
        <TabList>
          <Tab>Categorie 1 <button><img width="15px" src={cancel} alt=""/></button></Tab>
          <Tab>Categorie 2 <button><img width="15px" src={cancel} alt=""/></button></Tab>
        </TabList>

        <TabPanel>
          <div className="taskcard">
            <img className="reminder" src={urgent} alt=""/>
            <h2>Make bed</h2>
            <button><img width="15px" src={checked} alt=""/></button>
            <button>
                <img width="15px" src={cog} alt=""/>
            </button>
            <button>
              <img width="15px" src={cancel} alt=""/>
            </button>
            <progress className="" value="66" max="100"></progress>
          </div>
          <div className="taskcard">
            <img className="reminder" src={urgent} alt=""/>
            <h2>Bake cake</h2>
            <button>
                <img width="15px" src={checked} alt=""/>
            </button>
            <button>
                <img width="15px" src={cog} alt=""/>
            </button>
            <button>
              <img width="15px" src={cancel} alt=""/>
            </button>
            <progress className="" value="0" max="100"></progress>
          </div>
          <div className="taskcard">
            <img className="reminder" src={urgent} alt=""/>
            <h2>Do dishes</h2>
            <button>
                <img width="15px" src={checked} alt=""/>
            </button>
            <button>
                <img width="15px" src={cog} alt=""/>
            </button>
            <button>
              <img width="15px" src={cancel} alt=""/>
            </button>
            <progress className="" value="33" max="100"></progress>
            <div className="subTask">
              <input type="checkbox"></input>
              <h3>Put water</h3>
              <button>
                <img width="15px" src={cancel} alt=""/>
              </button>
            </div>
            <div className="subTask">
              <input type="checkbox"></input>
              <h3>Put soap</h3>
              <button>
                <img width="15px" src={cancel} alt=""/>
              </button>
            </div>
            <div className="subTask">
              <input type="checkbox"></input>
              <h3>Scrub dishes</h3>
              <button>
                <img width="15px" src={cancel} alt=""/>
              </button>
            </div>
          </div>

          <hr/>

          <div className="completedTask">
            <div className="taskcard">
              <img className="reminder done" src={urgent} alt=""/>
              <h2>Brush Teeth</h2>
              <button className="done">
                <img width="15px" src={checked} alt=""/>
              </button>
              <button className="done">
                <img width="15px" src={cog} alt=""/>
              </button>
              <button className="done">
                <img width="15px" src={cancel} alt=""/>
              </button>
              <progress className="done" value="32" max="100"> 32% </progress>
              <button className="complete">
                <img width="15px" src={redo} alt=""/>
              </button>
              <button className="complete">
                <img width="15px" src={trash} alt=""/>
              </button>
              
            </div>
          </div>
                    
        </TabPanel>
        <TabPanel>
          <h2>Make dishes</h2>
          <br />
          <h2>Bake bed</h2>
          <br />
          <h2>Do cake</h2>
        </TabPanel>
      </Tabs>

    </div>

  );
}

export default App;
