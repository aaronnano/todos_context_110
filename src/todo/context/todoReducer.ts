import { LabelsTodos, Todo, TodoState } from "../interfaces/interfaces";

export interface ITodoActions {
    addTodo:    ( payload: Todo ) => void
    toggleTodo: ( payload: { id: string } ) => void
    updateTodo: ( payload: { id: string, desc: string } ) => void
    deleteTodo: ( payload: { id: string } ) => void
    selectTodo: ( payload: Todo | null ) => void
    showTodos:  ( payload: { label: LabelsTodos } ) => void
    deleteAllTodos: ( payload?: undefined ) => void
    deleteAllDones: ( payload: { label: LabelsTodos }) => void
}

interface Actions {
    [key: string]: (state: TodoState, payload: any ) => void
}

export const todoActions: Actions = {
    addTodo: ( state: TodoState, payload: Todo ) => {
        state.todos = [ ...state.todos, payload ]  // todos.push()
        state.pending = state.pending + 1
        state.todoCount = state.todoCount + 1

    },
    toggleTodo: ( state: TodoState, payload: { id: string }) => {
        state.todos = state.todos.map( todo => {
            if( todo.id === payload.id ){
                todo.completed = !todo.completed
            }
            return todo 
        })
        state.completedTodos = state.todos.filter(todo => todo.completed ).length
        state.pending = state.todos.length - state.completedTodos
        
    },
    updateTodo: ( state: TodoState, payload: { id: string, desc: string } ) => {
        const todoToUpdate = state.todos.find( todo => todo.id === payload.id ) as Todo // Finded
        
        // Puedo tambien usar el state.selectedTodo
        // const todoToUpdate = { ...state.selectedTodo }  No altero la referencia de este
        // En mi app, luego pondre el selectedTodo en null

        todoToUpdate.desc = payload.desc

        state.todos = state.todos.map(todo => {
            if( todo.id === todoToUpdate.id ){
                return todoToUpdate
            }
            return todo
        }) 
        
    },
    deleteTodo: ( state: TodoState, payload: { id: string }) => {
        state.todos = state.todos.filter( todo => todo.id !== payload.id )
        state.completedTodos = state.todos.filter( todo => todo.completed ).length
        state.pending = state.todos.length - state.completedTodos,
        state.todoCount = state.todoCount - 1

    },
    selectTodo: ( state: TodoState, payload: Todo | null ) => {
        state.selectedTodo = payload
        
    },
    showTodos: ( state: TodoState, payload: { label: LabelsTodos }) => {
        state.todosToShow = payload.label  
    },
    deleteAllTodos: ( state: TodoState ) => {
        state.todos = []
    },
    deleteAllDones: ( state: TodoState, payload: { label: LabelsTodos }) => {
        state.todos = payload.label === 'Done' ?  
            state.todos.filter( todo => !todo.completed ) :
            state.todos
    }
}


export type TodoActionDispatch = { type: string, payload: any }
    // | { type: 'addTodo', payload: Todo } 
    // | { type: 'toggleTodo', payload: { id: string }}

export const todoReducer = (state: TodoState, { type, payload }: TodoActionDispatch): TodoState => {
    todoActions[type](state, payload ) // || state
    // Podria devolver state solo para no hacer render
    return {
        ...state
    }

}