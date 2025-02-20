"use client";

import CalendarComponent from "@/components/principals/calendarComponent";
import PatientsComponents from "@/components/principals/patientsComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <Tabs
        defaultValue="agenda"
        className="flex flex-col big:flex-row flex-1 w-full h-full"
      >
        {/* Menu lateral */}
        <TabsList className="flex flex-row big:flex-col justify-center items-center w-full big:w-[7vw] h-[7vh] big:h-full space-x-3 big:space-y-5 border-r">
          <TabsTrigger
            className="flex p-2 hover:bg-slate-200 justify-center items-center"
            value="agenda"
          >
            Agenda
          </TabsTrigger>
          <TabsTrigger
            className="flex p-2 hover:bg-slate-200 justify-center items-center"
            value="pacientes"
          >
            Pacientes
          </TabsTrigger>
        </TabsList>

        {/* Conteúdo das abas (lado direito) */}
        <div className="flex-1 flex w-full h-full p-2">
          <TabsContent value="agenda">
            <CalendarComponent />
          </TabsContent>

          <TabsContent value="pacientes">
            <PatientsComponents />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
