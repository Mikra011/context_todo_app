import React, { createContext, useReducer } from "react";

export const TodosContext = createContext()

const ADD_NEW_TODO = 'ADD_NEW_TODO'
const CHANGE_LABEL = 'CHANGE_LABEL'
const CHANGE_IS_COMPLETED = 'CHANGE_IS_COMPLETED'

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
    }

    const onLabelChange = (value) => {
        dispatch({ type: CHANGE_LABEL, payload: value })
    }

    const onIsCompletedChange = (checked) => {
        dispatch({ type: CHANGE_IS_COMPLETED, payload: checked })
    }

    const dataToProvide = {
        createNewTodo,
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