import axios from "axios"

type Props = {
  setInstagramInfo:(str:string) => void
  text: string
  endopoint: string
}

export default function FacebookMeButton({setInstagramInfo, text, endopoint}:Props) {

  const getInfo = async () => {
    try{
      const res = await axios.get(
        "api/facebook",
        {
          withCredentials:true,
          params: {
            endopoint: endopoint
          }
        }
      )
      console.log(res)
      setInstagramInfo(JSON.stringify(res.data))

    }catch(e) {
      console.log("catch")
      location.href = "http://localhost:8080/oauth2/authorization/facebook"
    }
  }
  return (
    <div>
      <button onClick={getInfo}>{text}</button>
    </div>
  )
}