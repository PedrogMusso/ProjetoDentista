"use client";
import React from "react";
import { Avatar } from "../ui/avatar";

export default function PatientTreatmentsPage() {
  return (
    <div className="flex flex-col w-full h-full p-6 bg-gray-100">
      {/* Cabeçalho superior: foto, nome, botões de ação */}
      <div className="flex items-center justify-between bg-white p-4 rounded shadow">
        <div className="flex items-center gap-4">
          {/* Foto do paciente (placeholder) */}
            <Avatar></Avatar>
          <div>
            <h1 className="text-xl font-bold">Paciente teste</h1>
            <p className="text-gray-600">+55 21 99565 7993 - CPF: 000.000.000-00</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-teal-300 text-white px-4 py-2 rounded">
            Editar
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">
            Analisar score
          </button>
        </div>
      </div>

      {/* Abas do paciente (com "Tratamentos" como default, mas você pode mudar) */}
      <div className="mt-4 bg-white rounded shadow p-4 flex-1">
        <div defaultValue="tratamentos" className="w-full h-full flex flex-col">

            {/* Layout principal dividido em 2 partes: Esquerda (Adicionar tratamento, Odontograma, etc.) e Direita (Evoluções) */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Parte Esquerda */}
              <div className="flex-1 flex flex-col gap-4">
                {/* Card "Adicionar tratamento" */}
                <div className="bg-gray-50 p-4 rounded shadow">
                  <h2 className="text-lg font-semibold mb-2">Adicionar tratamento</h2>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex flex-col">
                      <label className="text-sm font-medium">Plano</label>
                      <select className="border rounded p-2">
                        <option>Particular</option>
                        <option>Convênio</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-medium">Tratamento</label>
                      <select className="border rounded p-2">
                        <option>Tratamento 1</option>
                        <option>Tratamento 2</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-medium">Dentes/Região</label>
                      <input
                        type="text"
                        className="border rounded p-2"
                        placeholder="Ex: 18, 17, 16..."
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm font-medium">Valor</label>
                      <input
                        type="text"
                        className="border rounded p-2"
                        placeholder="R$ 0,00"
                      />
                    </div>
                    <div className="flex items-end">
                      <button className="bg-teal-300 text-white px-4 py-2 rounded">
                        Adicionar
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card "Odontograma" */}
                <div className="bg-gray-50 p-4 rounded shadow flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Odontograma</h2>
                    {/* Botões "Permanentes" e "Decíduos" */}
                    <div className="flex gap-2">
                      <button className="px-3 py-1 rounded bg-blue-500 text-white">
                        Permanentes
                      </button>
                      <button className="px-3 py-1 rounded bg-gray-200 text-gray-700">
                        Decíduos
                      </button>
                    </div>
                  </div>

                  {/* Exemplo de placeholder para o odontograma.
                      Em um sistema real, você pode usar um componente
                      especializado ou SVGs para representar cada dente. */}
                  <div className="grid grid-cols-8 gap-2 text-center text-sm text-gray-700">
                    {Array.from({ length: 32 }).map((_, idx) => (
                      <div key={idx} className="p-2 border rounded">
                        {idx + 1}
                      </div>
                    ))}
                  </div>

                  {/* Legenda de status */}
                  <div className="flex gap-2 mt-2">
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">
                      Aberto
                    </span>
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">
                      Finalizado
                    </span>
                    <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-sm">
                      Anotações
                    </span>
                  </div>
                </div>

                {/* Card "Tratamentos" (lista de tratamentos) */}
                <div className="bg-gray-50 p-4 rounded shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold">Tratamentos</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Mostrar finalizados</span>
                      <input type="checkbox" />
                    </div>
                  </div>
                  {/* Aqui você listaria os tratamentos cadastrados. */}
                  <p className="text-gray-600 text-sm">
                    Nenhum tratamento cadastrado.
                  </p>
                </div>
              </div>

              {/* Parte Direita: Evoluções */}
              <div className="lg:w-1/4 bg-gray-50 p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-2">Evoluções</h2>
                <p className="text-gray-600 text-sm mb-2">
                  O paciente não possui evoluções
                </p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Adicionar Evolução
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
