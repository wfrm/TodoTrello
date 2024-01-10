import { Column,Id, Task } from "../types"
import TrashIcon from "../icons/TrashIcon"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import TaskCard from "./TaskCard";


interface Props{
  createTask: (columnId: Id) => void;
  deleteColumn: (id: Id) => void;
  column:Column;
  updateColumn: (id: Id, title: string) => void;
  tasks: Task[];
  deletTask:(id: Id)=> void;
}



function ColumnContainer(props:Props) {
  const [editMode, setEditMode] = useState(false);


  const {column,deleteColumn,  updateColumn,createTask,tasks,deletTask}=props;

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,// estilos
    transition,// estilos
    isDragging,
  
  } =useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
      bg-columnBackgroundColor
      opacity-40
      border-2
      border-pink-500
      w-[350px]
      h-[500px]
      max-h-[500px]
      rounded-md
      flex
      flex-col
      "
      ></div>
    );
  }

  return (
    <div
    ref={setNodeRef}
    style={style} 
    className="  bg-columnBackgroundColor
    w-[350px]
    h-[500px]
    max-h-[500px]
    rounded-md
    flex
    flex-col">
          {/* Column title */}
      <div  
              {...attributes}
              {...listeners}
              onClick={() => {
                setEditMode(true);
              }}
      className="
      bg-mainBackgroundColor
      text-md
      h-[60px]
      cursor-grab
      rounded-md
      rounded-b-none
      p-3
      font-bold
      border-columnBackgroundColor
      border-4
      flex
      items-center
      justify-between
      ">
        <div className="
        flex
        justify-center
        items-center
        bg-columnBackgroundColor
        px-2
        py-1
        text-sm
        rounded-full
        ">0</div>
      {!editMode && column.title}
      {editMode && (
            <input 
            className="bg-black focus:border-rose-500 border rounded outline-none px-2" 
            onChange={(e) => updateColumn(column.id, e.target.value)}
            value={column.title}
            autoFocus
            onBlur={() => {
              setEditMode(false);
            }}>
            </input>
      )}
      <button

                onClick={() => {
                  deleteColumn(column.id);
                }}
            className="
        stroke-gray-500
        hover:stroke-white
        hover:bg-columnBackgroundColor
        rounded
        px-1
        py-2
        "
        >
          <TrashIcon />
        </button>
      </div>
     
      {/* Column task container */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
      {tasks.map((task) => (
        <TaskCard 
        key={task.id}
        deleteTask={deletTask}
         task={task}/>
        //<div key={task.id}>{task.content}</div>
          ))}
      </div>
      {/* Column footer */}
      <button
        className="flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
        onClick={() => {createTask(column.id);}}
      >
        <PlusIcon />
        Add task
      </button>
    </div>
  )
}

export default ColumnContainer
