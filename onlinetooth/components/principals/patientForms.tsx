"use client";
import React, {useState} from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface Form {
    id: number;
    name: string;
    // ...
  }

export default function PatientFormsPage() {

    const [formData, setFormData] = useState({
        queixaPrincipal: "",
        historicoMedico: "",
        historicoOdontologico: "",
        alergias: "",
        medicamentos: "",
        observacoes: "",
      });

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aqui você pode processar os dados, salvar via API, etc.
        console.log("Dados da anamnese:", formData);
      };

    const AnalisisForm: Form[] = [
            { id: 1, name: "Anamnese"  },
            // ...
          ];
        
          const renderSelectedForm = () => {
            return (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Nova Anamnese</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px]">
                  <DialogHeader>
                    <DialogTitle>Nova Anamnese</DialogTitle>
                    <DialogDescription>
                      Preencha os dados da anamnese do paciente.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="queixaPrincipal" className="text-right">
                        Queixa Principal
                      </label>
                      <Input
                        id="queixaPrincipal"
                        value={formData.queixaPrincipal}
                        onChange={handleChange}
                        className="col-span-3"
                        placeholder="Ex: Dor, inchaço, etc."
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="historicoMedico" className="text-right">
                        Histórico Médico
                      </label>
                      <Textarea
                        id="historicoMedico"
                        value={formData.historicoMedico}
                        onChange={handleChange}
                        className="col-span-3"
                        placeholder="Descreva o histórico médico do paciente"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="historicoOdontologico" className="text-right">
                        Histórico Odontológico
                      </label>
                      <Textarea
                        id="historicoOdontologico"
                        value={formData.historicoOdontologico}
                        onChange={handleChange}
                        className="col-span-3"
                        placeholder="Descreva o histórico odontológico"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="alergias" className="text-right">
                        Alergias
                      </label>
                      <Input
                        id="alergias"
                        value={formData.alergias}
                        onChange={handleChange}
                        className="col-span-3"
                        placeholder="Ex: Penicilina, látex, etc."
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="medicamentos" className="text-right">
                        Medicamentos
                      </label>
                      <Input
                        id="medicamentos"
                        value={formData.medicamentos}
                        onChange={handleChange}
                        className="col-span-3"
                        placeholder="Medicamentos em uso"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label htmlFor="observacoes" className="text-right">
                        Observações
                      </label>
                      <Textarea
                        id="observacoes"
                        value={formData.observacoes}
                        onChange={handleChange}
                        className="col-span-3"
                        placeholder="Outras informações relevantes"
                      />
                    </div>
                    <DialogFooter>
                        <DialogClose className="flex p-2 rounded-md bg-teal-300" type="submit">
                            Salvar Anamnese
                        </DialogClose>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            );
          };

  return (
    <div className="flex flex-col w-full h-full p-6 bg-gray-100">
      <div className="flex flex-col items-start justify-between bg-white p-4 space-y-5   rounded shadow">
        {renderSelectedForm()}
        {AnalisisForm.map((form) => (
            <div key={form.id} className="flex flex-row w-full justify-between mb-2">
            <span>{form.name}</span>
            <button
              className="bg-teal-300 text-white px-3 py-1 rounded"
            >
              Ver detalhes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
