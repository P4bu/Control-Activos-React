import React, { useState, useEffect } from 'react';
import { Activo, agregarActivo, guardarEdicion } from '../services/activoService';
import '../styles/ActivoForm.css';

interface ActivoFormProps {
  activo: Activo;
  setActivo: React.Dispatch<React.SetStateAction<Activo>>;
  editar: boolean;
  setEditar: React.Dispatch<React.SetStateAction<boolean>>;
  indiceEditar: number;
  setIndiceEditar: React.Dispatch<React.SetStateAction<number>>;
  activos: Activo[];
  setActivos: React.Dispatch<React.SetStateAction<Activo[]>>;
}

const ActivoForm: React.FC<ActivoFormProps> = ({
  activo,
  setActivo,
  editar,
  setEditar,
  indiceEditar,
  setIndiceEditar,
  activos,
  setActivos,
}) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario

    if (editar) {
      const nuevosActivos = guardarEdicion(activos, indiceEditar, activo);
      setActivos(nuevosActivos);
    } else {
      const nuevosActivos = agregarActivo(activos, activo);
      setActivos(nuevosActivos);
    }

    // Restablecer el formulario
    setActivo({
      fechaIngreso: '',
      marca: '',
      modelo: '',
      serie: '',
      ordenCompra: '',
    });
    setEditar(false);
    setIndiceEditar(-1);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setActivo(prevActivo => ({
      ...prevActivo,
      [id]: value,
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{editar ? 'Editar Activo' : 'Nuevo Activo'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="fechaIngreso">
            Fecha de Ingreso
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fechaIngreso"
            type="date"
            value={activo.fechaIngreso}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="marca">
            Marca
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="marca"
            type="text"
            value={activo.marca}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="modelo">
            Modelo
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="modelo"
            type="text"
            value={activo.modelo}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="serie">
            Serie
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="serie"
            type="text"
            value={activo.serie}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="ordenCompra">
            Orden de Compra
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="ordenCompra"
            type="text"
            value={activo.ordenCompra}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {editar ? 'Guardar Edición' : 'Agregar Activo'}
        </button>
      </form>
    </div>
  );
};

export default ActivoForm;
