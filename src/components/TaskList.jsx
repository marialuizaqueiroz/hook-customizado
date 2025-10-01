// src/components/TaskList.jsx
const API_URL = "https://my-checklist-backend.vercel.app"; 

export function TaskList({ tasks, onTaskDeleted }) {
  if (!tasks || tasks.length === 0) {
    return <p className="text-gray-500">Nenhuma tarefa encontrada.</p>;
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Deseja realmente apagar esta tarefa?");
    if (!confirmDelete) return;

    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      onTaskDeleted(); // atualiza a lista
    } else {
      const errorData = await response.json();
      alert("Erro ao apagar a tarefa: " + (errorData.error || "Tente novamente"));
    }
  }

  return (
    <ul className="mt-4 w-full">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="p-2 border-b flex justify-between items-center"
        >
          <span>{task.title}</span>
          <button
            onClick={() => handleDelete(task.id)}
            className="text-red-500 font-bold px-2"
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
}
