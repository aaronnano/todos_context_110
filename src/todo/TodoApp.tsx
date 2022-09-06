import { TodoInput } from "./components/TodoInput"
import { TodoList } from "./components/TodoList"
import { TodoProvider } from "./context/TodoProvider"



export const TodoApp = () => {
    return (
        <TodoProvider>
            <div className="container" style={{ padding: '0px 10%'}}>
                <TodoInput />
                <TodoList />
            </div>
            
        </TodoProvider>
    )
}
