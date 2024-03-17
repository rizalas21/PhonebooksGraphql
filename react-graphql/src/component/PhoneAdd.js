import { Link, useNavigate } from 'react-router-dom'
import '../app.css'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { addPhonebooks } from '../actions/contact'


export default function PhoneAdd() {
    const [user, setUser] = useState({ name: '', phone: '' })
    let navigate = useNavigate()
    const dispatch = useDispatch()

    const AddData = (e) => {
        e.preventDefault()
        dispatch(addPhonebooks(user))
        navigate('/')
    }

    return (
        <form className="container" onSubmit={AddData}>
            <div className="container-add">
                <input type="text" className="input-add" placeholder='Input Name' required onChange={(e) => setUser({ ...user, name: e.target.value })} />
                <input type="text" className="input-add" placeholder='Input Phone' required onChange={(e) => setUser({ ...user, phone: e.target.value })} />
                <div className="btn-add">
                    <button className="btn-save" type='submit'>
                        <p className="p-add">save</p>
                    </button>
                    <button className="btn-save">
                        <Link to={"/"} style={{ textDecoration: 'none' }}>
                            <p className="p-add">cancel</p>
                        </Link>
                    </button>
                </div>
            </div>
        </form>
    )
}