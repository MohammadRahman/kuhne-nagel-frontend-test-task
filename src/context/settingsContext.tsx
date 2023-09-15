import { createContext } from "react";

interface SettingContextProps { 
    active: []
}

export const SettingsContext = createContext<SettingContextProps | undefined>(undefined)
