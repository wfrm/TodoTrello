import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Column } from "../types";

type ColumnsStoreState={
    columns: Column[]
    addColumn: (column: Column) => void
    setColumns: (columnas: Column[]) => void


};

export const useColumnsStore= create<ColumnsStoreState>()(
    persist( 
        (set)=>({
        columns:[],
        addColumn:(value)=>set((prev)=>({
            columns:[...prev.columns, value],
        })),
        setColumns: value =>
        set({
          columns: value
        }),
        }),{name:"columns storage"})

);