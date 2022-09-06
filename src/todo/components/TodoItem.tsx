import { useTodos } from '../hooks/useTodos'
import { Todo } from '../interfaces/interfaces'
import { BsPenFill } from 'react-icons/bs'
import { FaTrash } from 'react-icons/fa'
import { AiOutlineCheck } from 'react-icons/ai'
import { VscChromeClose } from 'react-icons/vsc'

interface props {
    todo: Todo
}

export const TodoItem = ({ todo }: props) => {
    const { toggleTodo, deleteTodo, selectTodo, selectedTodo } = useTodos()

    const onToggleTodo = () => {
        if( selectedTodo ) return 
        toggleTodo({ id: todo.id })
    }
    const onEditTodo = () => {
        if( todo.id === selectedTodo?.id ){
            selectTodo( null ); return 
        }
        selectTodo( todo )
        
    }
    const onDeleteTodo = () => {
        deleteTodo({ id: todo.id })
    }

    const todoSelectedColor = selectedTodo?.id === todo.id ? 'border-dark' : ''
    const colorEdit = selectedTodo?.id === todo.id ? 'danger' : 'warning'

    return (
        <li className={`list-group-item d-flex justify-content-between align-items-center py-3 mb-3 border ${ todoSelectedColor }`}
            // style={{ outline: todoSelectedColor }}
        >
            <div className={`w-75 ${ todo.completed ? 'text-success fw-bold' : ''}`} role='button'
                onClick={ onToggleTodo }
            >
                { todo.desc }
            </div>

            <div className='todo-icons' >
                <span className='text-success me-4'>
                    { todo.completed
                        ? <AiOutlineCheck style={{ fontSize: '18px' }}/> 
                        : ''
                    } 
                </span>
                {/* Para que actue como un button */}
                <span role='button' className={`text-${ colorEdit } me-4`}
                    onClick={ onEditTodo }    
                >
                    {
                        selectedTodo?.id === todo.id ? <VscChromeClose style={{ fontSize: '18px'}} /> : <BsPenFill />
                    }
                </span>
                <span role='button' className='text-danger me-4'
                    onClick={ onDeleteTodo }
                >  
                    <FaTrash />
                </span>

            </div>
        </li>
    )
}
