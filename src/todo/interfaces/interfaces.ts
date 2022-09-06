export interface Todo {
    id: string
    desc: string
    completed: boolean
}

export type LabelsTodos = 'All' | 'Done' | 'Todo'

export interface TodoState {
    todoCount: number
    todos: Todo[]
    completedTodos: number
    pending: number
    selectedTodo: Todo | null
    todosToShow: LabelsTodos
}

export interface propsChild {
    children: JSX.Element | JSX.Element[]
}