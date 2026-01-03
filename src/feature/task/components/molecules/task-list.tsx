import { Task } from "../../domain/entities/Task"
import { TaskItem } from "../organisms/task-item"


interface Props {
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
  onComplete: (task: Task) => void
}

export function TaskList({ tasks, onEdit, onDelete, onComplete }: Props) {
  return (
    <div className="w-full flex flex-col gap-3 text-zinc-100">
      
      {/* Header */}
      <div className="w-full flex justify-between px-6 py-3 border-b border-zinc-700 font-semibold">
        <div className="flex gap-6 w-1/2">
          <span className="w-10">N°</span>
          <span>Título</span>
        </div>

        <div className="flex gap-20">
          <span>Tempo</span>
          <span>Ações</span>
        </div>
      </div>

      {/* Lista */}
      <div className="flex flex-col gap-3">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task.id)}
            onComplete={() => onComplete(task)}
          />
        ))}
      </div>
    </div>
  )
}
