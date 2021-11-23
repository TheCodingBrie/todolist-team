import logo from "./images/logo.png"
import expand from "./images/expand.png"
import collapse from "./images/collapse.png"
import add from "./images/plus.png"
import './Header.css';



export default function Header({
  handleKeyDown,
  title,
  category,
  setcategory,
  deadline,
  setDeadline,
  setUser,
  addItem, 
  setTitle,
  menuButton,
  handleExpand,
  setTagColor,
  hexToRGB,
  setImportance,
  handleCollapse,
  tagColor
}) {

  return (
    <header onKeyDown={handleKeyDown}>
        <img className="logo"  src={logo} alt=""/>
        <div className="base-form">
        <label for="todo">Task : 
          <input id="todo" className="text" required type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <div className="sub-base-form">
          <label for="user">User: 
            <select id="user" name="user" onChange={(e) => setUser(e.target.value)} >
                <option value="user1">username1</option>
                <option value="user2">username2</option>
                <option value="user3">username3</option>
            </select>
          </label>
          <button className="add-button" onClick={addItem}>
              <img width="25px" src={add} alt=""/>
          </button>
        </div>
        </div>
        <button className={`expand-button ${menuButton ? "hidden" : ""}`} onClick={handleExpand}>
          <img width="25px" src={expand} alt=""/>
        </button>
        <div className={menuButton ? "full-form" : "hidden-form"}>
            <label for="category">Category: 
              <input id="category" className="text" type="text" value={category} onChange={(e) => setcategory(e.target.value)} />
              <input className="color" placeholder="#fffff" type="color"onChange={(e) => setTagColor(hexToRGB(e.target.value))}/>
            </label>
          <div className="sub-full-form-bottom">
            <label for="importance">Priority: 
              <select id="importance" name="importance" onChange={(e) => setImportance(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            <label>Due for: 
              <input className="date" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </label>
          </div>
        </div>
        <div className={menuButton ? "userPannel" : "hidden-form"}>
          <label>New User: 
            <input className="text" type="text"></input>
          </label>
          <label>Delete User: 
            <select id="user" name="user" className="chooseuser" onChange={(e) => setUser(e.target.value)} >
              <option value="user1">username1</option>
              <option value="user2">username2</option>
              <option value="user3">username3</option>
            </select>
          </label>
        </div>
        <button className={`expand-button ${menuButton ? "" : "hidden"}`} onClick={handleCollapse}>
          <img width="25px" src={collapse} alt=""/>
        </button>
        
      </header>
  )
}