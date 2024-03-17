import { useState } from 'react'
import PhoneList from './PhoneList';
import SearchBar from './SearchBar';


export default function PhoneBox() {
    const [keyword, setKeyword] = useState('')
    const [sort, setSort] = useState('asc')
    return (
        <>
            <SearchBar keyword={keyword} setKeyword={setKeyword} sort={sort} setSort={setSort} />
            <PhoneList keyword={keyword} sort={sort}
            />
        </>
    )
}