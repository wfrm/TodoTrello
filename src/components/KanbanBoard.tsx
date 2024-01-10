
function KanbanBoard() {
  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px] justify-center">
    <div>
        <button className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p4 ring-rose-500 hover:ring-2" >Add column</button>
    </div>
    </div>
  )
}

export default KanbanBoard

