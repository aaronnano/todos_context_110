import { createContext, useReducer } from "react";
import { TodoState } from "../interfaces/interfaces";
import { ITodoActions, todoActions, todoReducer } from "./todoReducer";
import { v4 } from "uuid";
import { getDispatches } from "./getDispatches";


// #### TodoContext
// Lo que se va a exponer
export interface TodoContextProps extends ITodoActions {
    todoState: TodoState,
    // addTodo: ( todo: Todo ) => void
}

export const TodoContext = createContext<TodoContextProps>({} as TodoContextProps)

const INITIAL_STATE: TodoState = {
    todoCount: 1,
    todos: [
        {
            id: v4(),
            desc: 'Learn React Native',
            completed: false
        },
    ],
    completedTodos: 0,
    pending: 1,
    selectedTodo: null,
    todosToShow: 'All'
}

interface props {
    children: JSX.Element | JSX.Element[]
}

// #### TodoProvider
export const TodoProvider = ({ children }: props ) => {
    const [todoState, dispatch] = useReducer( todoReducer, INITIAL_STATE )
    
    // #### Actions. Asi antes. Lo mismo con los demas
    // const addTodo = ( todo: Todo ) => {
    //     dispatch({ type: 'addTodo', payload: todo })
    // }
    // const toggleTodo = ...

    const dispatches = getDispatches(dispatch)

    const store: TodoContextProps = {
        todoState,
        // addTodo,
        ...dispatches
    }

    
    return (
        <TodoContext.Provider value={store}>
            { children }
        </TodoContext.Provider>
    )
}