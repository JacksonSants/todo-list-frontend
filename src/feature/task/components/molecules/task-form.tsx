import { NotebookPen } from "lucide-react"
import { Button } from "../atom/button"

interface Props {
  title: string
  description: string
  onChangeTitle: (v: string) => void
  onChangeDescription: (v: string) => void
  onSubmit: () => void
  submitLabel: string
}

export function TaskForm({
  title,
  description,
  onChangeTitle,
  onChangeDescription,
  onSubmit,
  submitLabel
}: Props) {
  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <div className="flex px-2 bg-zinc-950 rounded-lg gap-2">
        <NotebookPen className="text-zinc-400" />
        <input
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
          placeholder="Título..."
          className="bg-transparent flex-1 text-zinc-100 outline-none"
        />
      </div>

      <div className="flex px-2 bg-zinc-950 rounded-lg gap-2">
        <NotebookPen className="text-zinc-400" />
        <textarea
          rows={3}
          value={description}
          onChange={(e) => onChangeDescription(e.target.value)}
          placeholder="Descrição..."
          className="bg-transparent flex-1 text-zinc-100 outline-none resize-none"
        />
      </div>

      <Button type="submit">{submitLabel}</Button>
    </form>
  )
}
