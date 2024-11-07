import React from 'react';
import { Activo, agregarSalida } from '../services/activoService';
import { Edit, Trash, Plus } from 'lucide-react';

interface ActivoListProps {
  activos: Activo[];
  setActivos: React.Dispatch<React.SetStateAction<Activo[]>>;
}

const ActivoList: React.FC<ActivoListProps> = ({ activos, setActivos }) => {

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-2">Activos</h2>
      <ul>
        {activos.map((activo, indice) => (
          <li key={indice} className="mb-4">
            <div className="flex justify-between">
              <div>
                <p className="text-lg font-bold">{activo.marca} {activo.modelo}</p>
                {/* Mostrar detalles del activo */}
              </div>
              <div>
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
                  <Trash className="w-4 h-4 mr-2" />
                  Eliminar
                </button>
                {!activo.fechaSalida && (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => agregarSalida(activos, indice, '2024-01-01', '12345', 'Juan Pérez')}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Salida
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivoList;
