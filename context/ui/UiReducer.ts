import { UiState } from './'

type UiActionType = 
| {type: '[UI] - Toggle Sidebar'}

export const uiReducer = (state: UiState, action: UiActionType):UiState => {
    switch (action.type) {
        case  '[UI] - Toggle Sidebar':
            return{
                ...state,
                sideMenuOpen: !state.sideMenuOpen,
            }
        default:
            return state;
    }
}