import { Route, Routes } from 'react-router-dom'
import EditPageAdvanced from './pages/EditPageAdvanced.tsx'
import EditStoreList from './components/editPage/v2/EditStoreList/EditStoreList.tsx'
import SchedulePost from './components/stores/SchedulePost/SchedulePost.tsx'
import BlukPhoto from './components/stores/BulkPhoto/BulkPhoto.tsx'
import BulkSpecialOpeningHours from './components/stores/BulkSpecialOpeningHours/BulkSpecialOpeningHours.tsx'
import SchedulePostList from './components/stores/SchedulePostList/SchedulePostList.tsx'
import ReviewPage from './components/stores/Review/ReviewPage.tsx'
import HistoryPostList from './components/stores/HistorypostList/HistoryPostList.tsx'
import SelectStoreSingleRender from './components/stores/SelectStoreSingle/SelectStoreSingleRender.tsx'
import EditProfileLayoutV2 from './components/editPage/v2/EditProfile/EditProfileLayoutV2.tsx'
import EditPhotoLayoutV2 from './components/editPage/v2/EditPhoto/EditPhotoLayoutV2.tsx'
import { EditMenuLayoutV2 } from './components/editPage/v2/EditMenu/EditMenuLayoutV2.tsx'
import { EditLatestInformationV2 } from './components/editPage/v2/EditLatestInformation/EditLatestInformationV2.tsx'
import EditProductV2 from './components/editPage/v2/EditProduct/EditProductV2.tsx'
import EditReservationV2 from './components/editPage/v2/EditReservation/EditReservationV2.tsx'
import SearchStoreV2 from './components/editPage/SearchStoreV2.tsx'
import EditQaLayout from './components/editPage/v2/EditQaLayout/EditQaLayout.tsx'
import { axiosApiClient } from '@/main/client/axiosClient.ts'
import { GoogleSelectedLocationContextProvider } from '@/main/contexts/GoogleSelectedLocationContext.tsx'
import EditGBPDashboard from '@/main/components/editPage/EditGBPDashboard.tsx'
import { PankuzuListContextProvider } from '@/main/contexts/PankuzuItemListContext.tsx'
import { GoogleRepositoryProvider } from '@/main/contexts/GoogleRepositoryContext.tsx'
import { GoogleAccountsContextProvider } from '@/main/contexts/GoogleAccountsContext.tsx'

function App() {

  axiosApiClient.get('cognito/me')

  return (
    <GoogleRepositoryProvider>
      <GoogleAccountsContextProvider>
        <GoogleSelectedLocationContextProvider>
          <Routes>
            <Route path={'/'} element={<EditStoreList />}></Route>
            <Route path="/edit"
              element={
                <PankuzuListContextProvider>
                  <EditPageAdvanced />
                </PankuzuListContextProvider>
              }
            >
              <Route path={''} element={<SearchStoreV2 />}></Route>
              <Route path={'gbp'}>
                <Route path={'accounts/:accountId/location/:locationId'}
                  element={<EditGBPDashboard />}/>
                <Route path={'accounts/:accountId/location/:locationId/profile'}
                  element={<EditProfileLayoutV2 />}/>
                <Route path={'accounts/:accountId/location/:locationId/photo'}
                  element={<EditPhotoLayoutV2 />}/>
                <Route path={'accounts/:accountId/location/:locationId/menu'}
                  element={<EditMenuLayoutV2 />}/>
                <Route path={'accounts/:accountId/location/:locationId/latest_information'}
                  element={<EditLatestInformationV2 />}/>
                <Route path={'accounts/:accountId/location/:locationId/product'}
                  element={<EditProductV2 />}/>
                <Route path={'accounts/:accountId/location/:locationId/reservation'}
                  element={<EditReservationV2 onTryButtonClick={() => console.log('Try button clicked')} />}/>
                <Route path={'accounts/:accountId/location/:locationId/qa'}
                  element={<EditQaLayout />}/>
              </Route>
              <Route path={'bulk/schedule-post'}
                element={<SchedulePost />} />
              <Route path={'bulk/schedule-post-list'}
                element={<SchedulePostList />} />
              <Route path={'bulk/history-post-list'}
                element={<HistoryPostList />} />
              <Route path={'bulk/photo'}
                element={<BlukPhoto />} />
              <Route path={'bulk/special'}
                element={<BulkSpecialOpeningHours />} />
              <Route path={'store'}
                element={<SelectStoreSingleRender />} />
              <Route path={'review'}
                element={<ReviewPage />} />
            </Route>
          </Routes>
        </GoogleSelectedLocationContextProvider>
      </GoogleAccountsContextProvider>
    </GoogleRepositoryProvider>
  )
}

export default App
