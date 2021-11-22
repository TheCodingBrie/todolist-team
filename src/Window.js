import React, { useContext } from 'react'
import Modal from 'react-modal'
import './App.js'
import { StateContext, CategorieContext, DeadlineContext, IDContext, ImportanceContext, TitleContext, UserContext } from './Context.js';
import './Window.css'
import { FaRegEdit, FaThumbtack } from "react-icons/fa";

export default function Window({ show, onClose, temp, handleChange, handleUpdate, handleKeyUp }) {
    /*const stateContext = useContext(StateContext);
    const idContext = useContext(IDContext);
    const titleContext = useContext(TitleContext);
    const categorieContext = useContext(CategorieContext);
    const importanceContext = useContext(ImportanceContext);
    const deadlineContext = useContext(DeadlineContext);
    const userContext = useContext(UserContext);*/

    const onClick = () => {
        onClose() 
        handleUpdate()
      }

    const onKeyUp= (e) => {
        console.log(e)
        if (e.keyCode === 13) {
            onClose() 
            handleKeyUp(e)
        }
        
    }

    return (
        <Modal
            isOpen={show}
            onRequestClose={onClose}
            className={"Modal"}
            overlayClassName={"Overlay"}
            parentSelector={() => document.querySelector('#App')}
        >

            <div className="headcontainermodal">

                <div className="modaltitle">
                    <FaThumbtack icon="fa-solid fa-thumbtack" className="modalicon" />
                    <h1 className="modaltitle" style={{ flex: "1 90%" }}>{temp.title}</h1>
                </div>

                <div className="close-btn-ctn">
                    <button className="close-btn" onClick={onClose}>X</button>
                </div>
            </div>


            <div className="modalcontainer">
                <div className="modal-content">
                    <form onKeyUp={onKeyUp}>
                        <div className="form-row">
                            <div className="form-col-25">
                                <label>Task</label>
                            </div>
                            <div className="form-col-75">
                                <div className="form-container-icon">
                                    <input type="text" value={temp.title} required id="title" name="title" onChange={(el) => handleChange(el)} />
                                    <FaRegEdit className="formedittask" />
                                </div>
                            </div>
                        </div>
                        <div className="formrow">
                            <div className="form-col-25">
                                <label>Categorie</label>
                            </div>
                            <div className="form-col-75">
                                <div className="form-container-icon">
                                    <input type="text" value={temp?.categorie} id="categorie" onChange={(el) => handleChange(el)} name="categorie" />
                                    <FaRegEdit className="formeditcategorie" />
                                </div>
                            </div>
                        </div>
                        <div className="formrow">
                            <div className="form-col-25">
                                <label>Priority</label>
                            </div>
                            <div className="form-col-75">
                                <select id="importance" name="importance" selected value={temp?.importance} onChange={(el) => handleChange(el)} >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-col-25">
                                <label for="country">Deadline</label>
                            </div>
                            <div className="form-col-75">
                                <input type="date" value={temp?.deadline} id="deadline" name="deadline" onChange={(el) => handleChange(el)} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-col-25">
                                <label>User</label>
                            </div>
                            <div className="form-col-75">
                                <input type="text" value={temp?.user} id="user" name="user" onChange={(el) => handleChange(el)} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="modalupdate-btn">
                <button type="submit" className="update-btn" onClick={onClick} >Update</button>
            </div>
        </Modal >
    )
}
