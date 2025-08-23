import axios from 'axios'
import { useRef } from 'react'

type Props = {
  setInstagramInfo:(str:string) => void
  text: string
  endpoint: string
}

export default function FacebookIdButton({ setInstagramInfo, text, endpoint }:Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const getInfo = async () => {
    try{
      const res = await axios.get(
        endpoint,
        {
          withCredentials:true,
          params: {
            id: inputRef.current?.value
          }
        }
      )
      console.log(res)
      setInstagramInfo(JSON.stringify(res.data))

    }catch(e) {
      console.log('catch')
      location.href = 'http://localhost:8080/oauth2/authorization/facebook'
    }
  }
  return (
    <div>
      <div></div>
      <input 
        type="text" 
        ref={inputRef}
      />
      <button onClick={getInfo}>{text}</button>
    </div>
  )
}