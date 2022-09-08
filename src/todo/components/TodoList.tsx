import { useTodos } from "../hooks/useTodos"
import { TodoItem } from "./TodoItem"


export const TodoList = () => {
    const { todos, todoCount, completedTodos, selectedTodo, showTodos, todosToShow, deleteAllTodos, deleteAllDones } = useTodos()
    
    const onShowAll = () => {
        showTodos({ label: 'All' })
    }
    const onShowDones = () => {
        showTodos({ label: 'Done' })
    }
    const onDeleteAll = () => {
        deleteAllTodos()
    }
    const onDeleteDones = () => {
        deleteAllDones({ label: "Done" })
    }

    const isSelected = !!selectedTodo


    return (
    <>
        <h3 className="text-center mt-3 d-flex justify-content-center align-items-center gap-4">
            <span> Todos: { todoCount } - Completed: { completedTodos }</span>
            <span className="badge bg-info rounded-pill" style={{ fontSize: '14px'}}>{ todosToShow } Todos</span>
        </h3>
        <div className="row mt-4">
            <div className="col-6 px-5">
                <div className="d-grid">
                <button className="btn btn-success" onClick={ onShowAll }>
                    Show All
                </button>
                </div>
            </div>
            <div className="col-6 px-5">
                <div className="d-grid">
                <button className="btn btn-success" onClick={ onShowDones }>
                    Show Dones
                </button>
                </div>
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-12">
                <ul className="list-group">
                    {   todos.length !== 0 ?
                        todos.map( todo => (
                            <TodoItem key={ todo.id } todo={ todo } />
                        )) : 
                        <div className="alert alert-light text-center mx-5">
                            <div className="fs-5">Type some Todos</div>
                        </div> 

                    }
                </ul>

            </div>
        </div>
        
        <div className="row mt-4">
            <div className="col-6">
                <div className="d-grid">
                <button className="btn btn-danger" onClick={ onDeleteAll } disabled={ isSelected }>
                    Delete all Todos
                </button>
                </div>
            </div>
            <div className="col-6">
                <div className="d-grid">
                <button className="btn btn-danger" onClick={ onDeleteDones } disabled={ isSelected }>
                    Delete Dones
                </button>
                </div>
            </div>
        </div>
    </>   
    )
}
