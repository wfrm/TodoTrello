import { create } from "zustand";
import { persist } from "zustand/middleware";

type TContadorStoreState={
    contador:number;
    incrementarContador:()=>void;

};

export const useContadorStore= create<TContadorStoreState>()((set)=>({
contador:0,
incrementarContador:()=>set((state)=>({
    contador:state.contador+1,
}))
}))