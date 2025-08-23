import { axiosApiClient } from '@/main/client/axiosClient.ts'

type Props = {
  setInstagramInfo:(str:string) => void
  text: string
  endpoint: string
}

export default function GoogleMeButton({ setInstagramInfo, text, endpoint }:Props) {

  const getInfo = async () => {
    try{
      const res = await axiosApiClient.get(
        endpoint,
        {
          withCredentials:true
        }
      )
      console.log(res)
      setInstagramInfo(JSON.stringify(res.data))

    }catch(e) {
      console.log('catch')
      location.href = 'http://localhost:8080/oauth2/authorization/google'
    }
  }
  return (
    <div>
      <button onClick={getInfo}>{text}</button>
    </div>
  )
}