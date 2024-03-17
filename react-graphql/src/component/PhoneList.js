import { useState, useEffect } from 'react'
import { loadPage, loadPhonebooks } from '../actions/contact';
import '../app.css'
import PhoneItem from './PhoneItem'
import { useDispatch, useSelector } from "react-redux";

export default function PhoneList({ keyword, sort }) {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const { phonebooks, page, pages } = useSelector(state => state.contact)


    const handleScroll = async () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && !isLoading) {
            try {
                if (page < pages) {
                    setIsLoading(true)
                    const newPage = page + 1
                    dispatch(loadPage({ page: newPage, keyword, sort }))
                }
                else {
                    setIsLoading(false)
                }
            }
            catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false)
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [dispatch, pages, page, keyword, sort])

    useEffect(() => {
        const readData = async () => {
            try {
                dispatch(loadPhonebooks({ keyword, sort }))
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false)
            }
        }
        readData()

    }, [dispatch, keyword, sort])


    return (
        <div className="main" id="main-data">
            {!!phonebooks && phonebooks.length > 0 && phonebooks.map((user) => (
                <PhoneItem key={user.id} user={user} />
            ))}
        </div>
    )

}