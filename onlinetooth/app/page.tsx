"use client"

import CalendarComponent from "@/components/principals/calendarComponent";
import PatientsComponents from "@/components/principals/patientsComponent";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


export default function Home() {


  return (
<div className="flex flex-col w-screen h-screen">
            <Tabs defaultValue="agenda" className="flex flex-row h-full w-full">
                {/* Menu lateral */}
                <TabsList className="flex justify-center space-y-5 h-full flex-col w-[7vw]">
                    <TabsTrigger className="flex p-2 hover:bg-slate-200" value="agenda">Agenda</TabsTrigger>
                    <TabsTrigger className="flex p-2 hover:bg-slate-200" value="pacientes">Pacientes</TabsTrigger>
                </TabsList>

                {/* Conteúdo das abas */}
                <div className="flex-1 flex w-full h-full justify-center items-center">
                    <TabsContent className="flex w-full h-full flex-1" value="agenda">
                      <CalendarComponent/>
                    </TabsContent>
                    <TabsContent className="flex w-full h-full flex-1" value="pacientes">
                        <PatientsComponents />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
  );
}
