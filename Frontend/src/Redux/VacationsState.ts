import { createStore } from "redux";
import VacationModel from "../Models/VacationModel";

export class vacationsState {
    public vacations: VacationModel[] = []
}

export const vacationsActionType = {
    FetchVacations: "FetchVacations",
    AddVacation: "AddVacation",
    UpdateVacation: "UpdateVacation",
    DeleteVacation: "DeleteVacation"
}
export interface vacationsAction {
    type: string
    payload: any
}

export function vacationsReducer(currentState: vacationsState, action:vacationsAction): vacationsState {

    const newState = {...currentState} 

    switch (action.type) {
        case vacationsActionType.FetchVacations: 
            newState.vacations = action.payload
            break;
        
        case vacationsActionType.AddVacation: 
            newState.vacations.push(action.payload)
            break
    
        case vacationsActionType.UpdateVacation: 
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vocationId)
            if(indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload
            }
            break
        
        case vacationsActionType.DeleteVacation: 
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId)
            if(indexToDelete >= 0) {
                newState.vacations.splice(indexToDelete,1)
            }
            break
    }

    return newState
}


export const vacationsStore = createStore(vacationsReducer)