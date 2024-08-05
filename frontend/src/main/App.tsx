import {useState} from 'react'
import styles from './App.module.css'
import FacebookMeButton from './components/facebook/FacebookMeButton.tsx'
import FacebookIdButton from './components/facebook/FacebookInputIdButton.tsx'
import GoogleMeButton from "./components/google/GoogleMeButton.tsx";

function App() {
  const [instagramMeInfo, setInstagramMeInfo] = useState('まだ取得できていません')
  const [instagramAdAccountIdInfo, setInstagramAdAccountIdInfo] = useState('まだ取得できていません')
  const [instagramCampaignIdInfo, setInstagramCampaignIdInfo] = useState('まだ取得できていません')

  const [googleMeInfo, setGoogleMeInfo] = useState('まだ取得できていません')

  return (
    <div className={styles.mainContainer}>
      <div className={styles.apiContainer}>
        <GoogleMeButton
          setInstagramInfo={setGoogleMeInfo}
          text={"googleのmeをゲット"}
          endpoint={"api/google/me"}
        />
        <div>
          {googleMeInfo}
        </div>
      </div>
      <div className={styles.apiContainer}>
        <FacebookMeButton
          setInstagramInfo={setInstagramMeInfo}
          text={"facebookのmeをゲット"}
          endpoint={"api/facebook/me"}
        />
        <FacebookMeButton
          setInstagramInfo={setInstagramMeInfo}
          text={"facebookのme/accountsをゲット"}
          endpoint={"api/facebook/me/accounts"}
        />
        <FacebookMeButton
          setInstagramInfo={setInstagramMeInfo}
          text={"広告アカウントの情報をゲット"}
          endpoint={"api/facebook/me/adaccounts"}
        />
        <div>
          {instagramMeInfo}
        </div>
        <FacebookIdButton
          setInstagramInfo={setInstagramAdAccountIdInfo}
          text={'広告アカウントのidを入力してキャンペーン一覧を取得'}
          endpoint={'api/facebook/campaingns'}
        />
        <div>
          {instagramAdAccountIdInfo}
        </div>
        <FacebookIdButton
          setInstagramInfo={setInstagramCampaignIdInfo}
          text={'キャンペーンのidを入力して詳細を取得'}
          endpoint={'api/facebook/campaingn-detail'}
        />
        <div>
          {instagramCampaignIdInfo}
        </div>
      </div>
    </div>

  )
}

export default App
