import {
  FileText,
  Settings2,
  LucideTarget,
  Pencil,
  Trash2,
  Ellipsis,
} from "lucide-react";
import {
  useSidebar,
  Sidebar,
  SidebarContent,
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
        <SidebarTrigger className="absolute top-[8rem] right-0 translate-x-[50%] z-10" />
        <SidebarHeader className="min-h-[11.4rem] p-[0.5rem] pt-[1rem]">
          <div
            className={cn(
              "flex min-h-[5rem] ",
              state === "collapsed" ? "flex-col" : ""
            )}
          >
            <a href="/" className="mb-1">
              <FileText
                className={cn(
                  "transition-all duration-300",
                  state === "collapsed" ? "w-8 h-8" : "w-10 h-10"
                )}
              />
            </a>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="max-w-8 w-full ml-auto">
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={`w-42.5`}>
                <DropdownMenuItem>
                  <Button variant="ghost" className="flex gap-3">
                    <Pencil />
                    Редактировать
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button variant="ghost" className="flex gap-3">
                    <Trash2 /> Удалить
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div
            className={cn(
              "transition-all duration-300 overflow-hidden pl-2 pb-2 gap-1 flex flex-col",
              state === "collapsed"
                ? "opacity-0 max-h-0"
                : "opacity-100 max-h-40"
            )}
          >
            <h1 className="text-[0.875rem] whitespace-nowrap">{datasetName}</h1>
            <p className="text-[0.75rem] whitespace-nowrap">
              Useful for when you want to answer <br /> queries about the
              {datasetName}
            </p>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroupLabel className="sr-only">Навигация</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2 ">
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
        </SidebarContent>
        {/* <SidebarFooter></SidebarFooter> */}
      </Sidebar>
    </>
  );
};
export default DatasetSidebar;
