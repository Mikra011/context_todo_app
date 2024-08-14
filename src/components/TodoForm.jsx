import React, { useContext } from 'react'
import { TodosContext } from '../context/todos'

export default function TodoForm() {
  const {
    createNewTodo,
    todoLabel,
    todoIsCompleted,
    onLabelChange,
    onIsCompletedChange
  } = useContext(TodosContext)

  const resetForm = () => {
    onLabelChange('')
    onIsCompletedChange(false)
  }

  const onNewTodo = evt => {
    evt.preventDefault()
    createNewTodo(todoLabel, todoIsCompleted)
    resetForm()
  }

  return (
    <form id="todoForm" onSubmit={onNewTodo}>
      <h3>Create New Todo Form</h3>
      <label><span>Todo label:</span>
        <input
          type='text'
          name='todoLabel'
          placeholder='Type label'
          onChange={e => onLabelChange(e.target.value)}
          value={todoLabel}
        />
      </label>
      <label><span>Is completed:</span>
        <input
          type='checkbox'
          name='todoIsCompleted'
          onChange={e => onIsCompletedChange(e.target.checked)}
          checked={todoIsCompleted}
        />
      </label>
      <label><span>Create todo:</span>
        <input
          type='submit'
          value='Do it!'
          disabled={!todoLabel.trim()}
        />
      </label>
    </form>
  )
}
