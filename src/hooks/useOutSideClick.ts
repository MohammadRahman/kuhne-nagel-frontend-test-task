import { useEffect, useRef } from "react";

export function useOutSideClick(handler: () => void) {
    
    const ref = useRef<HTMLDivElement>()
    
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                handler()
            }
        }
        document.addEventListener('click', handleClick, true)

        return ()=> document.removeEventListener('click', handleClick, true)
    }, [handler, ref])
    
    return ref
}