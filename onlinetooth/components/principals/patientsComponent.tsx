"use client";
import PatientDetails from "./PatientDetails";
import React, {useState} from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface Patient {
  id: number;
  name: string;
  phone: string;
  cpf: string,
  email: string,
  plan: string,
  // ...
}

export default function PatientsComponents() {
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    patientName: "",
    sex: "", // "M" ou "F"
    isForeign: false,
    birthDate: "",
    cpf: "",
    rg: "",
    phone: "",
    arrival: "",
    tags: "",
    responsibleName: "",
    responsibleBirthDate: "",
    responsibleCPF: "",
    responsiblePhone: "",
    observation: "",
    email: "",
    secondaryPhone: "",
    medicalRecord: "",
    plan: "",
    address: "",
  });

  const patientsData: Patient[] = [
    { id: 1, name: "Paciente teste 1", phone: "+55 21 99565 7993", cpf: "", email:"", plan:"" },
    { id: 2, name: "Paciente teste 2", phone: "+55 21 99565 7993", cpf: "", email:"", plan:""  },
    // ...
  ];

  const handleOpenDetails = (id: number) => {
    setSelectedPatientId(id);
  };
  // Funções para atualizar o estado
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Para radio button de sexo
  const handleSexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, sex: e.target.value }));
  };

  // Para selects customizados (caso use seu componente de Select)
  const handleArrivalChange = (value: string) => {
    setFormData((prev) => ({ ...prev, arrival: value }));
  };

  // Submissão do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você envia formData para API ou processa de outra forma
    console.log("Dados do paciente:", formData);
  };

  const renderNewPatient = () => {
    return(
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Adicionar Paciente</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Cadastro de Paciente</DialogTitle>
          <DialogDescription>
            Preencha os dados do paciente e clique em Salvar quando finalizar.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1) DADOS DO PACIENTE */}
          <div className="border-b pb-4">
            <h2 className="text-lg font-semibold mb-4">Dados do paciente</h2>

            {/* Nome do paciente */}
            <div className="mb-3">
              <Label htmlFor="patientName">Nome do paciente</Label>
              <Input
                id="patientName"
                value={formData.patientName}
                onChange={handleChange}
                placeholder="Digite o nome do paciente"
              />
            </div>

            {/* Sexo */}
            <div className="mb-3 flex items-center gap-4">
              <Label>Sexo</Label>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="sex"
                    value="M"
                    checked={formData.sex === "M"}
                    onChange={handleSexChange}
