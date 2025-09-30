// src/components/TaskList.jsx
export function TaskList({ tasks, onTaskDeleted }) {
  if (!tasks || tasks.length === 0) {
    return <p className="text-gray-500">Nenhuma tarefa encontrada.</p>;
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Deseja realmente apagar esta tarefa?");
    if (!confirmDelete) return;

    const response = await fetch(`/tasks/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      onTaskDeleted(); // <- precisa existir
    } else {
      alert("Erro ao apagar a tarefa");
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
