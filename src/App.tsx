import { useEffect } from "react";
import AddTodo from "./components/AddTodo";
import TodoCard from "./components/TodoCard";
import { TodoIF } from "./types";
import useTodo from "./hook/todoHook";

function App() {

  const { data, fetchData, invalidateData } = useTodo<{ todos: TodoIF[] }>('get-todo');

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-5">
      <AddTodo invalidateData={invalidateData} />
      <div className="grid grid-cols-2 gap-4 mt-12">
        {data?.todos.map((item: TodoIF, index: number) => <TodoCard key={index} item={item} invalidateData={invalidateData} />)}
      </div>
    </main>
  )
}

export default App
