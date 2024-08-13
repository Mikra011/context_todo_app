import React, { createContext, useReducer } from "react";

export const TodosContext = createContext()

let id = 1
const getNextId = () => id++
const initialState = {
    showCompletedTodos: true,
    todos: [
        { id: getNextId(), label: 'Laundry', complete: true },
        { id: getNextId(), label: 'Groceries', complete: false },
        { id: getNextId(), label: 'Dishes', complete: false },
    ],
}

export function TodosProvider(props) {
    
    return (
        <TodosContext.Provider>
            {props.children}
        </TodosContext.Provider>
    )
}