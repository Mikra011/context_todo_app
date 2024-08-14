import React, { createContext, useReducer } from 'react'

export const TodosContext = createContext()

const TOGGLE_SHOW_COMPLETED_TODOS = 'TOGGLE_SHOW_COMPLETED_TODOS'
const ADD_NEW_TODO = 'ADD_NEW_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const CHANGE_LABEL = 'CHANGE_LABEL'
const CHANGE_IS_COMPLETED = 'CHANGE_IS_COMPLETED'
const DELETE_COMPLETED = 'DELETE_COMPLETED'

let id = 1
const getNextId = () => id++

const initialState = {
    showCompletedTodos: true,
    todos: [
        { id: getNextId(), label: 'Laundry', complete: true },
        { id: getNextId(), label: 'Groceries', complete: false },
        { id: getNextId(), label: 'Dishes', complete: false },
    ],
    todoLabel: '',
    todoIsCompleted: false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case ADD_NEW_TODO: {
            return { ...state, todos: [...state.todos, action.payload] }
        }
        case TOGGLE_TODO: {
            return {
                ...state,
                todos: state.todos.map(td => {
                    if (td.id !== action.payload) return td
                    return { ...td, complete: !td.complete }
                })
            }
        }
        case TOGGLE_SHOW_COMPLETED_TODOS: {
            return {
                ...state,
                showCompletedTodos: !state.showCompletedTodos
            }
        }
        case DELETE_COMPLETED: {
            return {
                ...state,
                todos: state.todos.filter(td => !td.complete)
            }
        }
        case CHANGE_LABEL: {
            return { ...state, todoLabel: action.payload }
        }
        case CHANGE_IS_COMPLETED: {
            return { ...state, todoIsCompleted: action.payload }
        }
        default:
            return state
    }
}

export function TodosProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState)

    const createNewTodo = (label, complete) => {
        const newTodo = { id: getNextId(), label, complete }
        dispatch({ type: ADD_NEW_TODO, payload: newTodo })
        dispatch({ type: CHANGE_LABEL, payload: '' }) // Reset form state
        dispatch({ type: CHANGE_IS_COMPLETED, payload: false }) // Reset form state
    }

    const toggleTodo = id => {
        dispatch({ type: TOGGLE_TODO, payload: id })
    }

    const toggleShowCompletedTodos = () => {
        dispatch({ type: TOGGLE_SHOW_COMPLETED_TODOS })
    }
    const deleteCompleted = () => {
        dispatch({ type: DELETE_COMPLETED })
    }

    const onLabelChange = (value) => {
        dispatch({ type: CHANGE_LABEL, payload: value })
    }

    const onIsCompletedChange = (checked) => {
        dispatch({ type: CHANGE_IS_COMPLETED, payload: checked })
    }

    const dataToProvide = {
        toggleTodo,
        createNewTodo,
        toggleShowCompletedTodos,
        deleteCompleted,
        onLabelChange,
        onIsCompletedChange,
        ...state
    }

    return (
        <TodosContext.Provider value={dataToProvide}>
            {props.children}
        </TodosContext.Provider>
    )
}
