import { faFloppyDisk, faRotateLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { useDispatch } from "react-redux"
import { UpdateAvatar } from "../actions/contact"

export default function Avatar() {
    const { id } = useParams()
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const [avatar, setAvatar] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/phonebooks/${id}`);
                const avatar = response.data.avatar;
                setAvatar(avatar);
            } catch (error) {
                console.error("Error fetching item data:", error);
            }
        };
        fetchData();
    }, [id]);

    const submitAvatar = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('avatar', avatar)
        dispatch(UpdateAvatar(id, formData))
        navigate('/')
    }

    return (
        <div className="body">
            <div className="container-edit">
                <div className="h1-wrapper">
                    <h1>Change Avatar</h1>
                </div>
                <form onSubmit={submitAvatar} className="form-edit" >
                    <div className="img-avatar">
                        <label htmlFor="avatar" className="avatar-label">Avatar</label>
                        <input type="file" name="avatar" className="form-control" id="avatar" placeholder="Choose File" onChange={(event) => {
                            setAvatar(event.target.files[0]);
                        }} />
                    </div>
                    <div className="container-preview">
                        <label htmlFor="preview" className="preview">Preview</label>
                        <div className="input-avatar">
                            <img src={avatar == null ? `../Defaultavatar.png` : `../images/${avatar}`} alt="only see avatar if it has been upload" className="img-thumbnail" />
                        </div>
                    </div>

                    <div className="save-cancel-edit">
                        <div className="button-save">
                            <button type="submit" className="btn button-submit"><FontAwesomeIcon icon={faFloppyDisk} /></button>
                        </div>
                        <div>
                            <a href="/" className="btn button-cancel"><FontAwesomeIcon icon={faRotateLeft} /></a>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}