import { faFloppyDisk, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react"
import { Link } from "react-router-dom";

export default function ContactItem({ contact }) {
  const [newData, setNewData] = useState({ name: contact.name, phone: contact.phone })
  const [isEdit, setIsEdit] = useState(false)


  function ButtonSave() {
    // return (
    //   // <button className="btn-edit" onClick={() => { update(user.id, { name: newData.name, phone: newData.phone }); setIsEdit(false) }}>
    //   //   <FontAwesomeIcon icon={faFloppyDisk} />
    //   // </button>
    // )
  }

  function Delete(contact) {
    
  }

  if (isEdit) {
    return (
      <div className="container-data">
        <div className="container-image">
          <img src={contact.avatar == null ? `/Defaultavatar.png` : `../images/${contact.avatar}`} alt='not source' className="avatar" />
        </div>
        <div className="list" >
          <input className="input" type="text" id="nameEdit" value={newData.name} onChange={(e) => setNewData({ ...newData, name: e.target.value })} />
          <input className="input" type="text" id="phoneEdit" value={newData.phone} onChange={(e) => setNewData({ ...newData, phone: e.target.value })} />
          <div className="button">
            <ButtonSave />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container-data" key={contact.name}>
        <div className="container-image">
          <Link to={`/avatar/${contact.id}`} >
            <img src={`http://localhost:3001/images/${contact.avatar ? contact.avatar : 'Defaultavatar.png'
              }`} alt='not source' className="avatar" />
          </Link>
        </div>
        <div className="list">
          <p>{contact.name}</p>
          <p>{contact.phone}</p>
          <div className="button">
            <button className="btn-edit" onClick={() => setIsEdit(!isEdit)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>&nbsp;
            <button className="btn-delete" onClick={() => Delete(contact)} >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
      </div>
    )
  }
}
