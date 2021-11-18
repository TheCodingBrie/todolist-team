export default function Header({
  handleKeyDown,
  title,
  categorie,
  setCategorie,
  deadline,
  setDeadline,
  addItem, 
  setTitle
}) {
  return (
    <div className="header">
      <div className="additems" onKeyDown={handleKeyDown}>
        {/* <Todolist todos={todos} /> */}
        <span>Task: </span>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <span>Categorie: </span>
        <input type="text" value={categorie} onChange={(e) => setCategorie(e.target.value)} />
        <label for="importance">Task importance: </label>
        <select id="importance" name="importance">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <span>Due for: </span>
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        <label for="user">User: </label>
        <select id="user" name="user">
            <option value="user1"></option>
            <option value="user2"></option>
            <option value="user3"></option>
        </select>
        <button onClick={addItem}>Add</button>
      </div>
    </div>
  )
}