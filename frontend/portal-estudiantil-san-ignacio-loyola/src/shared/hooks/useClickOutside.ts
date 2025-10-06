import { useEffect, type RefObject } from "react";

type Event = MouseEvent | TouchEvent;

/**
 * Hook personalizado que ejecuta una función callback cuando el usuario hace clic
 * fuera de un elemento específico.
 *
 * @param {RefObject<T>} ref La referencia (creada con `useRef`) al elemento del DOM que se desea vigilar.
 * @param {(event: Event) => void} handler La función que se ejecutará cuando ocurra un clic fuera del elemento.
 */
export const useClickOutside = <T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    handler: (event: Event) => void
) => {
    useEffect(() => {
        const listener = (event: Event) => {
            const el = ref.current;

            // No hacer nada si el elemento no existe o el clic fue dentro del elemento.
            if (!el || el.contains((event?.target as Node) || null)) {
                return;
            }

            handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        // Se retorna una función de limpieza para remover los listeners cuando el componente se desmonte.
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
};