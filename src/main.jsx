import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Authprovider from './context/Authprovider.jsx'
import Labprovider from './context/Labprovider.jsx'

createRoot(document.getElementById('root')).render(
    <Authprovider>
        <Labprovider>
            <App />
        </Labprovider>
    </Authprovider>
)
