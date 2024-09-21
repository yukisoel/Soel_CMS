import {Route, Routes} from "react-router-dom";
import EditPage from "./pages/EditPage.tsx";
import EditGBP from "@/main/components/editPage/EditGBP.tsx";
import SearchStore from "@/main/components/editPage/SearchStore.tsx";

function App() {

  return (
    <Routes>
      <Route
        path="/edit"
        element={
        <EditPage
          email={'dummyEmail.sample.jp'}
          children={<SearchStore />}
        />
        }
      >
      </Route>
      <Route
        path="/edit/gbp"
        element={
        <EditGBP />
        }
      >

      </Route>
    </Routes>
    )
}

export default App
