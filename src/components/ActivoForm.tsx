import React from 'react';
import { agregarActivo, guardarEdicion } from '../services/activoService';
import '../styles/ActivoForm.css';

export interface Activo {
  fechaIngreso: string;
  marca: string;
  modelo: string;
  serie: string;
  ordenCompra: string;
}

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
    event.preventDefault();

    if (editar) {
      const nuevosActivos = guardarEdicion(activos, indiceEditar, activo);
      setActivos(nuevosActivos);
    } else {
      const nuevosActivos = agregarActivo(activos, activo);
      setActivos(nuevosActivos);
    }

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
    <div className="form-container">
      <h2 className="text-2xl font-bold mb-4 text-center">{editar ? 'Editar Activo' : 'Nuevo Activo'}</h2>
      <form onSubmit={handleSubmit} className="form-row">
        <div className="form-group">
          <label htmlFor="fechaIngreso">Fecha de Ingreso</label>
          <input
            id="fechaIngreso"
            type="date"
            value={activo.fechaIngreso}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="marca">Marca</label>
          <input
            id="marca"
            type="text"
            value={activo.marca}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="modelo">Modelo</label>
          <input
            id="modelo"
            type="text"
            value={activo.modelo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="serie">Serie</label>
          <input
            id="serie"
            type="text"
            value={activo.serie}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ordenCompra">Orden de Compra</label>
          <input
            id="ordenCompra"
            type="text"
            value={activo.ordenCompra}
            onChange={handleChange}
          />
        </div>
        <button type="submit">
          {editar ? 'Guardar Edición' : 'Agregar Activo'}
        </button>
      </form>
    </div>
  );
};

export default ActivoForm;
