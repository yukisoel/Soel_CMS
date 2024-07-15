import { useState } from 'react'
import './App.css'
import FacebookMeButton from './components/FacebookMeButton.tsx'

function App() {
  const [instagramInfo, setInstagramInfo] = useState('まだ取得できていません')

  return (
    <div>
      <FacebookMeButton
        setInstagramInfo={setInstagramInfo}
        text={"facebookのmeをゲット"}
        endpoint={"api/facebook/me"}
      />
      <FacebookMeButton
        setInstagramInfo={setInstagramInfo}
        text={"facebookのme/accountsをゲット"}
        endpoint={"api/facebook/me/accounts"}
      />
      <div>
        {instagramInfo}
      </div>
    </div>

  )
}

export default App
