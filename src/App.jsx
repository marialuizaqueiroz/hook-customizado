import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { useApi } from "./hooks/useApi";

export default function App() {
  const { data: tasks, loading, error, refetch } = useApi("/tasks");

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center p-6 w-full max-w-md bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-pink-500">Lista de Tarefas</h1>

        <TaskForm onTaskAdded={refetch} />

        {loading && <p>Carregando...</p>}
        {error && <p className="text-red-500">Erro: {error}</p>}
        {!loading && !error && <TaskList tasks={tasks} onTaskDeleted={refetch} />


}

        
      </div>
    </div>
  );
}
