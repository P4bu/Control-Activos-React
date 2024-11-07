import React, { useState } from 'react';
import { Activo, agregarSalida, eliminarActivo } from '../services/activoService';
import { Edit, Trash, Plus } from 'lucide-react';
import '../styles/ActivoList.css'; // Asegúrate de que el CSS esté disponible

interface ActivoListProps {
  activos: Activo[];
  setActivos: React.Dispatch<React.SetStateAction<Activo[]>>;
}

const ActivoList: React.FC<ActivoListProps> = ({ activos, setActivos }) => {

  // Estado para manejar la visibilidad del popup de agregar salida
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado para manejar la visibilidad del popup de confirmación de eliminación
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activoSeleccionado, setActivoSeleccionado] = useState<number | null>(null);

  // Estado para manejar los datos del formulario del popup
  const [formData, setFormData] = useState({
    asignadoA: '',
     // Ticket auto-generado basado en timestamp
    ticket: `TICKET-${Date.now()}`,
    // Fecha actual
    fechaSalida: new Date().toISOString().split('T')[0], 
  });

  // Función para manejar la eliminación de un activo
  const handleEliminar = () => {
    if (activoSeleccionado !== null) {
      const nuevosActivos = eliminarActivo(activos, activoSeleccionado);
      setActivos(nuevosActivos);
      // Cerrar el modal de eliminación después de eliminar
      setIsDeleteModalOpen(false); 
    }
  };

  // Función para abrir el modal de agregar salida
  const handleAgregarSalida = (indice: number) => {
    setActivoSeleccionado(indice);
    setIsModalOpen(true);
    setFormData({
      asignadoA: '',
      ticket: `TICKET-${Date.now()}`,
      fechaSalida: new Date().toISOString().split('T')[0],
    });
  };

  // Función para cerrar el modal de agregar salida
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Función para manejar la presentación de datos y actualización del activo
  const handleSubmit = () => {
    if (activoSeleccionado !== null) {
      const nuevosActivos = agregarSalida(
        activos,
        activoSeleccionado,
        formData.fechaSalida,
        formData.ticket,
        formData.asignadoA
      );
      setActivos(nuevosActivos);
    }
    // Cerrar el modal después de agregar la salida
    closeModal(); 
  };

  // Función para abrir el modal de confirmación de eliminación
  const openDeleteModal = (indice: number) => {
    setActivoSeleccionado(indice);
    setIsDeleteModalOpen(true);
  };

  // Función para cerrar el modal de confirmación de eliminación
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setActivoSeleccionado(null);
  };

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-2">Activos</h2>
      <ul>
        {activos.map((activo, indice) => (
          <li key={indice} className="mb-4">
            <div className="flex justify-between">
              <div>
                <p className="text-lg font-bold">{activo.marca} {activo.modelo}</p>
                <p className="text-gray-700">Serie: {activo.serie}</p>
                <p className="text-gray-700">Orden de Compra: {activo.ordenCompra}</p>
                <p className="text-gray-700">Fecha de Ingreso: {activo.fechaIngreso}</p>
                {activo.asignadoA && (
                  <p className="text-gray-700">Asignado: {activo.asignadoA}</p>
                )}
                {activo.fechaSalida && (
                  <p className="text-gray-700">Fecha de Salida: {activo.fechaSalida}</p>
                )}
                {activo.ticket && (
                  <p className="text-gray-700">N° TICKET: {activo.ticket}</p>
                )}
              </div>
              <div>
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => openDeleteModal(indice)}
                >
                  <Trash className="w-4 h-4 mr-2" />
                  Eliminar
                </button>
                {!activo.fechaSalida && (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleAgregarSalida(indice)}
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

      {/* Modal para agregar salida */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Agregar Salida</h2>
            <div className="form-group">
              <label htmlFor="asignadoA" className="form-label">Asignado a:</label>
              <input
                id="asignadoA"
                type="text"
                className="form-input"
                value={formData.asignadoA}
                onChange={(e) => setFormData({ ...formData, asignadoA: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fechaSalida" className="form-label">Fecha de Salida:</label>
              <input
                id="fechaSalida"
                type="date"
                className="form-input"
                value={formData.fechaSalida}
                onChange={(e) => setFormData({ ...formData, fechaSalida: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ticket" className="form-label">Ticket:</label>
              <input
                id="ticket"
                type="text"
                className="form-input"
                value={formData.ticket}
                readOnly
              />
            </div>
            <div className="modal-actions">
              <button
                onClick={handleSubmit}
                className="btn-save"
              >
                Guardar
              </button>
              <button
                onClick={closeModal}
                className="btn-cancel"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación */}
      {isDeleteModalOpen && (
        <div className="modal-overlay" onClick={closeDeleteModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">¿Estás seguro?</h2>
            <p className="text-gray-700">¿Seguro que deseas eliminar este activo?</p>
            <div className="modal-actions">
              <button onClick={handleEliminar} className="btn-delete">
                Eliminar
              </button>
              <button onClick={closeDeleteModal} className="btn-cancel">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivoList;
