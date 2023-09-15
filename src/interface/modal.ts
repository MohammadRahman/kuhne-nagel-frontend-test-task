import { ReactNode } from "react";

export interface ModalContextProps{
    openName: string;
    open: (name: string)=> void
    close: ()=> void
}
export interface Children{
    children: ReactNode
}
export interface ModalOpenProps{
    opens: string;
    children: ReactNode
}
export interface ModalWindowProps{
    name: string;
    children: ReactNode
}