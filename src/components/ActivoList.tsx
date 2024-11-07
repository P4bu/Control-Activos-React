import React, { useState } from 'react';
import { Activo, agregarSalida, eliminarActivo, editarActivo } from '../services/activoService';
import { Edit, Trash, Plus } from 'lucide-react';
import '../styles/ActivoList.css'; // Asegúrate de crear este archivo y agregar las clases CSS necesarias

interface ActivoListProps {
  activos: Activo[];
  setActivos: React.Dispatch<React.SetStateAction<Activo[]>>;
}

const ActivoList: React.FC<ActivoListProps> = ({ activos, setActivos }) => {
  // Estado para manejar la visibilidad del popup
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  // Estado para manejar los datos del formulario del popup
  const [formData, setFormData] = useState({
    asignadoA: '',
    ticket: `TICKET-${Date.now()}`, // Ticket auto-generado basado en timestamp
    fechaSalida: new Date().toISOString().split('T')[0], // Fecha actual
  });

  const [formDataEdit, setFormDataEdit] = useState({
    fechaIngreso: new Date().toISOString().split('T')[0],
    marca: '',
    modelo: '',
    serie: '',
    ordenCompra: '',
  });




  // Estado para saber qué activo estamos editando
  const [activoSeleccionado, setActivoSeleccionado] = useState<number | null>(null);

  const handleEliminar = (indice: number) => {
    const nuevosActivos = eliminarActivo(activos, indice);
    setActivos(nuevosActivos);
  };

  // Función para abrir el modal
  const handleAgregarSalida = (indice: number) => {
    setActivoSeleccionado(indice);
    setIsModalOpen(true);
    setModalType('agregarSalida')
    // Restablecer los valores del formulario
    setFormData({
      asignadoA: '',
      ticket: `TICKET-${Date.now()}`, // Nuevo ticket generado
      fechaSalida: new Date().toISOString().split('T')[0], // Fecha actual
    });
  };

  const handleEditarActivo = (indice: number) => {
    setActivoSeleccionado(indice);

    
    const nuevosActivos = [...activos]
    console.log("ActivoSeleccionado_:::", nuevosActivos[indice])

    setIsModalOpen(true);
    setModalType('editarActivo')
    setFormDataEdit({
      fechaIngreso: nuevosActivos[indice].fechaIngreso,
      marca: nuevosActivos[indice].marca,
      modelo: nuevosActivos[indice].modelo,
      serie: nuevosActivos[indice].serie,
      ordenCompra: nuevosActivos[indice].ordenCompra,
    });
  }

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalType('')
  };

  // Función para manejar la presentación de datos y actualización del activo
  const handleSubmit = () => {
    if (activoSeleccionado !== null) {
      const nuevosActivos = agregarSalida(activos, activoSeleccionado, formData.fechaSalida, formData.ticket, formData.asignadoA);
      setActivos(nuevosActivos);
    }
    closeModal(); // Cerrar el modal después de agregar la salida
  };
  // Función para manejar la presentación de datos y actualización del activo
  const handleSubmitEdit = () => {
    if (activoSeleccionado !== null) {
      const nuevosActivos = editarActivo(activos, activoSeleccionado, formDataEdit.fechaIngreso, formDataEdit.marca, formDataEdit.modelo, formDataEdit.serie, formDataEdit.ordenCompra);
      setActivos(nuevosActivos);
    }
    closeModal(); // Cerrar el modal después de agregar la salida
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
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleEditarActivo(indice)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => handleEliminar(indice)}
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
            {modalType === 'editarActivo' && (
              <>
                <h2 className="modal-title">Editar Activo</h2>
                <div className="form-group">
                  <label htmlFor="fechaIngreso" className="form-label">Fecha de ingreso:</label>
                  <input
                    id="fechaIngreso"
                    type="date"
                    className="form-input"
                    value={formDataEdit.fechaIngreso}
                    onChange={(e) => setFormDataEdit({ ...formDataEdit, fechaIngreso: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="asignadoA" className="form-label">Marca:</label>
                  <input
                    id="marca"
                    type="text"
                    className="form-input"
                    value={formDataEdit.marca}
                    onChange={(e) => setFormDataEdit({ ...formDataEdit, marca: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="asignadoA" className="form-label">Modelo:</label>
                  <input
                    id="modelo"
                    type="text"
                    className="form-input"
                    value={formDataEdit.modelo}
                    onChange={(e) => setFormDataEdit({ ...formDataEdit, modelo: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="asignadoA" className="form-label">Serie:</label>
                  <input
                    id="serie"
                    type="text"
                    className="form-input"
                    value={formDataEdit.serie}
                    onChange={(e) => setFormDataEdit({ ...formDataEdit, serie: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="asignadoA" className="form-label">Orden de compra:</label>
                  <input
                    id="ordenCompra"
                    type="text"
                    className="form-input"
                    value={formDataEdit.ordenCompra}
                    onChange={(e) => setFormDataEdit({ ...formDataEdit, ordenCompra: e.target.value })}
                  />
                </div>
                <div className="modal-actions">
                  <button
                    onClick={handleSubmitEdit}
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
              </>
            )}
            {modalType === 'agregarSalida' && (
              <>
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
              </>
            )}
          </div>
          <div>
          </div>
        </div>
      )
      }
    </div>
  );
};

export default ActivoList;
