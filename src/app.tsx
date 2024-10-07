import api from "../src/services/api";
import { CalendarClock, Check, NotebookPen, PencilLine, X , CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

interface Activity{
  id: number;
  titulo: string;
  descricao: string;
  tempo: date;
}

export function App() {
  const [isCreateActivityModal, setIsCreateActivityModal] = useState(false);
  const [title, setTitle] = useState("");
  const [tempo, setTempo] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    api.get('api/Tarefas/ListarTarefas')
      .then(response => {
        setTasks(response.data.dados);
      })
      .catch(error => {
        console.error("Erro ao buscar tarefas", error);
      });
  }, [setTasks]);

  function createActivityModelOpen() {
    setIsCreateActivityModal(true);
  }

  function createActivityModelClose() {
    setIsCreateActivityModal(false);
  }

  function isEditModalOpen(task: Activity) {
    setTaskToEdit(task);
    setTitle(tasks.titulo);
    setDescription(tasks.descricao);
    setTempo(tasks.tempo);
    setEditModal(true);
  }

  function isEditModalClose() {
    setEditModal(false);
    setTaskToEdit(null);
    setTitle("");
    setDescription("");
    setTempo("")
  }

  // Função para criar uma nova atividade
  function handleCreateActivity(e) {
    e.preventDefault();

    if (!title || !tempo || !description) {
      alert("Todos os campos são obrigatórios.");
      return;
    }

    axios.post('api/Tarefas/CriarTarefa', {
      titulo: title,
      descricao: description,
      tempo: tempo
    })
      .then(response => {
        setTasks(response.data.dados); // Atualiza a lista de tarefas com a nova tarefa criada
        setTitle("");  // Limpa o campo de título
        setTempo("");  // Limpa o campo de tempo
        setDescription("");  // Limpa o campo de descrição
        createActivityModelClose();  // Fecha o modal
      })
      .catch(error => {
        console.error("Erro ao criar tarefa", error);
      });
  }

      function handleEditActivity(e: React.FormEvent) {
        e.preventDefault();
    
        if (!taskToEdit) return;
    
        axios.patch(`api/Tarefas/EditarTarefa/${taskToEdit.id}`, {
            id: taskToEdit.id,
            titulo: title,
            descricao: description,
            tempo: tempo,
          })
          .then((response) => {
            setTasks((prevTasks) =>
                prevTasks.map((task) => (task.id === taskToEdit.id ? response.data.dados: task)
                )
            );
            isEditModalClose();
          })
          .catch((error) => {
            console.error("Erro ao editar a atividade", error);
          });
      }

  return (
    <div className="w-full p-10 flex justify-center gap-10">
      <div className="h-[85vh] w-[100vh] flex flex-col gap-5 overflow-auto">
        <button onClick={createActivityModelOpen} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex  gap-2 hover:bg-lime-400">
          Criar Nova Atividade
        </button>
      </div>

          <div className="w-full p-10 flex flex-col gap-10">
            <div className="h-[full] w-full flex flex-col gap=5 overflow-auto bg-slate-400 rounded-md items-center">
              <h2 className="text-zinc-100">Lista de Tarefas</h2>
              <div className="w-full py-3 flex justify-between px-10">
                <div className="w-full flex justify-between">
                  <div className="flex gap-3">
                    <h3>N°</h3>
                    <h3>Titulo</h3>
                  </div>
                  <h3>Data</h3>
                </div>
                <div>
                  <h3>Ações</h3>
                </div>
              </div>
            </div>

            
            {tasks.map((tasks, index) => (
              <div className="w-full flex flex-col gap-5 overflow-auto bg-slate-400 rounded-md items-center py-5">
                <div key={index} className="w-full flex justify-between px-10 gap-10">
                  <div className="w-full flex justify-between">
                    <div className="flex gap-3">
                      <h3>{tasks.id}</h3>
                      <h3>{tasks.titulo}</h3>
                    </div>
                    <h3>{tasks.tempo}</h3>
                  </div>
                  <div className="flex gap-5 items-center">
                    <PencilLine onClick={isEditModalOpen} />
                    <Check />
                    <CircleX />
                  </div>
                </div>
                </div>
            ))}
          </div>

          {isCreateActivityModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <PencilLine className="text-zinc-400" />
                  <h2 className="text-lg font-semibold text-zinc-400">Criar Atividade</h2>
                </div>
                <X className="text-zinc-400 cursor-pointer" onClick={createActivityModelClose} />
              </div>
              <p className="text-sm text-zinc-400">Preencha os dados abaixo (todos os campos são obrigatórios):</p>
            </div>

            <form className="space-y-3" onSubmit={handleCreateActivity}>
              <div className="flex px-2 bg-zinc-950 border-l-zinc-800 rounded-lg items-center gap-2">
                <NotebookPen className="size-5 text-zinc-400" />
                <input
                  type="text"
                  name="title"
                  placeholder="Título..."
                  className="bg-transparent text-lg text-zinc-100 placeholder:text-zinc-500 outline-none"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="flex px-2 bg-zinc-950 border-l-zinc-800 rounded-lg items-center gap-2">
                <CalendarClock className="size-5 text-zinc-400" />
                <input
                  type="datetime-local"
                  name="tempo"
                  placeholder="Hora de término..."
                  className="bg-transparent flex-1 text-lg text-zinc-500 outline-none"
                  value={tempo}
                  onChange={(e) => setTempo(e.target.value)}
                />
              </div>

              <div className="flex px-2 bg-zinc-950 border-l-zinc-800 rounded-lg gap-2">
                <NotebookPen className="size-5 text-zinc-500" />
                <textarea
                  placeholder="Descrição..."
                  name="description"
                  rows={3}
                  className="bg-transparent flex-1 text-lg text-zinc-100 placeholder:text-zinc-500 outline-none resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <button type="submit" className="w-full justify-center bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                Criar Atividade
              </button>
            </form>
          </div>
        </div>
      )}

{editModal && taskToEdit &&(
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <PencilLine className="text-zinc-400" />
                  <h2 className="text-lg font-semibold text-zinc-400">Editar Atividade</h2>
                </div>
                <X className="text-zinc-400 cursor-pointer" onClick={isEditModalClose} />
              </div>
              <p className="text-sm text-zinc-400">Preencha os dados abaixo (todos os campos são obrigatórios):</p>
            </div>

            <form className="space-y-3" onSubmit={handleEditActivity}>
              <div className="flex px-2 bg-zinc-950 border-l-zinc-800 rounded-lg items-center gap-2">
                <NotebookPen className="size-5 text-zinc-400" />
                <input
                  type="text"
                  name="title"
                  placeholder="Título..."
                  className="bg-transparent text-lg text-zinc-100 placeholder:text-zinc-500 outline-none"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="flex px-2 bg-zinc-950 border-l-zinc-800 rounded-lg items-center gap-2">
                <CalendarClock className="size-5 text-zinc-400" />
                <input
                  type="datetime-local"
                  name="tempo"
                  placeholder="Hora de término..."
                  className="bg-transparent flex-1 text-lg text-zinc-500 outline-none"
                  value={tempo}
                  onChange={(e) => setTempo(e.target.value)}
                />
              </div>

              <div className="flex px-2 bg-zinc-950 border-l-zinc-800 rounded-lg gap-2">
                <NotebookPen className="size-5 text-zinc-500" />
                <textarea
                  placeholder="Descrição..."
                  name="description"
                  rows={3}
                  className="bg-transparent flex-1 text-lg text-zinc-100 placeholder:text-zinc-500 outline-none resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <button type="submit" className="w-full justify-center bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                Editar Atividade
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}