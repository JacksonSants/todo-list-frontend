import api from "../../../core/services/api" 
import { Task } from "../../domain/entities/Task"

export const taskRepository = {
  list: async (): Promise<Task[]> => {
    const { data } = await api.get("api/Tarefas/ListarTarefas")
    return data.dados
  },

  create: async (payload: Pick<Task, "titulo" | "descricao">) => {
    const { data } = await api.post("api/Tarefas/CriarTarefa", payload)
    return data.dados
  },

  update: async (id: number, payload: Pick<Task, "titulo" | "descricao">) => {
    await api.put(`api/Tarefas/EditarTarefa/${id}`, payload)
  },

  delete: async (id: number) => {
    await api.delete(`api/Tarefas/ExcluirTarefa/${id}`)
  },

  complete: async (id: number) => {
    await api.put(`api/Tarefas/TarefaConcluida/${id}`)
  }
}
