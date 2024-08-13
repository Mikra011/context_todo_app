import './styles/reset.css'
import './styles/app.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import { TodosProvider } from './context/todos'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <TodosProvider>
    <App />
  </TodosProvider>
)
