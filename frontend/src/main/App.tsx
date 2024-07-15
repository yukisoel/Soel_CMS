import { useEffect, useState } from 'react'
import './App.css'
import LoginButton from './components/LoginButton'

function App() {
  const [instagramInfo, setInstagramInfo] = useState('まだ取得できていません')

  return (
    <div>
      <LoginButton 
        setInstagramInfo={setInstagramInfo}
      />
      <div>
        {instagramInfo}
      </div>
    </div>

  )
}

export default App
