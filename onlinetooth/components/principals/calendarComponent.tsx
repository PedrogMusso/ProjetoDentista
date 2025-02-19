"use client"

import { Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'

import "moment/locale/pt-br";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";



export default function CalendarComponent () {
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>("Maria");
  const [formData, setFormData] = useState({
    patientName: "",
    professional: selectedDoctor,
    duration: "30",
    observation: "",
    returnIn: "Sem retorno",
    sendReminder: false,
    label: "",
  });

    moment.locale("pt-br");

    const localizer = momentLocalizer(moment);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value } = e.target;
      setFormData((prev) => ({ ...prev, [id]: value }));
    };
  
    // Para selects personalizados
    const handleSelectChange = (id: string, value: string) => {
      setFormData((prev) => ({ ...prev, [id]: value }));
    };
  
    // Para o switch (ligado/desligado)
    const handleSwitchChange = (checked: boolean) => {
      setFormData((prev) => ({ ...prev, sendReminder: checked }));
    };
  
    // Envio do formulário
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Consulta marcada:", formData);
    };
  
    // 4) Defina as traduções das mensagens usadas pelo react-big-calendar
    const messages = {
      allDay: "Dia inteiro",
      previous: "Anterior",
      next: "Próximo",
      today: "Hoje",
      month: "Mês",
      week: "Semana",
      day: "Dia",
      agenda: "Agenda",
      date: "Data",
      time: "Hora",
      event: "Evento",
      noEventsInRange: "Não há eventos neste intervalo.",
      showMore: (total: number) => `+${total} mais`,
    };

    const allEvents = {
      Maria: [
        {
          title: "Consulta Maria 1",
          start: new Date(new Date().getTime() + 60 * 60000),
          end: new Date(new Date().getTime() + 120 * 60000),
        },
        {
          title: "Consulta Maria 2",
          start: new Date(new Date().getTime() + 180 * 60000),
          end: new Date(new Date().getTime() + 240 * 60000),
        },
      ],
      Joaquim: [
        {
          title: "Consulta Joaquim 1",
          start: new Date(new Date().getTime() - 90 * 60000),
          end: new Date(new Date().getTime() - 30 * 60000),
        },
        {
          title: "Consulta Joaquim 2",
          start: new Date(new Date().getTime() + 60 * 60000),
          end: new Date(new Date().getTime() + 150 * 60000),
        },
      ],
      Liz: [
        {
          title: "Consulta Liz 1",
          start: new Date(new Date().getTime() - 180 * 60000),
          end: new Date(new Date().getTime() - 120 * 60000),
        },
        {
          title: "Consulta Liz 2",
          start: new Date(new Date().getTime() + 90 * 60000),
          end: new Date(new Date().getTime() + 180 * 60000),
        },
      ],
    };

      // Filtra os eventos com base no médico selecionado
  const events = selectedDoctor ? allEvents[selectedDoctor] || [] : [];

  const renderAddEvent = () => {
    return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Marcar Consulta</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Marcar Consulta</DialogTitle>
          <DialogDescription>Preencha os detalhes da consulta e clique em "Marcar".</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Paciente */}
          <div>
            <Label htmlFor="patientName">Paciente *</Label>
            <Input
              id="patientName"
              value={formData.patientName}
              onChange={handleChange}
              placeholder="Nome do paciente"
              required
            />
          </div>

          {/* Profissional */}
          <div>
            <Label htmlFor="professional">Profissional *</Label>
            <Input id="professional" value={formData.professional} disabled />
          </div>

          {/* Duração da consulta */}
          <div>
            <Label htmlFor="duration">Duração da consulta (min) *</Label>
            <Input
              type="number"
              id="duration"
              value={formData.duration}
              onChange={handleChange}
              min="10"
              required
            />
          </div>

          {/* Observação */}
          <div>
            <Label htmlFor="observation">Observação</Label>
            <Textarea
              id="observation"
              value={formData.observation}
              onChange={handleChange}
              placeholder="Adicione detalhes sobre a consulta..."
              maxLength={500}
            />
          </div>

          {/* Enviar lembrete automático */}
          <div className="flex items-center justify-between">
            <Label htmlFor="sendReminder">Enviar confirmação e lembrete automático</Label>
            <Switch id="sendReminder" checked={formData.sendReminder} onCheckedChange={handleSwitchChange} />
          </div>

          {/* Selecionar um rótulo */}
          <div>
            <Label htmlFor="label">Selecione um rótulo</Label>
            <Select onValueChange={(value) => handleSelectChange("label", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Nenhum rótulo selecionado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Consulta inicial">Consulta inicial</SelectItem>
                <SelectItem value="Retorno">Retorno</SelectItem>
                <SelectItem value="Check-up">Check-up</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Botões */}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Fechar</Button>
            </DialogClose>
            <Button type="submit">Marcar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
  }

  useEffect(() => {
    setFormData((prev) => ({ ...prev, professional: selectedDoctor }));
  }, [selectedDoctor]);

    return(
        <div className="flex w-[88vw] h-[88vh] justify-center flex-col space-y-3 px-1">
              <div className='flex flex-row w-full h-fit justify-between'> 
              <Select defaultValue='Maria' onValueChange={(value) => setSelectedDoctor(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Médico" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Maria">Maria</SelectItem>
                  <SelectItem value="Joaquim">Joaquim</SelectItem>
                  <SelectItem value="Liz">Liz</SelectItem>
                </SelectContent>
              </Select>
              {renderAddEvent()}
              </div>
                <Calendar
                    localizer={localizer}
                    startAccessor="start"
                    events={events}
                    endAccessor="end"
                    defaultView="week"
                    messages={messages}
                    className="flex w-full h-full"
                />
        </div>
    )
}