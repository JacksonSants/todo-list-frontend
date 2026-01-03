import { ReactNode } from "react"
import { ButtonNavigate } from "../atom/button"

interface NavItemProps {
  icon: ReactNode
  label: string
  active?: boolean
  onClick?: () => void
}

export function NavItem({ icon, label, active, onClick }: NavItemProps) {
  return (
    <ButtonNavigate
      onClick={onClick}
      className={`justify-start ${
        active ? "bg-zinc-800 font-semibold" : ""
      }`}
    >
      {icon}
      <span>{label}</span>
    </ButtonNavigate>
  )
}
