import {Route, Routes} from "react-router-dom";
import EditPage from "./pages/EditPage.tsx";
import EditGBP from "@/main/components/editPage/EditGBP.tsx";
import SearchStore from "@/main/components/editPage/SearchStore.tsx";
import {GoogleAccountsContextProvider} from "@/main/contexts/GoogleAccountsContext.tsx";
import {GoogleRepositoryImpl} from "@/main/repositories/GoogleRepository.ts";
import {GoogleServiceImpl} from "@/main/services/GoogleService.ts";
import axios from "axios";
import {PankuzuListContextProvider} from "@/main/contexts/PankuzuItemListContext.tsx";

const googleRepository = new GoogleRepositoryImpl()
const googleService = new GoogleServiceImpl({googleRepository})

function App() {

  axios.get('/api/google/me')
    .then(res => {
      console.log(res.data)
    })
    .catch(_ => {
      window.location.href = '/oauth2/authorization/google'
    })

  return (
    <GoogleAccountsContextProvider googleService={googleService}>
      <Routes>
        <Route
          path="/edit"
          element={
            <PankuzuListContextProvider>
              <EditPage
                email={'dummyEmail.sample.jp'}
              />
            </PankuzuListContextProvider>
          }
        >
          <Route
            path={''}
            element={
              <SearchStore/>
            }
          >
          </Route>
          <Route
            path={'gbp'}
            element={
              <EditGBP
                storeName={'dummyStoreName'}
              />
            }
          >
          </Route>
        </Route>
      </Routes>
    </GoogleAccountsContextProvider>
  )
}

export default App
