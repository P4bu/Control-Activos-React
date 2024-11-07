// src/components/ActivohtmlForm.tsx
import React from 'react';
import { Activo, agregarActivo, guardarEdicion } from '../services/activoService';
import '../styles/ActivoForm.css'

interface ActivohtmlFormProps {
  activo: Activo;
  setActivo: React.Dispatch<React.SetStateAction<Activo>>;
  editar: boolean;
  setEditar: React.Dispatch<React.SetStateAction<boolean>>;
  indiceEditar: number;
  setIndiceEditar: React.Dispatch<React.SetStateAction<number>>;
  activos: Activo[];
  setActivos: React.Dispatch<React.SetStateAction<Activo[]>>;
}

const ActivoForm: React.FC<ActivohtmlFormProps> = ({
  activo,
  setActivo,
  editar,
  setEditar,
  indiceEditar,
  setIndiceEditar,
  activos,
  setActivos,
}) => {
  // Lógica para manejar el htmlFormulario y las interacciones
  const handleSubmit = () => {
    if (editar) {
      // Llamamos a la función guardarEdicion para actualizar el activo
      const nuevosActivos = guardarEdicion(activos, indiceEditar, activo);
      setActivos(nuevosActivos);
    } else {
      // Llamamos a la función agregarActivo para agregar el nuevo activo
      const nuevosActivos = agregarActivo(activos, activo);
      setActivos(nuevosActivos);
    }

    // Restablecer el htmlFormulario
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

  return (
    <div>
      {/* htmlFormulario de ingresi */}
      <h2 className="text-2xl font-bold mb-2">Nuevo Activo</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="fechaIngreso">
          Fecha de Ingreso
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fechaIngreso" type="date" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="marca">
          Marca
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="marca" type="text" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="modelo">
          Modelo
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="modelo" type="text" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="serie">
          Serie
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="serie" type="text" />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="ordenCompra">
          Orden de Compra
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="ordenCompra" type="text" />
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
        {editar ? 'Guardar Edición' : 'Agregar Activo'}
      </button>
    </div>
  );
};

export default ActivoForm;
