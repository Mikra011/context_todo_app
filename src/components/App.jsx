import React from 'react'
import Todos from './Todos'
import TodoForm from './TodoForm'

export default function App() {
  return (
    <div id="main">
      <h2>Context Todo</h2>
      <Todos />
      <TodoForm />
    </div>
  )
}
