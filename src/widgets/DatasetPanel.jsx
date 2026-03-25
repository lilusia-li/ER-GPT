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

const DatasetPanel = () => {
  const { state, open } = useSidebar();

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
        <SidebarTrigger className="absolute top-[20%] -right-3.75 bg-sidebar-primary z-10 border-sidebar-primary" />
        <SidebarHeader>
          <div className="flex flex-wrap justify-between">
            <FileText className="h-8 w-8 text-primary" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">...</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className={`w-42.5`}>
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
          {open && (
            <div className=" transition-opacity animate-in duration-500">
              <h1 className="text-[0.875rem]" hidden={state === "collapsed"}>
                {datasetName}
              </h1>
              <p className="text-[0.75rem]" hidden={state === "collapsed"}>
                Useful for when you want to answer queries about the{" "}
                {datasetName}
              </p>
            </div>
          )}
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
                        {open && (
                          <span className="text-[0.8125rem]">{item.title}</span>
                        )}
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
export default DatasetPanel;
