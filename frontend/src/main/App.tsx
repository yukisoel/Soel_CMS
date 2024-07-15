import { useEffect, useState } from 'react'
import './App.css'
import LoginButton from './components/LoginButton'

function App() {

  const [instagramInfo, setInstagramInfo] = useState<any>("まだ取れていません")

  const getInstagramInfo = async () => {
    const res = await fetch(
      '/api/graph/me',
    )
    .then((res) => res)
    .catch((err) => {
      console.error(err)
      return err
    })


    if(res.redirected) {
      console.log(res.redirected)
      window.location.href = res.url
    }
    const data = await res.json()
    console.log("instagram data:", data)
    setInstagramInfo(data.message)
  }

  useEffect(() => {
    getInstagramInfo()
  },[])

  return (
    <div>
      <LoginButton />
      <div>
        {instagramInfo}
      </div>
    </div>

  )
}

export default App
