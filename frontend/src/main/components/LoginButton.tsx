import axios from "axios"

type Props = {
  setInstagramInfo:(str:string) => void
}

export default function LoginButton({setInstagramInfo}:Props) {

  const getInfo = async () => {
    try{
      const res = await axios.get("/api/demo/hello", {withCredentials:true})
      console.log(res)

    }catch(e) {
      console.log("catch")
      location.href = "http://localhost:8080/oauth2/authorization/facebook"
    }
  }
  return (
    <div>
      <button onClick={getInfo}>InstagramにLogin</button>
    </div>
  )
}