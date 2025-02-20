"use client";
import React, { useState } from "react";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface PatientTreatmentPageProps {
  // defina aqui as propriedades que infos deve ter
  readonly patient: {
    readonly name: string;
    readonly cpf: string;
    readonly plan: string;
    readonly phone: string;
  };
}

export default function PatientTreatmentsPage(
  infos: PatientTreatmentPageProps
) {
  const [formData, setFormData] = useState({
    profissional: "",
    data: "",
    evolucao: "",
    imagens: null as FileList | null,
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id } = event.target;

    // Se for um <input> e tiver 'files', atualiza com files
    if (
      event.target instanceof HTMLInputElement &&
      event.target.type === "file"
    ) {
      setFormData((prev) => ({
        ...prev,
        [id]: event.target.files,
      }));
    } else {
      // Senão, assume que é <input type="text"> ou <textarea>, e usa .value
      setFormData((prev) => ({
        ...prev,
        [id]: event.target.value,
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Lógica para salvar evolução...
    console.log("Dados do formulário:", formData);
    // Fechar o dialog ou limpar o formulário...
  };

  const renderEvolutionForm = () => {
    return (
      <div className="w-full lg:w-1/4 flex flex-col bg-gray-50 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Evoluções</h2>
        <p className="text-gray-600 text-sm mb-2">
          O paciente não possui evoluções
        </p>

        {/* Dialog de Adicionar Evolução */}
        <Dialog>
          <DialogTrigger asChild>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Adicionar Evolução
            </button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Adicionar Evolução Odontológica</DialogTitle>
              <DialogDescription>
                Preencha os dados da evolução do paciente.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="profissional" className="text-right">
                  Profissional
                </label>
                <Input
                  id="profissional"
                  value={formData.profissional}
                  onChange={handleChange}
                  className="col-span-3"
                  placeholder="Ex: Dr. Pedro..."
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="data" className="text-right">
                  Data
                </label>
                <Input
                  type="date"
                  id="data"
                  value={formData.data}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="evolucao" className="text-right">
                  Evolução
                </label>
                <Textarea
                  id="evolucao"
                  value={formData.evolucao}
                  onChange={handleChange}
                  className="col-span-3"
                  placeholder="Digite a evolução aqui..."
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="imagens" className="text-right">
                  Imagens
                </label>
                <Input
                  type="file"
                  id="imagens"
                  multiple
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>

              <DialogFooter>
                <DialogClose
                  className="flex p-2 rounded-md bg-teal-300"
                  type="submit"
                >
                  Salvar Evolução
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-full p-4 md:p-6 bg-gray-100">
      {/* Cabeçalho superior: foto, nome, botões de ação */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-4 rounded shadow gap-4">
        <div className="flex items-center gap-4">
          {/* Foto do paciente (placeholder) */}
          <Avatar />
          <div>
            <h1 className="text-xl font-bold">{infos.patient.name}</h1>
            <p className="text-gray-600">
              {infos.patient.phone} - CPF: {infos.patient.cpf}
            </p>
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
      <div className="mt-4 bg-white rounded shadow p-4 flex w-full flex-1">
        <div className="w-full flex flex-col">
          {/* Layout principal dividido em 2 partes: Esquerda (Adicionar tratamento, Odontograma, etc.) e Direita (Evoluções) */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Parte Esquerda */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Card "Adicionar tratamento" */}
              <div className="bg-gray-50 p-4 rounded shadow w-full">
                <h2 className="text-lg font-semibold mb-2">
                  Adicionar tratamento
                </h2>
                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-col w-full sm:w-auto">
                    <label className="text-sm font-medium">Plano</label>
                    <select className="border rounded p-2">
                      <option>Particular</option>
                      <option>Convênio</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-full sm:w-auto">
                    <label className="text-sm font-medium">Tratamento</label>
                    <select className="border rounded p-2">
                      <option>Tratamento 1</option>
                      <option>Tratamento 2</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-full sm:w-auto">
                    <label className="text-sm font-medium">Dentes/Região</label>
                    <input
                      type="text"
                      className="border rounded p-2"
                      placeholder="Ex: 18, 17, 16..."
                    />
                  </div>
                  <div className="flex flex-col w-full sm:w-auto">
                    <label className="text-sm font-medium">Valor</label>
                    <input
                      type="text"
                      className="border rounded p-2"
                      placeholder="R$ 0,00"
                    />
                  </div>
                  <div className="flex items-end w-full sm:w-auto">
                    <button className="bg-teal-300 text-white px-4 py-2 rounded">
                      Adicionar
                    </button>
                  </div>
                </div>
              </div>

              {/* Card "Odontograma" */}
              <div className="bg-gray-50 p-4 rounded shadow flex flex-col gap-4 w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <h2 className="text-lg font-semibold mb-2 sm:mb-0">
                    Odontograma
                  </h2>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded bg-blue-500 text-white">
                      Permanentes
                    </button>
                    <button className="px-3 py-1 rounded bg-gray-200 text-gray-700">
                      Decíduos
                    </button>
                  </div>
                </div>

                {/* Container que permite rolagem horizontal se necessário */}
                <div className="flex flex-col gap-4 text-center text-sm text-gray-700 overflow-x-auto">
                  {/* Linha superior (arcada superior) */}
                  <div className="flex flex-col md:flex-row justify-center gap-4 min-w-[600px]">
                    {/* Bloco 1 (18 a 11) */}
                    <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
                      <Button className="p-4 rounded bg-slate-400">18</Button>
                      <Button className="p-4 rounded bg-slate-400">17</Button>
                      <Button className="p-4 rounded bg-slate-400">16</Button>
                      <Button className="p-4 rounded bg-slate-400">15</Button>
                      <Button className="p-4 rounded bg-slate-400">14</Button>
                      <Button className="p-4 rounded bg-slate-400">13</Button>
                      <Button className="p-4 rounded bg-slate-400">12</Button>
                      <Button className="p-4 rounded bg-slate-400">11</Button>
                    </div>

                    <Separator
                      orientation="vertical"
                      className="hidden md:block"
                    />

                    {/* Bloco 2 (21 a 28) */}
                    <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
                      <Button className="p-4 rounded bg-slate-400">21</Button>
                      <Button className="p-4 rounded bg-slate-400">22</Button>
                      <Button className="p-4 rounded bg-slate-400">23</Button>
                      <Button className="p-4 rounded bg-slate-400">24</Button>
                      <Button className="p-4 rounded bg-slate-400">25</Button>
                      <Button className="p-4 rounded bg-slate-400">26</Button>
                      <Button className="p-4 rounded bg-slate-400">27</Button>
                      <Button className="p-4 rounded bg-slate-400">28</Button>
                    </div>
                  </div>

                  <Separator orientation="horizontal" />

                  {/* Linha inferior (arcada inferior) */}
                  <div className="flex flex-col md:flex-row justify-center gap-4 min-w-[600px]">
                    {/* Bloco 3 (48 a 41) */}
                    <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
                      <Button className="p-4 rounded bg-slate-400">48</Button>
                      <Button className="p-4 rounded bg-slate-400">47</Button>
                      <Button className="p-4 rounded bg-slate-400">46</Button>
                      <Button className="p-4 rounded bg-slate-400">45</Button>
                      <Button className="p-4 rounded bg-slate-400">44</Button>
                      <Button className="p-4 rounded bg-slate-400">43</Button>
                      <Button className="p-4 rounded bg-slate-400">42</Button>
                      <Button className="p-4 rounded bg-slate-400">41</Button>
                    </div>

                    <Separator
                      orientation="vertical"
                      className="hidden md:block"
                    />

                    {/* Bloco 4 (31 a 38) */}
                    <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
                      <Button className="p-4 rounded bg-slate-400">31</Button>
                      <Button className="p-4 rounded bg-slate-400">32</Button>
                      <Button className="p-4 rounded bg-slate-400">33</Button>
                      <Button className="p-4 rounded bg-slate-400">34</Button>
                      <Button className="p-4 rounded bg-slate-400">35</Button>
                      <Button className="p-4 rounded bg-slate-400">36</Button>
                      <Button className="p-4 rounded bg-slate-400">37</Button>
                      <Button className="p-4 rounded bg-slate-400">38</Button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-2 flex-wrap">
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
              <div className="bg-gray-50 p-4 rounded shadow w-full">
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
            {renderEvolutionForm()}
          </div>
        </div>
      </div>
    </div>
  );
}
