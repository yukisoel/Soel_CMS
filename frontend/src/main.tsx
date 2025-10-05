import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './main/App.tsx'
import './global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </React.StrictMode>,
)
