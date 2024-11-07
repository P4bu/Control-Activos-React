// src/services/activoService.ts
export interface Activo {
    fechaIngreso: string;
    marca: string;
    modelo: string;
    serie: string;
    ordenCompra: string;
    fechaSalida?: string;
    ticket?: string;
    asignadoA?: string;
  }
  
  // Función para agregar un nuevo activo
  export const agregarActivo = (activos: Activo[], nuevoActivo: Activo): Activo[] => {
    return [...activos, nuevoActivo];
  };
  
  // Función para guardar un activo editado
  export const guardarEdicion = (activos: Activo[], indice: number, nuevoActivo: Activo): Activo[] => {
    const nuevosActivos = [...activos];
    nuevosActivos[indice] = nuevoActivo;
    return nuevosActivos;
  };
  
  // Función para editar un activo (obtenerlo por su índice)
  export const editarActivo = (activos: Activo[], indice: number): Activo => {
    return activos[indice];
  };
  
  // Función para eliminar un activo
  export const eliminarActivo = (activos: Activo[], indice: number): Activo[] => {
    const nuevosActivos = [...activos];
    nuevosActivos.splice(indice, 1);
    return nuevosActivos;
  };
  
  // Función para agregar salida de un activo
  export const agregarSalida = (activos: Activo[], indice: number, fechaSalida: string, ticket: string, asignadoA: string): Activo[] => {
    const nuevosActivos = [...activos];
    nuevosActivos[indice].fechaSalida = fechaSalida;
    nuevosActivos[indice].ticket = ticket;
    nuevosActivos[indice].asignadoA = asignadoA;
    return nuevosActivos;
  };
  