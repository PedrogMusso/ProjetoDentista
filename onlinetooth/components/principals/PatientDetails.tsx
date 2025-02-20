"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PatientTreatmentsPage from "./PatientTreatment";
import PatientFormsPage from "./patientForms";

// Exemplo de interface (caso esteja usando TypeScript)
interface Patient {
  id: number;
  name: string;
  phone: string;
  cpf: string;
  email: string;
  plan: string;
}

interface PatientDetailsProps {
  // Paciente a ser exibido. Se não passar, usamos um mock de exemplo.
  patient?: Patient;
  // Função que será chamada ao clicar no botão "Voltar"
  onBack?: () => void;
}

// Mock de dados do paciente (caso não receba via props)
const mockPatientData: Patient = {
  id: 1,
  name: "Paciente teste",
  phone: "+55 21 99565 7993",
  cpf: "000.000.000-00",
  email: "paciente@teste.com",
  plan: "Particular",
};

export default function PatientDetails({
  patient,
  onBack,
}: PatientDetailsProps) {
  // Se não receber "patient" via props, usamos o mock
  const currentPatient = patient ?? mockPatientData;

  return (
    <div className="flex flex-col w-full h-full p-6">
      {/* Botão de Voltar (opcional) */}
      {onBack && (
        <button
          onClick={onBack}
          className="bg-teal-300 text-gray-700 px-4 py-2 rounded mb-4 w-fit"
        >
          Voltar
        </button>
      )}

      {/* Cabeçalho com dados principais do paciente */}
      <div className="bg-white rounded shadow p-4 flex flex-col gap-1">
        <h1 className="text-2xl font-bold">{currentPatient.name}</h1>
        <div className="text-gray-600">
          {currentPatient.phone} | CPF: {currentPatient.cpf}
        </div>
        <div className="text-gray-600">
          E-mail: {currentPatient.email} | Plano: {currentPatient.plan}
        </div>
      </div>

      {/* Abas principais (o defaultValue="resumo" garante que abra no Resumo) */}
      <div className="mt-4 bg-white rounded shadow p-4 flex flex-1">
        <Tabs defaultValue="resumo" className="w-full h-full flex flex-col">
          <TabsList className="mb-4">
            <TabsTrigger value="resumo">Resumo</TabsTrigger>
            <TabsTrigger value="tratamentos">Tratamentos</TabsTrigger>
            <TabsTrigger value="anamnese">Anamnese</TabsTrigger>
          </TabsList>

          {/* ABA: RESUMO */}
          <TabsContent value="resumo" className="flex flex-col gap-4">
            {/* Layout em colunas/cards */}
            <div className="grid grid-cols-12 gap-4 w-full">
              {/* Coluna 1 (4 colunas em telas md+) */}
              <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
                {/* Card de dados pessoais */}
                <div className="bg-gray-50 rounded p-4 shadow">
                  <h2 className="text-lg font-semibold mb-2">Dados pessoais</h2>
                  <p>
                    <strong>Nome:</strong> {currentPatient.name}
                  </p>
                  <p>
                    <strong>Telefone:</strong> {currentPatient.phone}
                  </p>
                  <p>
                    <strong>E-mail:</strong> {currentPatient.email}
                  </p>
                  <p>
                    <strong>Plano:</strong> {currentPatient.plan}
                  </p>
                </div>

                {/* Card de comunicação */}
                <div className="bg-gray-50 rounded p-4 shadow">
                  <h3 className="text-md font-semibold mb-2">Comunicação</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span>Permitir envio de e-mails:</span>
                    <input type="checkbox" />
                  </div>
                </div>
              </div>

              {/* Coluna 2 (8 colunas em telas md+) */}
              <div className="col-span-12 md:col-span-8 flex flex-col gap-4">
                {/* Card de Consultas */}
                <div className="bg-gray-50 rounded p-4 shadow">
                  <h2 className="text-lg font-semibold mb-2">Consultas</h2>
                  <div className="text-sm text-gray-600">
                    <p>14/02/2023 - Agendada - 10:00</p>
                    <p>15/03/2023 - Pendente - 09:30</p>
                  </div>
                </div>

                {/* Card de Mensagens */}
                <div className="bg-gray-50 rounded p-4 shadow flex flex-col gap-2">
                  <h2 className="text-lg font-semibold mb-2">Mensagens</h2>
                  <div className="border border-gray-200 p-2 rounded text-sm">
                    <p>
                      O paciente agendou a consulta somente para o mês seguinte.
                      É importante verificar se ele já fez os exames...
                    </p>
                  </div>
                  <textarea
                    className="border rounded p-2 w-full mt-2"
                    placeholder="Escreva uma nova mensagem..."
                  />
                  <button className="bg-teal-300 text-white px-4 py-2 rounded self-end">
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Outras abas (placeholders) */}
          <TabsContent value="tratamentos">
            <PatientTreatmentsPage patient={currentPatient} />
          </TabsContent>
          <TabsContent value="anamnese">
            <PatientFormsPage />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
