import { Calendar, NotebookPen, PencilLine, X } from "lucide-react"
import { SubmitButton } from "../atom/button"
import { Task } from "../../domain/entities/Task"
import { DayPicker } from "react-day-picker"
import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import "react-day-picker/dist/style.css" 

interface TaskProps {
  currentTask: Task,
  onChangeTitle: (v: string) => void
  onChangeDescription: (v: string) => void
  onSubmit: (task: Task) => void
  onClose: () => void
  onChangeDateStart: (date: string) => void
  submitLabel: string
}

export function TaskForm({
  currentTask,
  onChangeTitle,
  onChangeDescription,
  onSubmit,
  onClose,
  onChangeDateStart,
  submitLabel
}: TaskProps) {
  
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const task: Task = {
      ...currentTask,
      completed: false,
      createdAt: new Date()
    }
    onSubmit(task)
  }

  const selectedDate = currentTask.dateStart ? new Date(currentTask.dateStart) : undefined

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="w-[640px] rounded-xl py-5 px-6 bg-zinc-900 space-y-5 shadow-2xl border border-zinc-800">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PencilLine className="text-lime-400 size-5" />
            <h2 className="text-lg font-semibold text-zinc-100">Criar Atividade</h2>
          </div>
          <button onClick={onClose}>
            <X className="text-zinc-400 hover:text-zinc-200 transition-colors" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          
          <div className="flex px-3 h-12 bg-zinc-950 border border-zinc-800 rounded-lg items-center gap-2 focus-within:border-lime-400 transition-colors">
            <NotebookPen className="size-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Título da atividade"
              className="bg-transparent text-zinc-100 placeholder:text-zinc-500 outline-none flex-1"
              value={currentTask.title}
              onChange={(e) => onChangeTitle(e.target.value)}
              required
            />
          </div>

          <div className="flex p-3 bg-zinc-950 border border-zinc-800 rounded-lg gap-2 focus-within:border-lime-400 transition-colors">
            <textarea
              rows={3}
              placeholder="Descrição detalhada..."
              className="bg-transparent flex-1 text-zinc-100 placeholder:text-zinc-500 outline-none resize-none"
              value={currentTask.description}
              onChange={(e) => onChangeDescription(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <div className="flex justify-evenly">
              <div className="w-full px-2">
                <label className="text-zinc-100 text-md px-3">Ínicio</label>
                <button
                  type="button"
                  onClick={() => setIsDatePickerOpen(prev => !prev)}
                  className="flex w-full h-12 px-3 bg-zinc-950 border border-zinc-800 rounded-lg items-center gap-2 text-left hover:border-zinc-700 transition-colors"
                >
                  <Calendar className="size-5 text-zinc-400" />
                  <span className="flex-1 text-zinc-100">
                    {currentTask.dateStart
                      ? format(new Date(currentTask.dateStart), "PPP", { locale: ptBR })
                      : "dd/mm/dd"}
                  </span>
                </button>
              </div>

              <div className="w-full px-2">
                <label className="text-zinc-100 text-md px-3">Fim</label>
                <button
                  type="button"
                  onClick={() => setIsDatePickerOpen(prev => !prev)}
                  className="flex w-full h-12 px-3 bg-zinc-950 border border-zinc-800 rounded-lg items-center gap-2 text-left hover:border-zinc-700 transition-colors"
                >
                  <Calendar className="size-5 text-zinc-400" />
                  <span className="flex-1 text-zinc-100">
                    {currentTask.dateStart
                      ? format(new Date(currentTask.dateStart), "PPP", { locale: ptBR })
                      : "dd/mm/dd"}
                  </span>
                </button>
              </div>
            </div>

            {isDatePickerOpen && (
              <div className="absolute bottom-full mb-2 left-0 bg-zinc-500 border border-zinc-800 p-4 rounded-xl shadow-2xl z-[60]">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    if (date) {
                      onChangeDateStart(date.toISOString())
                      setIsDatePickerOpen(false)
                    }
                  }}
                  locale={ptBR}
                  className="rdp-invert rdp-lime"
                />
              </div>
            )}
          </div>

          <SubmitButton
            type="submit"
            variant="primary"
            className="w-full h-12 font-bold transition-colors"
          >
            {submitLabel}
          </SubmitButton>
        </form>
      </div>
    </div>
  )
}