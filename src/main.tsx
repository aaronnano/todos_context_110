import React from 'react'
import ReactDOM from 'react-dom/client'
import { TodoApp } from './todo/TodoApp'
import 'bootswatch/dist/yeti/bootstrap.min.css'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <TodoApp />
  // </React.StrictMode>
)
