import { useState } from "react";

export function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed: false }),
    });

    if (response.ok) {
      setTitle("");
      onTaskAdded(); // atualiza lista
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4 w-full">
      <input
        type="text"
        placeholder="Nova tarefa..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 border rounded px-3 py-2"
      />
      <button
        type="submit"
        className="bg-pink-500 text-white px-4 py-2 rounded"
      >
        Adicionar
      </button>
    </form>
  );
}
