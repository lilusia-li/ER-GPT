import DatasetPanel from "./DatasetPanel";
// import Documents from "./Documents";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const Dataset = () => {
  return (
    <>
      <SidebarProvider>
        <DatasetPanel></DatasetPanel>
      </SidebarProvider>

      {/* <Documents></Documents> */}
    </>
  );
};
export default Dataset;
