import {Route, Routes} from "react-router-dom";
import EditPage from "./pages/EditPage.tsx";
import EditGBPLayout from "@/main/components/editPage/EditGBPLayout.tsx";
import SearchStore from "@/main/components/editPage/SearchStore.tsx";
import {GoogleAccountsContextProvider} from "@/main/contexts/GoogleAccountsContext.tsx";
import {GoogleRepositoryImpl} from "@/main/repositories/GoogleRepository.ts";
import {GoogleServiceImpl} from "@/main/service/GoogleService.ts";
import {PankuzuListContextProvider} from "@/main/contexts/PankuzuItemListContext.tsx";
import EditProfileLayout from "@/main/components/editPage/EditProfileLayout.tsx";
import EditGBPDashboard from "@/main/components/editPage/EditGBPDashboard.tsx";
import {GoogleSelectedLocationContextProvider} from "@/main/contexts/GoogleSelectedLocationContext.tsx";
import {axiosApiClient} from "@/main/client/axiosClient.ts";
import EditPhotoLayout from "@/main/components/editPage/EditPhotoLayout.tsx";
import EditLocalPostLayout from "@/main/components/editPage/EditLocalPostLayout.tsx";
import EditMenuLayout from "@/main/components/editPage/EditMenuLayout/EditMenuLayout.tsx";
import EditReservationLayout from "@/main/components/editPage/EditReservationLayout/EditReservationLayout.tsx";

const googleRepository = new GoogleRepositoryImpl()
const googleService = new GoogleServiceImpl({googleRepository})

function App() {

  axiosApiClient.get('google/me')
    .then(_res => {
    })
    .catch(_ => {
      window.location.href = '/oauth2/authorization/google'
    })

  return (
    <Routes>
      <Route path="/edit"
             element={
               <GoogleAccountsContextProvider>
                 <GoogleSelectedLocationContextProvider>
                   <PankuzuListContextProvider>
                     <EditPage
                       email={'dummyEmail.sample.jp'}
                     />
                   </PankuzuListContextProvider>
                 </GoogleSelectedLocationContextProvider>
               </GoogleAccountsContextProvider>
             }
      >
        <Route path={''} element={<SearchStore googleService={googleService}/>}>
        </Route>
        <Route path={'gbp'} element={<EditGBPLayout/>}>
          <Route path={"accounts/:accountId/location/:locationId"}
                 element={<EditGBPDashboard googleService={googleService}/>}/>
          <Route path={"accounts/:accountId/location/:locationId/profile"}
                 element={<EditProfileLayout googleService={googleService}/>}/>
          <Route path={"accounts/:accountId/location/:locationId/photo"}
                 element={<EditPhotoLayout googleService={googleService}/>}/>
          <Route path={"accounts/:accountId/location/:locationId/local_post"}
                  element={<EditLocalPostLayout googleService={googleService}/>}/>
          <Route path={"accounts/:accountId/location/:locationId/menu"}
                  element={<EditMenuLayout googleService={googleService}/>}/>
          <Route path={"accounts/:accountId/location/:locationId/reservation"}
                  element={<EditReservationLayout googleService={googleService}/>}/>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
