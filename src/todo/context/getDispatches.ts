import { ITodoActions, TodoActionDispatch, todoActions } from "./todoReducer";

export const getDispatches = (dispatch: React.Dispatch<TodoActionDispatch> ): ITodoActions =>  {
    const dispatches = {} as any

    const listDispatches = Object.entries(todoActions).map(([name, action]) => {
        type payloadType = Parameters<typeof action>[1]

        dispatches[name] = ( payload: payloadType ) => {
            dispatch({ type: name, payload })
        }   

    })

    return dispatches

}