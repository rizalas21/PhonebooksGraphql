import { faArrowDownZA, faArrowUpAZ, faMagnifyingGlass, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from 'react-router-dom'


function BtnAsc({ filter, setFilter }) {
  return (
    <button className="btn-icon" onClick={() => {
      setFilter({ ...filter, sort: 'desc' })
    }}>
      <FontAwesomeIcon icon={faArrowUpAZ} id="center" />
    </button>
  )
}

function BtnDesc({ filter, setFilter }) {
  return (
    <button className="btn-icon" onClick={() => {
      setFilter({ ...filter, sort: 'asc' })
    }}>
      <FontAwesomeIcon icon={faArrowDownZA} id="center" />
    </button>
  )
}

export default function ContactBar({ filter, setFilter }) {

  const handleSearchChange = (event) => {
    const { value } = event.target
    setFilter({ ...filter, keyword: value })
  }
  return (
    <div className="all">
      <div className="container-search">
        <div className="icon">
          {filter.sort === 'asc' ? <BtnAsc filter={filter} setFilter={setFilter} /> : <BtnDesc filter={filter} setFilter={setFilter} />}
        </div>
        <div className="input-container">
          <button className="button-search">
            <FontAwesomeIcon icon={faMagnifyingGlass} id="input-icon" />
          </button>
          <input type="text" value={filter.keyword} onInput={handleSearchChange} aria-describedby="basic-addon1" id="input-field" />
        </div>
        <div className="icon">
          <Link to={"/add"}>
            <button className="btn-icon">
              <FontAwesomeIcon icon={faUserPlus} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}