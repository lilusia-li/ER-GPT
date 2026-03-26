import {
  FileText,
  Settings2,
  LucideTarget,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  useSidebar,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DatasetSidebar = () => {
  const { state } = useSidebar();

  const navItems = [
    {
      title: "Документы",
      icon: FileText,
      href: "/documents",
      isActive: true,
    },
    {
      title: "Трубопровод",
      icon: FileText,
      href: "/pipeline",
    },
    {
      title: "Тестирование поиска",
      icon: LucideTarget,
      href: "/search-test",
    },
    {
      title: "Настройки",
      icon: Settings2,
      href: "/settings",
    },
  ];
  const datasetName = "При отклике.txt";

  return (
    <>
      <Sidebar variant="sidebar" collapsible="icon">
        <SidebarTrigger className="absolute top-[6rem] -right-[15px] bg-[var(--sidebar-primary)] z-10 border-[var(--sidebar-primary)]" />
        <SidebarHeader className="min-h-[8.13rem]">
          <div className="flex flex-wrap justify-between">
            <FileText className="h-8 w-8 text-primary" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">...</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={`w-[170px]`}>
                <DropdownMenuItem>
                  <Pencil />
                  <Button variant="outline">Редактировать</Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash2 />
                  <Button variant="outline">Удалить</Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div
            className={cn(
              "transition-all duration-300 overflow-hidden",
              state === "collapsed"
                ? "opacity-0 max-h-0"
                : "opacity-100 max-h-40 mt-2"
            )}
          >
            <h1 className="relative text-[0.875rem] whitespace-nowrap">
              {datasetName}
            </h1>
            <p className="relative text-[0.75rem] whitespace-nowrap">
              Useful for when you want to answer <br /> queries about the
              {datasetName}
            </p>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="sr-only">Навигация</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span className="text-[0.8125rem]">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        {/* <SidebarFooter></SidebarFooter> */}
      </Sidebar>
    </>
  );
};
export default DatasetSidebar;
