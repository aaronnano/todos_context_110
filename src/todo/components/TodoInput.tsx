import { FormEventHandler, SyntheticEvent, useEffect, useState } from 'react'
import { BsBookmarksFill } from 'react-icons/bs'
import { RiEdit2Fill } from 'react-icons/ri'
import { useTodos } from '../hooks/useTodos'
import { v4 } from "uuid";


export const TodoInput = () => {
    const { addTodo, selectedTodo, updateTodo, selectTodo } = useTodos()
    const [valueInput, setValueInput] = useState('')

    useEffect(() => {  // Cuando se hacer render desde afuera, e.g. porque hay un selectedTodo, entonces 
        // el input estara vacio. O podria poner el valor actual de ese todo
        if( selectedTodo){
            setValueInput(selectedTodo.desc)
        } else {
            setValueInput('') // Cuando ya no halla ningun selectedTodo, ahi lo pongo en vacio
        }

    }, [ selectedTodo ])


    const onInputSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault()
        if( valueInput === '') return
        
        setValueInput('')

        if( selectedTodo ){
            updateTodo({ id: selectedTodo.id, desc: valueInput })
            selectTodo(null); return
        }

        addTodo({
            id: v4(), 
            desc: valueInput.trim(),
            completed: false
        })
    }

    const colorInput = selectedTodo ? 'warning' : 'success'
    const placeholder = selectedTodo ? 'Edit the Todo' : 'Type a Todo'
    const colorSubmit = selectedTodo ? 'warning' : 'info'
    const titleSubmit = selectedTodo ? 'Edit Todo' : 'Add Todo'
    return (
        <>
            <div className="row mt-4">
                <div className="col-md-12">
                    <h3 className="text-center mb-3">Add some Todos</h3>
                    <div className="card card-body px-5">
                    <form onSubmit={ onInputSubmit } >
                        <div className="input-group mb-3">

                        <span className={`input-group-text bg-${ colorInput } text-white px-3`}>
                            {
                                selectedTodo ? <RiEdit2Fill/> : <BsBookmarksFill /> 
                            } 
                        </span>

                        <input 
                            type="text" 
                            className="form-control"
                            placeholder={ placeholder }
                            value={valueInput}
                            onChange={(ev) => setValueInput(ev.target.value)}
                        />

                        </div>
                        <div className="d-grid px-5">
                            <button className={`btn btn-${ colorSubmit}`}>{ titleSubmit }</button>
                        </div>
                    </form>
                    </div>

                </div>
            </div>

        </>
    )
}
