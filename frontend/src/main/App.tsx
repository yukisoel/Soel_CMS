import {Route, Routes} from "react-router-dom";
import EditPage from "./pages/EditPage.tsx";
import EditGBPLayout from "@/main/components/editPage/EditGBPLayout.tsx";
import SearchStore from "@/main/components/editPage/SearchStore.tsx";
import {GoogleAccountsContextProvider} from "@/main/contexts/GoogleAccountsContext.tsx";
import {GoogleRepositoryImpl} from "@/main/repositories/GoogleRepository.ts";
import {GoogleServiceImpl} from "@/main/services/GoogleService.ts";
import axios from "axios";
import {PankuzuListContextProvider} from "@/main/contexts/PankuzuItemListContext.tsx";
import {StoreContextProvider} from "@/main/contexts/StoreContext.tsx";
import EditProfileLayout from "@/main/components/editPage/EditProfileLayout.tsx";
import EditGBPDashboard from "@/main/components/editPage/EditGBPDashboard.tsx";

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
            <StoreContextProvider>
              <PankuzuListContextProvider>
                <EditPage
                  email={'dummyEmail.sample.jp'}
                />
              </PankuzuListContextProvider>
            </StoreContextProvider>
          }
        >
          <Route
            path={''}
            element={<SearchStore/>}
          >
          </Route>
          <Route
            path={'gbp'}
            element={<EditGBPLayout/>}
          >
            <Route
              path={""}
              element={<EditGBPDashboard/>}
            />
            <Route
              path={"profile"}
              element={<EditProfileLayout/>}
            />

          </Route>
          {/*<Route*/}
          {/*  path={'gbp/edit-profile'}*/}
          {/*  element={<EditProfileLayout/>}*/}
          {/*>*/}
          {/*</Route>*/}
        </Route>
      </Routes>
    </GoogleAccountsContextProvider>
  )
}

export default App
