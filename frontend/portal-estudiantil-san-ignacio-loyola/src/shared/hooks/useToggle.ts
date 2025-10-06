import { useCallback, useState } from "react";

/**
 * Hook personalizado para manejar un estado booleano (on/off).
 * Es útil para controlar la visibilidad de componentes como modales, menús, etc.
 *
 * @param {boolean} [initialState=false] - El estado inicial del toggle. Por defecto es `false`.
 * @returns {[boolean, () => void]} Un array (tupla) que contiene:
 * - El estado booleano actual.
 * - Una función para alternar el estado (toggle).
 */
export const useToggle = (initialState: boolean = false): [boolean, () => void] => {
    const [state, setState] = useState(initialState);

    const toggle = useCallback(() => setState((prev) => !prev), []);

    return [state, toggle];
};