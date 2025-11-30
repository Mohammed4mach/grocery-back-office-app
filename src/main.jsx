import ReactDOM from 'react-dom/client'
import { LoaderProvider } from './contexts/loaderContext';
import { UserProvider } from './contexts/userContext';
import App from './App.jsx'
import Loader from './components/Loader';
import axios from 'axios'

window.axios = axios;

axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root')).render(
  <LoaderProvider>
    <UserProvider>
      <App />
      <Loader />
    </UserProvider>
  </LoaderProvider>
);

