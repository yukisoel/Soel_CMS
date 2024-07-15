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
        endopoint={"/me"}
      />
      <div>
        {instagramInfo}
      </div>
    </div>

  )
}

export default App