/>
                  Masculino
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="sex"
                    value="F"
                    checked={formData.sex === "F"}
                    onChange={handleSexChange}
                  />
                  Feminino
                </label>
              </div>
            </div>

            {/* Paciente estrangeiro */}
            <div className="mb-3 flex items-center gap-2">
              <Checkbox
                id="isForeign"
                checked={formData.isForeign}
                onCheckedChange={(checked) => {
                  setFormData((prev) => ({ ...prev, isForeign: !!checked }));
                }}
              />
              <Label htmlFor="isForeign">Paciente estrangeiro</Label>
            </div>

            {/* Linha de 4 campos: Data de nascimento, CPF, RG, Celular */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="birthDate">Data de nascimento</Label>
                <Input
                  type="date"
                  id="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                />
              </div>
              <div>
                <Label htmlFor="rg">RG</Label>
                <Input
                  id="rg"
                  value={formData.rg}
                  onChange={handleChange}
                  placeholder="RG"
                />
              </div>
              <div>
                <Label htmlFor="phone">Celular do paciente</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+55 21 99999-9999"
                />
              </div>
            </div>

            {/* Como o paciente chegou na clínica */}
            <div className="my-3">
              <Label>Como o paciente chegou na clínica</Label>
              {/* Exemplo usando seu componente de Select (caso não tenha, use <select>) */}
              <Select value={formData.arrival} onValueChange={handleArrivalChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Indicação">Indicação</SelectItem>
                  <SelectItem value="Redes Sociais">Redes Sociais</SelectItem>
                  <SelectItem value="Google">Google</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Etiquetas */}
            <div className="my-3">
              <Label htmlFor="tags">Etiquetas</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Ex: VIP, Primeiro atendimento..."
              />
            </div>
          </div>

          {/* 2) DADOS DO RESPONSÁVEL */}
          <div className="border-b pb-4">
            <h2 className="text-lg font-semibold mb-4">Dados do responsável</h2>
            {/* Nome do responsável, Data nascimento, CPF, Telefone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="responsibleName">Nome do responsável</Label>
                <Input
                  id="responsibleName"
                  value={formData.responsibleName}
                  onChange={handleChange}
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <Label htmlFor="responsibleBirthDate">Data de nascimento</Label>
                <Input
                  type="date"
                  id="responsibleBirthDate"
                  value={formData.responsibleBirthDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="responsibleCPF">CPF</Label>
                <Input
                  id="responsibleCPF"
                  value={formData.responsibleCPF}
                  onChange={handleChange}
                  placeholder="000.000.000-00"
                />
              </div>
              <div>
                <Label htmlFor="responsiblePhone">Celular do responsável</Label>
                <Input
                  id="responsiblePhone"
                  value={formData.responsiblePhone}
                  onChange={handleChange}
                  placeholder="+55 21 99999-9999"
                />
              </div>
            </div>

            {/* Observação */}
            <div className="mt-3">
              <Label htmlFor="observation">Observação</Label>
              <Textarea
                id="observation"
                value={formData.observation}
                onChange={handleChange}
                placeholder="Ex: Informações extras sobre o responsável ou relação com o paciente..."
              />
            </div>
          </div>

          {/* 3) INFORMAÇÕES ADICIONAIS / PLANO / ENDEREÇO */}
          <div className="border-b pb-4">
            <h2 className="text-lg font-semibold mb-4">Informações adicionais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* E-mail */}
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="exemplo@email.com"
                />
              </div>

              {/* Telefone secundário */}
              <div>
                <Label htmlFor="secondaryPhone">Telefone</Label>
                <Input
                  id="secondaryPhone"
                  value={formData.secondaryPhone}
                  onChange={handleChange}
                  placeholder="+55 21 88888-8888"
                />
              </div>

              {/* Número de prontuário */}
              <div>
                <Label htmlFor="medicalRecord">Número de prontuário</Label>
                <Input
                  id="medicalRecord"
                  value={formData.medicalRecord}
                  onChange={handleChange}
                  placeholder="Ex: 12345"
                />
              </div>

              {/* Plano */}
              <div>
                <Label htmlFor="plan">Plano</Label>
                <Input
                  id="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  placeholder="Ex: Particular, Convênio X..."
                />
              </div>

              {/* Endereço */}
              <div className="md:col-span-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Rua, Número, Complemento, Bairro, Cidade..."
                />
              </div>
            </div>
          </div>

          {/* BOTÕES (rodapé) */}
          <DialogFooter>
            {/* Botão "Fechar" sem salvar */}
            <DialogClose asChild>
              <Button variant="outline">Fechar</Button>
            </DialogClose>
            {/* Botão "Salvar" que envia o form */}
            <DialogClose asChild>
              <Button type="submit">Salvar</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    )
  }

  const selectedPatient = patientsData.find((p) => p.id === selectedPatientId);

  return (
    <div className="p-6 bg-gray-100 w-[90vw] h-full">
      {/* Se NÃO tem paciente selecionado, mostre a LISTA */}
      {!selectedPatientId && (
        <div className="bg-white p-4 rounded shadow w-full">
          <div className="flex flex-row justify-between">
          <h2 className="text-xl mb-4">Lista de Pacientes</h2>
          
          {renderNewPatient()}
          </div>
          {patientsData.map((patient) => (
            <div key={patient.id} className="flex justify-between mb-2">
              <span>{patient.name}</span>
              <button
                className="bg-teal-300 text-white px-3 py-1 rounded"
                onClick={() => handleOpenDetails(patient.id)}
              >
                Ver detalhes
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Se TEM paciente selecionado, mostre o componente de detalhes */}
      {selectedPatientId && selectedPatient && (
        <PatientDetails
          patient={selectedPatient}
          onBack={() => setSelectedPatientId(null)} 
        />
      )}
    </div>
  );
}
