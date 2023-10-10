import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import Auth from './components/Auth'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  console.log(cookies + "  cookies")
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  const hoover = cookies.Hoover
  console.log(cookies + "  cookies")
  const [ tasks, setTasks] = useState(null)
  console.log(userEmail + "  user email")
  console.log(hoover + "  hoover")

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
      const json = await response.json()
      setTasks(json)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (authToken) {
      getData()
    }}
  , [])

  console.log(tasks)

  //Sort by date
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))


  return (
    <div className="app">
      
      {!authToken && <Auth/>}
      {authToken &&
        <>
        <ListHeader listName={'Task Doer'} getData={getData} />
        <p className="user-email">Welcome back {userEmail}</p>
        {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
        </>}
      <p className="copyright">Get Things Done</p>
    </div>
  )
}

export default App
