import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Authprovider from './context/Authprovider.jsx'
import Labprovider from './context/Labprovider.jsx'
import Pcsprovider from './context/Pcsprovider.jsx'
import Studentprovider from './context/Studentprovider.jsx'

createRoot(document.getElementById('root')).render(
    <Authprovider>
        <Labprovider>
            <Pcsprovider>
                <Studentprovider>
                    <App />
                </Studentprovider>
            </Pcsprovider>
        </Labprovider>
    </Authprovider>
)
