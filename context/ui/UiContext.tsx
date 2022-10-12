import { createContext } from "react";

interface ContextProps {
    sideMenuOpen: boolean;
    // Methods
    toggleSideMenu: () => void;
}

export const UiContext = createContext({} as ContextProps);