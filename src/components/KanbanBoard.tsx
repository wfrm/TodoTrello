import PlusIcon from "../icons/PlusIcon"
import { useMemo, useState } from "react";
import { Column, Id, Task } from "../types";
import ColumnContainer from "./ColumnContainer";
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
  } from "@dnd-kit/core";

import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

function KanbanBoard() {
    const [columns, setColumns] = useState<Column[]>([]);//(defaultCols);
    const [tasks, setTasks] = useState<Task[]>([]);//(defaultTasks);
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
          activationConstraint: {
            distance: 10,
          },
        })
      );
    

   // const [activeTask, setActiveTask] = useState<Task | null>(null);
    console.log(columns);
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px] justify-center">
        <DndContext 
        sensors={sensors}
        onDragStart={onDragStart} 
        onDragEnd={onDragEnd}>
        <div className="m-auto flex gap-4">

            <div className="flex gap-4">
                <SortableContext items={columnsId}>
                {columns.map(col =>(
                    <ColumnContainer
                      key={col.id}
                       column={col}
                        deleteColumn={deleteColumn}
                           updateColumn={updateColumn}
                           createTask={createTask}
                           deletTask={deleteTask}
                           tasks={tasks.filter((task) => task.columnId === col.id)}
                           />
                ))}
                </SortableContext>


            </div>
                <button onClick={()=>{createNewColumn();}} className=" h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg border-2   border-columnBackgroundColor bg-mainBackgroundColor p4 ring-rose-500 hover:ring-2 flex gap-2 " >
                <PlusIcon/>Add column
            </button>

        </div>
        {createPortal(
        <DragOverlay>
        {activeColumn && (
            <ColumnContainer 
                deleteColumn={deleteColumn} 
                updateColumn={updateColumn}
                createTask={createTask} 
                deletTask={deleteTask}
                column={activeColumn}
                tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
                  />
        )}
        </DragOverlay>,
        document.body
        )}
        </DndContext>



    </div>
  );
  function deleteTask(id: Id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function createTask(columnId: Id) {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  }


  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  }

  function generateId() {
    /* Generate a random number between 0 and 10000 */
    return Math.floor(Math.random() * 10001);
  }
  function updateColumn(id: Id, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };//no entiendo esto
    });
    setColumns(newColumns);
}

  function deleteColumn(id: Id): void {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    throw new Error("Function not implemented.");
}
function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
   // setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }
  

function onDragStart(event: DragStartEvent) {
    console.log("DRAG START,event");
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      //setActiveTask(event.active.data.current.task);
      return;
    }
  }

 
}



export default KanbanBoard

