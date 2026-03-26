import DatasetSidebar from "./DatasetSidebar";
import Documents from "./Documents";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

const Dataset = () => {
  return (
    <>
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
    </>
  );
};
export default Dataset;
