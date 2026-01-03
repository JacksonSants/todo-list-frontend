import { VscGraph } from "react-icons/vsc"
import { Logo } from "../../../core/layout/components/logo"
import { NavItem } from "../molecules/nav-item"
import { BiHomeAlt2 } from "react-icons/bi"
import { ImHeart } from "react-icons/im"
import { PiTextAlignLeftLight } from "react-icons/pi"
import { CiSettings } from "react-icons/ci"
import { FiLogOut } from "react-icons/fi"

export function Sidebar() {
  return (
    <aside className="w-[220px] min-h-screen flex flex-col justify-between p-4">
      
      <div className="space-y-2">
        <Logo />

        <NavItem icon={<VscGraph size={22} />} label="Dashboard" />
        <NavItem icon={<BiHomeAlt2 size={22} />} label="Home" active />
        <NavItem icon={<ImHeart size={22} />} label="Favoritos" />
        <NavItem icon={<PiTextAlignLeftLight size={22} />} label="Histórico" />
        <NavItem icon={<CiSettings size={22} />} label="Configurações" />
      </div>

      <NavItem icon={<FiLogOut size={22} />} label="Sair" />
    </aside>
  )
}
