import { useEffect, useState } from "react"
import { Task } from "../../domain/entities/Task"
import { taskRepository } from "../../data/repositories/task-repositore"
import { Button } from "../../components/atom/button"
import { TaskList } from "../../components/molecules/task-list"
import { Sidebar } from "../../components/organisms/card-navigate"
import { IoMdAdd } from "react-icons/io"
import { TaskForm } from "../../components/molecules/task-form"

export function TaskScreen() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskForm, setTaskForm] = useState<Task>({
    id: 0,
    title: "",
    description: "",
    dateStart: "",
    completed: false,
    createdAt: new Date()
  })

  const [isFormOpen, setIsFormOpen] = useState(false)

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
        t.id === task.id ? { ...t, completed: true } : t
      )
    )
  }

  function handleClose() {
    setIsFormOpen(false)
  }

  function handleCreate(task: Task) {
    setTasks(prev => [...prev, task])

    setTaskForm({
      id: 0,
      title: "",
      description: "",
      dateStart: "",
      completed: false,
      createdAt: new Date()
    })

    setIsFormOpen(false)
  }

  return (
    <div className="min-h-screen flex gap-6 px-10 py-2">
      <Sidebar />

      <div className="flex-1 flex flex-col p-10">
        <div className="flex justify-end">
          <div className="px-4 py-2">
            <Button variant="primary" onClick={() => setIsFormOpen(true)}>
              <IoMdAdd size={20} className="text-zinc-900 font-semibold" />
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

        {isFormOpen && (
          <TaskForm
            currentTask={taskForm}
            onChangeTitle={(v) =>
              setTaskForm(prev => ({ ...prev, title: v }))
            }
            onChangeDescription={(v) =>
              setTaskForm(prev => ({ ...prev, description: v }))
            }
            onChangeDateStart={(v) =>
              setTaskForm(prev => ({ ...prev, dateStart: v }))
            }

            onSubmit={handleCreate}
            onClose={handleClose}
            submitLabel="Salvar"
          />
        )}
      </div>
    </div>
  )
}
