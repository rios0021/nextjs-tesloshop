import { FC, PropsWithChildren, useReducer } from "react";
import { UiContext, uiReducer } from "./";


export interface UiState {
    sideMenuOpen: boolean;
}

const UI_INITIAL_STATE: UiState = {
    sideMenuOpen: false
}

export const UiProvider:FC<PropsWithChildren> = ({children}) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)
    const toggleSideMenu = () =>{
        dispatch({
            type: '[UI] - Toggle Sidebar'
        })
    }
    return (
        <UiContext.Provider value={{
            ...state,
            // Methods
            toggleSideMenu
        }}>
            {children}
        </UiContext.Provider>
    )
}