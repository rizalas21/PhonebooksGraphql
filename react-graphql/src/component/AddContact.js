import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ADD_PHONEBOOK, GET_PHONEBOOKS } from "../graphql/gql"
import { useMutation } from "@apollo/client"

export default function AddContact() {
  const navigate = useNavigate()
  const [user, setUser] = useState({ name: null, phone: null })
  const [createPhonebook, { data, loading, error }] = useMutation(ADD_PHONEBOOK, {
    refetchQueries: [{ query: GET_PHONEBOOKS }]
  })

  if (loading) return 'Submitting...';

  if (error) return `Submission error! ${error.message}`;

  if (data) navigate("/")

  function AddData(e) {
    e.preventDefault()
    createPhonebook({ variables: { input: user } })
  }

  return (
    <form className="container" onSubmit={AddData}>
      <div className="container-add">
        <input type="text" className="input-add" required placeholder="Input Name Here" onChange={(e) => setUser({ ...user, name: e.target.value })} />
        <input type="text" className="input-add" required placeholder="Input Phone Here" onChange={(e) => setUser({ ...user, phone: e.target.value })} />
        <div className="btn-add">
          <button className="btn-save" type='submit'>
            <p className="p-add">save</p>
          </button>
          <button className="btn-save" onClick={() => navigate("/")}>
            <p className="p-add">cancel</p>
          </button>
        </div>
      </div>
    </form>
  )
}
