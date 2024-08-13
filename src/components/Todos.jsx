import React, { useContext } from 'react'
import { TodosContext } from '../context/todos'


export default function Todo() {

  return (
    <div id="todos">
      <h3>Todos</h3>
      <ul>
        <span>Grocery ✔️</span>
        <span>Laundry ✔️</span>
        <span>Dishes ✔️</span>
      </ul>
      <button>
        Hide/Show completed todos
      </button>
      <button>
        Delete completed Todos
      </button>
    </div>
  )
}