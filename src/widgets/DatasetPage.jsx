import DatasetSidebar from "./DatasetSidebar";
import Documents from "./Documents";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/api/client";

const DatasetPage = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SidebarProvider>
            <div className="flex w-full">
              <DatasetSidebar></DatasetSidebar>
              <main className="flex w-full">
                <Documents></Documents>
              </main>
            </div>
          </SidebarProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </>
  );
};
export default DatasetPage;
