import {Route, Routes} from "react-router-dom";
import EditPage from "./pages/EditPage.tsx";
import EditGBP from "@/main/components/editPage/EditGBP.tsx";
import SearchStore from "@/main/components/editPage/SearchStore.tsx";
import axios from "axios";

function App() {

  axios.get('/api/google/me')
    .then(res => {
      console.log(res.data)
    })
    .catch(_ => {
      window.location.href = '/oauth2/authorization/google'
    })

  return (
    <Routes>
      <Route
        path="/edit"
        element={
        <EditPage
          email={'dummyEmail.sample.jp'}
          pankuzuItemList={[{name: 'ページ編集', path: '/edit'}]}
          children={<SearchStore />}
        />
        }
      >
      </Route>
      <Route
        path="/edit/gbp"
        element={
          <EditPage
            email={'dummyEmail.sample.jp'}
            pankuzuItemList={[{name: 'ページ編集', path: '/edit'}, {name: 'GBP', path: '/edit/gbp'}]}
            children={
            <EditGBP
              storeName={'dummyStoreName'}
            />
          }
          />
        }
      >
      </Route>
    </Routes>
    )
}

export default App
