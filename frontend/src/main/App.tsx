import {Route, Routes} from "react-router-dom";
import EditPage from "./pages/EditPage.tsx";
import EditGBPPage from "@/main/pages/EditGBPPage.tsx";

function App() {

  return (
    <Routes>
      <Route
        path="/edit"
        element={
        <EditPage />
        }
      >
      </Route>
      <Route
        path="/edit/gbp"
        element={
        <EditGBPPage />
        }
      >

      </Route>
    </Routes>
    )
}

export default App
