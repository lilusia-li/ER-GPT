import DatasetSidebar from "./DatasetSidebar";
import Documents from "./Documents";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/api/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
};
export default DatasetPage;
