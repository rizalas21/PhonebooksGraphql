import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client"
import ContactItem from "./ContactItem";
import { GET_PHONEBOOKS } from "../graphql/gql";

export default function ContactList({ filter }) {
  const [contacts, setContacts] = useState([])
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const { loading, data, error, fetchMore } = useQuery(GET_PHONEBOOKS, {
    variables: {
      page: page,
      limit: 30,
      ...filter
    }
  })
  console.log('filter', { ...filter, page })
  console.log('data => ', data)


  const handleScroll = async () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || !loading) return
    try {
      if (page < pages) {
        const newPage = page + 1
        setPage(newPage);
        // fetchMore({
        //   variables: {
        //     page: newPage,
        //     ...filter
        //   }
        // }).then((data) => {
        //   console.log(data)
        // }).catch((err) => {
        // setError(err.message)
        // })
        setContacts(prevContacts => [...prevContacts, data.phonebooks])
      }
      else {
        return <p>failed to get data</p>
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  // https://www.linkedin.com/jobs/search/?alertAction=viewjobs&currentJobId=3864767206&distance=25&f_TPR=a1710819635-&geoId=104370960&keywords=javascript%20developer&origin=JOB_ALERT_IN_APP_NOTIFICATION&originToLandingJobPostings=3864747029&savedSearchId=1738213219&sortBy=R

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, [filter, pages, page])

  useEffect(() => {
    if (!loading && data) {
      setContacts(data.getPhonebooks.phonebooks)
      setPages(data.getPhonebooks.pages)
    }

  }, [data, filter])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>
  return (
    <div className="Container-Content">
      {contacts.map((contact, index) => (
        <ContactItem key={index} contact={contact} />
      ))}
    </div>
  )
}
