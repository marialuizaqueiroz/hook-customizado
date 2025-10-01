import { useState } from "react";

// URL do seu backend hospedado
const API_URL = "https://my-checklist-backend.vercel.app"; 

export function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return; // evita enviar título vazio

    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (response.ok) {
      setTitle("");
      onTaskAdded(); // atualiza lista
    } else {
      const errorData = await response.json();
      alert("Erro: " + (errorData.error || "Não foi possível adicionar a tarefa"));
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
