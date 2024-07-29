import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UserProvider } from './providers/User.jsx'
import {ProdutoListProvider} from './providers/ProdutoList.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ProdutoListProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </ProdutoListProvider>
)
