import { faArrowDownZA, faArrowUpAZ, faMagnifyingGlass, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import '../app.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from 'react-router-dom'


function BtnAsc({ setSort }) {
    return (
        <button className="btn-icon" onClick={() => {
            setSort('desc')
        }}>
            <FontAwesomeIcon icon={faArrowUpAZ} id="center" />
        </button>
    )
}

function BtnDesc({ setSort }) {
    return (
        <button className="btn-icon" onClick={() => {
            setSort('asc')
        }}>
            <FontAwesomeIcon icon={faArrowDownZA} id="center" />
        </button>
    )
}


export default function SearchBar({ keyword, setKeyword, sort, setSort }) {
    const handleSearchChange = (event) => {
        const { value } = event.target
        setKeyword(value)
    }
    return (
        <div className="all">
            <div className="container-search">
                <div className="icon">
                    {sort === 'asc' || sort.sort === 'asc' ? <BtnAsc sort={sort} setSort={setSort} /> : <BtnDesc sort={sort} setSort={setSort} />}
                </div>
                <div className="input-container">
                    <button className="button-search">
                        <FontAwesomeIcon icon={faMagnifyingGlass} id="input-icon" />
                    </button>
                    <input type="text" value={keyword} onInput={handleSearchChange} aria-describedby="basic-addon1" id="input-field" />
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