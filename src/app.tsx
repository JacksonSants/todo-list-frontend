import { CalendarClock, CircleX, Delete, Home, ListCheck, ListTodo, MapPin, NotebookPen, Palette, Pencil, PencilLine, Plus, X } from "lucide-react";
import { FormEvent, useState } from "react";

interface Activity {
  title?: string ;
  datetime?: string;
  description?: string;
}

export function App() {
  const [isCreateActivityModal, setIsCreateActivityModal] = useState(false);
  const [isEditActivityModal, setIsEditActivityModal] = useState(false);
  const [active,  setActive] = useState(true);
  const [activities, setActivity] = useState<Activity[]>([
    {
      title: "Correr 10km.",
      datetime: "2024-03-15T14:00:00.000Z",
      description: "Correr 10km depois da universidade.",
    },
  ]);

  function createActivityModelOpen(){
    setIsCreateActivityModal(true);
  }

  function createActivityModelClose() {
    setIsCreateActivityModal(false);

  }

  function editActivityModalOpen(){
    setIsEditActivityModal(true);
  }

  function editActivityModalClose(){
    setIsEditActivityModal(false);
  }

  function addNewActivity(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get('title')?.toString();
    const datetime = data.get('datetime')?.toString();
    const description = data.get('description')?.toString();

    const activity: Activity = {
      title,
      datetime,
      description,
    };

    if (!title || !datetime || !description) {
      return window.alert("Campos vázios. Preencha todos os campos.");
    }

    setActivity([
      ...activities,
      activity,
    ]);

    setIsCreateActivityModal(false);

  }

  return (
  <div className="max-w-70 p-10 flex gap-10">

    <div className="flex flex-col gap-3">
      <div className="max-w-xl px-4 h-16 rounded-xl bg-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="text-zinc-100 size-5"/>
            <span className="text-zinc-100 text-sm">Amazonas, 16 de setembro, 2024</span>
          </div>

          <div className="flex items-center justify-center">
            <button onClick={createActivityModelOpen} className=" flex-1 bg-lime-300 rounded-xl text-sm font-medium flex items-center hover:bg-lime-400 px-8">Adicionar atividade<Plus className="size-10"/></button>
          </div>
      </div>

      <div className="max-w-sm bg-zinc-800 rounded-xl hover:bg-zinc-100">
        <div className="flex items-center gap-2 px-10">
          <Home className="size-5 text-zinc-100 hover:text-zinc-900"/>
          <span className="block w-full rounded-xl py-4 text-zinc-100 hover:text-zinc-900 font-bold">Home</span>
        </div>
      </div>

      <div className="max-w-sm bg-zinc-800 rounded-xl hover:bg-zinc-100">
        <div className="flex items-center gap-2 px-10">
          <NotebookPen className="size-5 text-zinc-100 hover:text-zinc-900"/>
          <span className="block w-full rounded-xl py-4 text-zinc-100 hover:text-zinc-900 font-bold">To do</span>
        </div>
      </div>

      <div className="max-w-sm bg-zinc-800 rounded-xl hover:bg-zinc-100">
        <div className="flex items-center gap-2 px-10">
          <ListTodo className="size-5 text-zinc-100 hover:text-zinc-900"/>
          <span className="block w-full rounded-xl py-4 text-zinc-100 hover:text-zinc-900 font-bold">Doing</span>
        </div>
      </div>

      <div className="max-w-sm bg-zinc-800 rounded-xl hover:bg-zinc-100">
        <div className="flex items-center gap-2 px-10">
          <ListCheck className="size-5 text-zinc-100 hover:text-zinc-900"/>
          <span className="block w-full rounded-xl py-4 text-zinc-100 hover:text-zinc-900 font-bold">Done</span>
        </div>
      </div>

      <div className="max-w-sm bg-zinc-800 rounded-xl hover:bg-zinc-100">
        <div className="flex items-center gap-2 px-10">
          <Palette className="size-5 text-zinc-100 hover:text-zinc-900"/>
          <span className="block w-full rounded-xl py-4 text-zinc-100 hover:text-zinc-900 font-bold">Theme</span>
        </div>
      </div>

    </div>

    <div className="h-[85vh] w-full flex flex-col gap-5 overflow-auto">

      <div className="w-full flex flex-col gap-4 h-10">
        <div className="w-full flex-1 rounded-xl flex items-center justify-between px-10">
          <div className="w-full flex items-center justify-between gap-2">
            <h1 className="text-zinc-100">Nº</h1>

            <span className="text-zinc-100 flex-1">Atividade</span>

            <div className="flex gap-60">
              <div className="flex items-center gap-10">
                <span className="text-zinc-100 flex items-center">Horário</span>
              </div>

              <div className="flex w-full items-center gap-10">
                <span className="text-zinc-100 flex items-center">Ações</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 h-20">
        {activities.map(activity => (
          <div className="w-full bg-zinc-800 flex-1 rounded-xl flex items-center justify-between px-10">
          <div className="w-full flex items-center justify-between gap-2 h-20">
            <h1 className="text-zinc-100">1.</h1>
            <span className="text-zinc-100 flex-1">{activity.title}</span>
            <div className="flex items-center gap-10">
              <span className="text-zinc-100 flex items-center">{activity.datetime}</span>
                <div className="flex items-center gap-5">
                <Pencil className="size-10 text-zinc-100 text-xl rounded-md hover:bg-zinc-950 p-2" onClick={editActivityModalOpen}/>
                <Delete className="size-10 text-zinc-100 text-xl rounded-md hover:bg-zinc-950 p-2"/>
                <CircleX className="size-10 text-zinc-100 text-xl rounded-md hover:bg-zinc-950 p-2"/>
              </div>
            </div>
          </div>
        </div>
        ))}
      </div>

    </div>
    {isCreateActivityModal && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="w-[640px rounded-xl py-5 px-6 bg-zinc-900 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <PencilLine  className="text-zin size-7 text-zinc-400"/>
                <h2 className="text-lg font-semibold text-zinc-400">Create ativity</h2>
              </div>
              <X className="text-zinc-400 size-7 text-right" onClick={createActivityModelClose}/>
            </div>
            <p className="text-sm text-zinc-400">
            Fill in the data below (all fields are mandatory):</p>
          </div>
          <form onSubmit={addNewActivity} className="space-y-3">
            <div className="flex px-2 bg-zinc-950 border-l-zinc-800 rounded-lg items-center gap-2">
              <NotebookPen className="size-5 text-zinc-400"/>
              <input type="text" name="title" placeholder="Title..." className="bg-transparent text-lg text-zinc-100 placeholder:text-zinc-500 outline-none"/>
            </div>

            <div className="flex px-2 bg-zinc-950 border-l-zinc-800 rounded-lg items-center gap-2">
              <CalendarClock className="size-5 text-zinc-400"/>
              <input type="datetime-local" name="datetime" placeholder="End time......" className="bg-transparent flex-1 text-lg text-zinc-500 outline-none [color-scheme:dark]" style={{ color: '#71717A' }}
  />
            </div>

            <div className="flex px-2 bg-zinc-950 border-l-zinc-800 rounded-lg gap-2">
              <NotebookPen className="size-5 text-zinc-500"/>
              <textarea placeholder="Description..." name="description" rows={3} className="bg-transparent flex-1 text-lg text-zinc-100 placeholder:text-zinc-500 outline-none resize-none" />
            </div>

            <button  type="submit" className="w-full justify-center bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                Create Activity
            </button>

          </form>
        </div>
      </div>
    )}

    {isEditActivityModal && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="w-[640px rounded-xl py-5 px-6 bg-zinc-900 space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <PencilLine  className="text-zin size-7 text-zinc-400"/>
                <h2 className="text-lg font-semibold text-zinc-400">Edit ativity</h2>
              </div>
              <X className="text-zinc-400 size-7 text-right" onClick={editActivityModalClose}/>
            </div>
            <p className="text-sm text-zinc-400">
            Fill in the data below (all fields are mandatory):</p>
          </div>
          <form className="space-y-3">
            <div className="flex px-2 bg-zinc-950 border-l-zinc-800 rounded-lg items-center gap-2">
              <NotebookPen className="size-5 text-zinc-400"/>
              <input type="text" placeholder="Title..." className="bg-transparent text-lg text-zinc-100 placeholder:text-zinc-500 outline-none"/>
            </div>

            <div className="flex px-2 bg-zinc-950 border-l-zinc-800 rounded-lg items-center gap-2">
              <CalendarClock className="size-5 text-zinc-400"/>
              <input type="datetime-local" placeholder="End time......" className="bg-transparent flex-1 text-lg text-zinc-500 outline-none [color-scheme:dark]" style={{ color: '#71717A' }}
  />
            </div>

            <div className="flex px-2 bg-zinc-950 border-l-zinc-800 rounded-lg gap-2">
              <NotebookPen className="size-5 text-zinc-500"/>
              <textarea placeholder="Description..." rows={3} className="bg-transparent flex-1 text-lg text-zinc-100 placeholder:text-zinc-500 outline-none resize-none" />
            </div>

            <button type="submit" className="w-full justify-center bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                Salvar atividade
            </button>

          </form>
        </div>
      </div>
    )}

  </div>
  )
}