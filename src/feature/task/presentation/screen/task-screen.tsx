import { useEffect, useState } from "react"
import { Task } from "../../domain/entities/Task"
import { taskRepository } from "../../data/repositories/task-repositore"
import { Button } from "../../components/atom/button"
import { TaskList } from "../../components/molecules/task-list"
import { Sidebar } from "../../components/organisms/card-navigate"
import { IoMdAdd } from "react-icons/io"

export function TaskScreen() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    taskRepository.list().then(setTasks)
  }, [])

  function handleDelete(id: number) {
    taskRepository.delete(id)
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  function handleComplete(task: Task) {
    taskRepository.complete(task.id)
    setTasks(prev =>
      prev.map(t =>
        t.id === task.id ? { ...t, concluida: true } : t
      )
    )
  }

  return (
    <div className="min-h-screen flex gap-6 px-10 py-2">

      <Sidebar />
      <div className="flex-1 flex flex-col p-10">
        <div className="flex justify-end">
          <div className="px-1">
            <Button variant="primary">
              <IoMdAdd size={20} className="text-zinc-900 font-semibold"/>
              Criar Nova Atividade
            </Button>
          </div>
        </div>

        <TaskList
          tasks={tasks}
          onEdit={() => { }}
          onDelete={handleDelete}
          onComplete={handleComplete}
        />
      </div>
    </div>
  )
}
