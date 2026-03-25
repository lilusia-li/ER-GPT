import { QueryClientProvider } from "@tanstack/react-query";
import DatasetPanel from "./DatasetPanel";
import Documents from "./Documents";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "@/api/client";

const Dataset = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <SidebarProvider>
            <div className="flex w-full">
              <DatasetPanel></DatasetPanel>
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
export default Dataset;
