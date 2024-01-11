import { create } from "zustand";
import { persist } from "zustand/middleware";

type TContadorStoreState={
    contador:number;
    incrementarContador:()=>void;

};

export const useContadorStore= create<TContadorStoreState>()(
    persist( 
        (set)=>({
        contador:10,
        incrementarContador:()=>set((state)=>({
            contador:state.contador+1,
        }))
        }),{name:"contador storage"})

);