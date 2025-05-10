import React from "react";
import { Home, List, LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const SidebarContent: React.FC<SidebarProps> = ({
  isMobileOpen,
  onMobileClose,
}) => {
  const links = [{ href: "/dashboard", label: "Dashboard", icon: Home }];

  const taskLists = [
    { href: "/dashboard/list/1", label: "Trabajo" },
    { href: "/dashboard/list/2", label: "Personal" },
    { href: "/dashboard/list/3", label: "Estudios" },
  ];

  // Simula una ruta activa para demostración
  const activePath = "/dashboard";

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-semibold">TaskMaster</h1>
        {isMobileOpen && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMobileClose}
            className="md:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-auto">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              activePath === link.href
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </a>
        ))}

        <div className="pt-4">
          <h2 className="px-3 mb-2 text-xs font-semibold tracking-tight text-muted-foreground">
            Mis Listas
          </h2>

          <div className="space-y-1">
            {taskLists.map((list) => (
              <a
                key={list.href}
                href={list.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  activePath === list.href
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <List className="h-4 w-4" />
                {list.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <p className="text-sm font-medium">Usuario Demo</p>
            <p className="text-xs text-muted-foreground">demo@example.com</p>
          </div>

          <Button variant="ghost" size="icon" className="ml-auto">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({
  isMobileOpen,
  onMobileClose,
}) => {
  return (
    <>
      <aside className="hidden md:block w-[280px] border-r h-screen overflow-auto fixed top-0 left-0 bg-background">
        <SidebarContent />
      </aside>

      {isMobileOpen !== undefined && (
        <div className="md:hidden">
          <SidebarContent
            isMobileOpen={isMobileOpen}
            onMobileClose={onMobileClose}
          />
        </div>
      )}
    </>
  );
};

export default SidebarContent;
