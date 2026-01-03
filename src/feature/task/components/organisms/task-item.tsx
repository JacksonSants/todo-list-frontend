import { Check, CircleX, PencilLine } from "lucide-react"
import { Task } from "../../domain/entities/Task"

interface Props {
  task: Task
  onEdit: () => void
  onDelete: () => void
  onComplete: () => void
}

export function TaskItem({ task, onEdit, onDelete, onComplete }: Props) {
  return (
    <div className="w-full flex justify-between items-center px-6 py-4 bg-slate-400 rounded-md text-zinc-900">
      
      <div className="flex gap-6 w-1/2">
        <span className="w-10">{task.id}</span>
        <span className="font-medium">{task.titulo}</span>
      </div>

      <div className="flex gap-20 items-center">
        <span>{task.tempo ?? "--"}</span>

        <div className="flex gap-4">
          <PencilLine
            className="cursor-pointer hover:text-blue-600"
            onClick={onEdit}
          />
          <Check
            className="cursor-pointer hover:text-green-600"
            onClick={onComplete}
          />
          <CircleX
            className="cursor-pointer hover:text-red-600"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  )
}
