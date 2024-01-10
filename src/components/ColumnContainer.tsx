import { Column } from "../types"
import TrashIcon from "../icons/TrashIcon"

interface Props{
  column:Column;
}
function ColumnContainer(props:Props) {
  const {column}=props;
  return (
    <div className="  bg-columnBackgroundColor
    w-[350px]
    h-[500px]
    max-h-[500px]
    rounded-md
    flex
    flex-col">
      <div  className="
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
      {column.title};
      <button
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
        contenido
      </div>
      {/* Column footer */}
      <div>
        footer
      </div>
    </div>
  )
}

export default ColumnContainer
