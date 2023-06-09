import useTodo from "../hook/todoHook";
import { TodoCardIF } from "../types"



const TodoCard = ({ item, invalidateData }: TodoCardIF) => {
  const { deleteData } = useTodo(`delete/${item._id}`);
  const { patchData } = useTodo(`update/${item._id}`);

  const deleteHandler = async () => {
    await deleteData()
    invalidateData()
  }

  const updateStatus = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const status = e.target.checked;
    await patchData({ status: status })
    invalidateData()
  }
  return (
    <div className="px-4 py-6 rounded-md bg-white shadow-md">
      <div className="flex gap-3 justify-between items-center">
        <h5 className={`${item.status && 'line-through text-gray-400'}`}>{item.title}</h5>
        <input type="checkbox" checked={item.status} onChange={updateStatus} className="cursor-pointer" />
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={deleteHandler} className="bg-red-600 rounded-md px-3 py-2 text-xs text-white">
          Delete
        </button>
      </div>
    </div>
  )
}

export default TodoCard