import {Route, Routes} from "react-router-dom";
import EditPage from "./pages/EditPage.tsx";

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
    </Routes>
    )
}

export default App
