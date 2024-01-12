import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task } from "../types";

type CardssStoreState={
    tasks: Task[]
    addTask: (task: Task) => void
    setTasks: (tareas: Task[]) => void


};

export const usetasksStore= create<CardssStoreState>()(
    persist( 
        (set)=>({
        tasks:[],
        addTask:(value)=>set((prev)=>({
            tasks:[...prev.tasks, value],
        })),
        setTasks: value =>
        set({
        tasks: value
        }),
        }),{name:"cards storage"})

);