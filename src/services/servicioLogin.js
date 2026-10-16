const CLAVE_ALMACENAMIENTO = "usuarios_demo";
const CLAVE_SESION_ACTUAL = "usuario_actual";

// Base de datos local de Regiones y Comunas de Chile
export const REGIONES_Y_COMUNAS = [
  {
    region: "Región Metropolitana de Santiago",
    comunas: ["Santiago", "Providencia", "Las Condes", "Ñuñoa", "Maipú", "San Bernardo", "Puente Alto"]
  },
  {
    region: "Valparaíso",
    comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "Concón"]
  },
  {
    region: "Biobío",
    comunas: ["Concepción", "Talcahuano", "San Pedro de la Paz", "Chiguayante", "Los Ángeles"]
  }
];

// Funciones puras de utilidad
export const validarCamposVacios = (...campos) => {
  return campos.every((campo) => campo && String(campo).trim() !== "");
};

export const validarFormatoCorreo = (correo) => {
  const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return expresion.test(String(correo).toLowerCase());
};

export const esAdministrador = (usuario) => {
  return Boolean(usuario && usuario.rol === "ADMIN");
};

// Función para obtener comunas asociadas a una región seleccionada
export const obtenerComunasPorRegion = (nombreRegion) => {
  const regionEncontrada = REGIONES_Y_COMUNAS.find((r) => r.region === nombreRegion);
  return regionEncontrada ? regionEncontrada.comunas : [];
};

export const servicioLogin = {
  obtenerUsuarios() {
    const usuarios = localStorage.getItem(CLAVE_ALMACENAMIENTO);
    if (!usuarios) {
      const usuariosIniciales = [
        { 
          id: "1", 
          nombre: "Administrador", 
          correo: "admin@demo.com", 
          clave: "admin123", 
          rol: "ADMIN",
          region: "Región Metropolitana de Santiago",
          comuna: "Santiago"
        },
        { 
          id: "2", 
          nombre: "Usuario Demo", 
          correo: "user@demo.com", 
          clave: "user123", 
          rol: "USER",
          region: "Valparaíso",
          comuna: "Viña del Mar"
        },
      ];
      localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(usuariosIniciales));
      return usuariosIniciales;
    }
    return JSON.parse(usuarios);
  },

  obtenerTodosLosUsuarios() {
    return this.obtenerUsuarios();
  },

  async iniciarSesion(correo, clave) {
    const usuarios = this.obtenerUsuarios();
    const usuarioEncontrado = usuarios.find(
      (u) => u.correo.toLowerCase() === correo.toLowerCase() && u.clave === clave
    );

    if (!usuarioEncontrado) {
      throw new Error("Credenciales inválidas. Verifica tu correo y contraseña.");
    }

    const { clave: _, ...usuarioSinClave } = usuarioEncontrado;
    sessionStorage.setItem(CLAVE_SESION_ACTUAL, JSON.stringify(usuarioSinClave));
    return usuarioSinClave;
  },

  async registrarUsuario(nombre, correo, clave, region, comuna) {
    const usuarios = this.obtenerUsuarios();
    
    const yaExiste = usuarios.some(
      (u) => u.correo.toLowerCase() === correo.toLowerCase()
    );

    if (yaExiste) {
      throw new Error("El correo electrónico ya está registrado.");
    }

    const nuevoUsuario = {
      id: Date.now().toString(),
      nombre,
      correo,
      clave,
      region,
      comuna,
      rol: "USER",
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(usuarios));

    const { clave: _, ...usuarioSinClave } = nuevoUsuario;
    sessionStorage.setItem(CLAVE_SESION_ACTUAL, JSON.stringify(usuarioSinClave));
    return usuarioSinClave;
  },

  obtenerUsuarioActual() {
    const usuario = sessionStorage.getItem(CLAVE_SESION_ACTUAL);
    return usuario ? JSON.parse(usuario) : null;
  },

  cerrarSesion() {
    sessionStorage.removeItem(CLAVE_SESION_ACTUAL);
  },
};