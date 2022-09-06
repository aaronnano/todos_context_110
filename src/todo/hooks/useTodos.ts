import { useContext } from "react"
import { TodoContext } from "../context/TodoProvider"


export const useTodos = () => {
    const { todoState, toggleTodo, addTodo, updateTodo, deleteTodo, selectTodo, showTodos, deleteAllTodos, deleteAllDones } = useContext(TodoContext)
    
    let { todos, todosToShow } = todoState

    todos = todosToShow === 'Done'
        ? todos.filter( todo => todo.completed )
        : todosToShow === 'Todo'
        ? todos.filter( todo => !todo.completed ) : todos

    return {
        ...todoState,
        todoState,
        todos,
        addTodo,
        toggleTodo,
        updateTodo,
        deleteTodo,
        selectTodo,
        showTodos,
        deleteAllTodos,
        deleteAllDones
    }

}