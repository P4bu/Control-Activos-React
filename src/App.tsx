import { useState } from 'react';
import ActivoForm from './components/ActivoForm';
import ActivoList from './components/ActivoList';
import './styles/App.css';


interface Activo {
  fechaIngreso: string;
  marca: string;
  modelo: string;
  serie: string;
  activoFijo: string;
  descripcion: string;
  estado: string
  ordenCompra: string;
}

const App = () => {
  const [activos, setActivos] = useState<Activo[]>([]);
  const [nuevoActivo, setNuevoActivo] = useState<Activo>({
    fechaIngreso: '',
    marca: '',
    modelo: '',
    serie: '',
    activoFijo: '',
    descripcion: '',
    estado: '',
    ordenCompra: ''
  });
  const [editar, setEditar] = useState(false);
  const [indiceEditar, setIndiceEditar] = useState(-1);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-4">Control de Activos</h1>
      <ActivoForm
        activo={nuevoActivo}
        setActivo={setNuevoActivo}
        editar={editar}
        setEditar={setEditar}
        indiceEditar={indiceEditar}
        setIndiceEditar={setIndiceEditar}
        activos={activos}
        setActivos={setActivos}
      />
      <ActivoList activos={activos} setActivos={setActivos} />
    </div>
  );
};

export default App;
