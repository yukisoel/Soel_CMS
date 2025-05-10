import {Route, Routes} from "react-router-dom";
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
import EditProductLayout from "./components/editPage/EditProductLayout/EditProductLayout.tsx";
import EditPageAdvanced from "./pages/EditPageAdvanced.tsx";
import SchedulePost from "./components/stores/SchedulePost/SchedulePost.tsx";
import BlukPhoto from "./components/stores/BulkPhoto/BulkPhoto.tsx";
import BulkSpecialOpeningHours from "./components/stores/BulkSpecialOpeningHours/BulkSpecialOpeningHours.tsx";
import SchedulePostList from "./components/stores/SchedulePostList/SchedulePostList.tsx";
import ReviewPage from "./components/stores/Review/ReviewPage.tsx";
import HistoryPostList from "./components/stores/HistorypostList/HistoryPostList.tsx";
import SelectStoreSingleRender from "./components/stores/SelectStoreSingle/SelectStoreSingleRender.tsx";
import EditProfileLayoutV2 from "./components/editPage/v2/EditProfile/EditProfileLayoutV2.tsx";
import EditPhotoLayoutV2 from "./components/editPage/v2/EditPhoto/EditPhotoLayoutV2.tsx";
import { EditMenuLayoutV2 } from "./components/editPage/v2/EditMenu/EditMenuLayoutV2.tsx";
import { EditLatestInformationV2 } from "./components/editPage/v2/EditLatestInformation/EditLatestInformationV2.tsx";
import EditProductV2 from "./components/editPage/v2/EditProduct/EditProductV2.tsx";
import EditReservationV2 from "./components/editPage/v2/EditReservation/EditReservationV2.tsx";
import SearchStoreV2 from "./components/editPage/SearchStoreV2.tsx";
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
                     <EditPageAdvanced />
                   </PankuzuListContextProvider>
                 </GoogleSelectedLocationContextProvider>
               </GoogleAccountsContextProvider>
             }
      >
        <Route path={''} element={<SearchStore googleService={googleService}/>}>
        </Route>
        <Route path={'v2'} element={<SearchStoreV2 googleService={googleService}/>}></Route>
        <Route path={"v2/gbp"}>
          <Route path={"accounts/:accountId/location/:locationId/profile"}
                  element={<EditProfileLayoutV2 googleService={googleService}/>}/>
          <Route path={"accounts/:accountId/location/:locationId/photo"}
                  element={<EditPhotoLayoutV2 googleService={googleService}/>}/>
          <Route path={"accounts/:accountId/location/:locationId/menu"}
                  element={<EditMenuLayoutV2 googleService={googleService}/>}/>
          <Route path={"accounts/:accountId/location/:locationId/latest_information"}
                  element={<EditLatestInformationV2 googleService={googleService}/>}/>
          <Route path={"accounts/:accountId/location/:locationId/product"}
                  element={<EditProductV2 googleService={googleService}/>}/>
          <Route path={"accounts/:accountId/location/:locationId/reservation"}
                  element={<EditReservationV2 onTryButtonClick={() => console.log('Try button clicked')} />}/>
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
          <Route path={"accounts/:accountId/location/:locationId/product"}
                  element={<EditProductLayout />}/>
        </Route>
      </Route>
      <Route path={'/basic'}
        element={
          <GoogleAccountsContextProvider>
            <GoogleSelectedLocationContextProvider>
                    <EditPageAdvanced />
            </GoogleSelectedLocationContextProvider>
          </GoogleAccountsContextProvider>
        }>
          <Route path={'bulk/schedule-post'}
            element={<SchedulePost googleService={googleService} />} />
          <Route path={'bulk/schedule-post-list'}
            element={<SchedulePostList />} />
          <Route path={'bulk/history-post-list'}
            element={<HistoryPostList />} />
          <Route path={'bulk/photo'}
            element={<BlukPhoto googleService={googleService} />} />
          <Route path={'bulk/special'}
            element={<BulkSpecialOpeningHours googleService={googleService} />} />
          <Route path={'store'}
            element={<SelectStoreSingleRender googleService={googleService} />} />
          <Route path={'review'}
            element={<ReviewPage />} />
      </Route>
    </Routes>
  )
}

export default App
