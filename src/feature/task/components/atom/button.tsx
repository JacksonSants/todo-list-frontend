interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost"
}

export function Button({ variant = "ghost", ...props }: ButtonProps) {
  const styles = {
    ghost: "bg-transparent hover:bg-zinc-800",
    primary: "bg-lime-300 text-lime-950 hover:bg-lime-400"
  }

  return (
    <button
      {...props}
      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-zinc-900 font-semibold ${styles[variant]}`}
    />
  )
}

export function ButtonNavigate({ variant = "ghost", ...props }: ButtonProps) {
  const styles = {
    ghost: "bg-transparent hover:bg-zinc-800",
    primary: "bg-lime-300 text-lime-950 hover:bg-lime-400"
  }

  return (
    <button
      {...props}
      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-zinc-300 font-semibold border border-zinc-700 ${styles[variant]}`}
    />
  )
}
