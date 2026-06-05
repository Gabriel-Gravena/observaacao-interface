"use client"

import {
  AlertTriangle,
  FolderCog,
  Gauge,
  Inbox,
  LogOut,
  Moon,
  Menu,
  Plus,
  Search,
  ShieldCheck,
  Sun,
  UserCircle,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

import type { UserRole } from "@/api/types"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useAuth } from "@/hooks/use-auth"
import { useTheme } from "@/hooks/use-theme"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { routes } from "@/lib/routes"
import { cn } from "@/lib/utils"

interface NavigationItem {
  href: string
  label: string
  icon: LucideIcon
}

const navigation: Record<UserRole, NavigationItem[]> = {
  CIDADAO: [
    { href: routes.citizenRequests, label: "Minhas solicitacoes", icon: Inbox },
    { href: routes.citizenNewRequest, label: "Abrir solicitacao", icon: Plus },
    { href: routes.citizenProtocolSearch, label: "Consultar protocolo", icon: Search },
  ],
  SERVIDOR: [
    { href: routes.serverDashboard, label: "Dashboard", icon: Gauge },
    { href: routes.serverQueue, label: "Fila de atendimento", icon: Inbox },
    { href: routes.serverOverdue, label: "Demandas atrasadas", icon: AlertTriangle },
    { href: routes.serverCategories, label: "Categorias", icon: FolderCog },
  ],
}

export function AppShell({
  role,
  children,
}: {
  role: UserRole
  children: React.ReactNode
}) {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)

  async function handleSignOut() {
    setIsSigningOut(true)
    try {
      await signOut()
      router.replace(routes.login)
    } finally {
      setIsSigningOut(false)
    }
  }

  const navContent = (
    <nav className="space-y-1" aria-label="Navegacao principal">
      {navigation[role].map((item) => (
        <NavigationLink
          key={item.href}
          item={item}
          active={
            pathname === item.href ||
            (item.href !== routes.serverDashboard &&
              pathname.startsWith(`${item.href}/`))
          }
          onClick={() => setMenuOpen(false)}
        />
      ))}
    </nav>
  )

  return (
    <div className="min-h-screen bg-transparent lg:grid lg:grid-cols-[17rem_1fr]">
      <aside className="fixed inset-y-0 left-0 hidden w-68 flex-col border-r bg-sidebar/96 shadow-sm backdrop-blur lg:flex">
        <Brand />
        <div className="flex-1 px-3 py-6">
          <p className="mb-3 px-3 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Menu principal</p>
          {navContent}
        </div>
        <UserPanel
          name={user?.name}
          role={role}
          isSigningOut={isSigningOut}
          onSignOut={handleSignOut}
        />
      </aside>

      <div className="min-w-0 lg:col-start-2">
        <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-card/90 px-4 shadow-sm backdrop-blur lg:hidden">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Abrir navegacao">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[18rem] p-0">
              <SheetHeader className="border-b p-4 text-left">
                <SheetTitle>
                  <Brand />
                </SheetTitle>
                <SheetDescription>Navegacao da sua area</SheetDescription>
              </SheetHeader>
              <div className="flex-1 px-3 py-5">{navContent}</div>
              <UserPanel
                name={user?.name}
                role={role}
                isSigningOut={isSigningOut}
                onSignOut={handleSignOut}
              />
            </SheetContent>
          </Sheet>
          <div className="ml-3">
            <Brand />
          </div>
        </header>
        <main className="mx-auto max-w-[90rem] px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  )
}

function Brand() {
  return (
    <Link href={routes.home} className="flex h-16 items-center gap-3 border-b px-4 font-semibold">
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/25">
        <ShieldCheck className="size-4" aria-hidden="true" />
      </span>
      <span><span className="block leading-none">ObservaAcao</span><span className="mt-1 block text-[0.65rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">Gestao municipal</span></span>
    </Link>
  )
}

function NavigationLink({
  item,
  active,
  onClick,
}: {
  item: NavigationItem
  active: boolean
  onClick: () => void
}) {
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
          : "text-sidebar-foreground/70 hover:translate-x-0.5 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground"
      )}
    >
      <Icon className={cn("size-4 transition-colors", active ? "text-primary" : "text-muted-foreground group-hover:text-primary")} aria-hidden="true" />
      {item.label}
    </Link>
  )
}

function UserPanel({
  name,
  role,
  isSigningOut,
  onSignOut,
}: {
  name?: string
  role: UserRole
  isSigningOut: boolean
  onSignOut: () => void
}) {
  const { theme, toggleTheme } = useTheme()
  return (
    <div className="border-t bg-muted/25 p-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-auto w-full justify-start gap-3 p-2 text-left hover:bg-card">
            <span className="flex size-10 items-center justify-center rounded-full border bg-card text-primary shadow-sm"><UserCircle /></span>
            <span className="min-w-0"><span className="block truncate text-sm font-medium">{name}</span><span className="block text-xs text-muted-foreground">{role === "CIDADAO" ? "Cidadao" : "Servidor municipal"}</span></span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align="start">
          <DropdownMenuLabel>Preferencias</DropdownMenuLabel>
          <DropdownMenuItem onSelect={toggleTheme}>{theme === "light" ? <Moon /> : <Sun />}{theme === "light" ? "Usar tema escuro" : "Usar tema claro"}</DropdownMenuItem>
          <DropdownMenuSeparator className="my-1 h-px bg-border" />
          <DropdownMenuItem onSelect={onSignOut} disabled={isSigningOut}><LogOut />{isSigningOut ? "Saindo..." : "Sair"}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
