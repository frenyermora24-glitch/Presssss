import React, { useState } from 'react';
import { ArrowLeft, User, Calendar, Users, Settings, LogOut, Edit3, Save, X, Plus, Trash2, Download } from 'lucide-react';
import ConfirmationModal from './ConfirmationModal';

interface DashboardProps {
  userData: any;
  userRole: string;
  onLogout: () => void;
  initialSection: string;
  onNavigateBack: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  userData, 
  userRole, 
  onLogout, 
  initialSection, 
  onNavigateBack 
}) => {
  const [currentSection, setCurrentSection] = useState(initialSection);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Estados para gestión de secciones (solo administrador)
  const [secciones, setSecciones] = useState([
    {
      id: 1,
      nombre: "Aula 1, Sección A, Etapa 1",
      estudiantes: [
        { id: 1, nombre: "Ana María Rodríguez", cedula: "V-12345678", representante: "María Rodríguez", telefono: "0414-1234567" },
        { id: 2, nombre: "Carlos José Pérez", cedula: "V-23456789", representante: "José Pérez", telefono: "0424-2345678" },
        { id: 3, nombre: "Sofía Elena García", cedula: "V-34567890", representante: "Elena García", telefono: "0412-3456789" }
      ]
    },
    {
      id: 2,
      nombre: "Aula 2, Sección B, Etapa 1",
      estudiantes: [
        { id: 4, nombre: "Miguel Ángel Torres", cedula: "V-45678901", representante: "Ángel Torres", telefono: "0416-4567890" },
        { id: 5, nombre: "Isabella Martínez", cedula: "V-56789012", representante: "Carmen Martínez", telefono: "0426-5678901" }
      ]
    },
    {
      id: 3,
      nombre: "Aula 3, Sección A, Etapa 2",
      estudiantes: [
        { id: 6, nombre: "Diego Alejandro Silva", cedula: "V-67890123", representante: "Alejandro Silva", telefono: "0414-6789012" },
        { id: 7, nombre: "Valentina López", cedula: "V-78901234", representante: "Andrea López", telefono: "0424-7890123" }
      ]
    }
  ]);

  const [isAddingSection, setIsAddingSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');
  const [addingStudentToSection, setAddingStudentToSection] = useState<number | null>(null);
  const [newStudent, setNewStudent] = useState({
    nombre: '',
    cedula: '',
    representante: '',
    telefono: ''
  });

  // Estados para gestión de usuarios (solo administrador)
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "María González", email: "maria.gonzalez@escuela.edu", rol: "administrador", activo: true },
    { id: 2, nombre: "Carlos Rodríguez", email: "carlos.rodriguez@escuela.edu", rol: "docente", activo: true },
    { id: 3, nombre: "Ana Martínez", email: "ana.martinez@escuela.edu", rol: "docente", activo: true },
    { id: 4, nombre: "Luis Fernández", email: "luis.fernandez@escuela.edu", rol: "docente", activo: false },
    { id: 5, nombre: "Carmen Silva", email: "carmen.silva@escuela.edu", rol: "docente", activo: true },
    { id: 6, nombre: "Roberto Pérez", email: "roberto.perez@escuela.edu", rol: "docente", activo: true },
    { id: 7, nombre: "María Rodríguez", email: "maria.rodriguez@escuela.edu", rol: "representante", activo: true }
  ]);

  const [isAddingUser, setIsAddingUser] = useState(false);
  const [editingUser, setEditingUser] = useState<number | null>(null);
  const [newUser, setNewUser] = useState({
    nombre: '',
    email: '',
    rol: 'estudiante',
    activo: true
  });

  // Estados para gestión de eventos
  const [eventos, setEventos] = useState([
    {
      id: 1,
      titulo: "Reunión de Representantes",
      fecha: "2024-02-15",
      hora: "14:00",
      descripcion: "Reunión mensual para discutir el progreso académico de los estudiantes y actividades escolares.",
      tipo: "reunion"
    },
    {
      id: 2,
      titulo: "Festival de Talentos",
      fecha: "2024-02-20",
      hora: "09:00",
      descripcion: "Evento especial donde los estudiantes mostrarán sus habilidades artísticas y talentos especiales.",
      tipo: "evento"
    },
    {
      id: 3,
      titulo: "Día de la Familia",
      fecha: "2024-02-25",
      hora: "10:00",
      descripcion: "Celebración familiar con actividades recreativas, juegos y almuerzo compartido.",
      tipo: "celebracion"
    }
  ]);

  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState<number | null>(null);
  const [newEvent, setNewEvent] = useState({
    titulo: '',
    fecha: '',
    hora: '',
    descripcion: '',
    tipo: 'evento'
  });

  // Estados para descripciones de estudiantes (docentes)
  const [estudiantes, setEstudiantes] = useState([
    {
      id: 1,
      nombre: "Ana María Rodríguez",
      seccion: "Aula 1, Sección A, Etapa 1",
      asistencia: "98%",
      rendimiento: "Excelente",
      observaciones: "Estudiante muy participativa y responsable. Muestra gran interés en las actividades de lectura."
    },
    {
      id: 2,
      nombre: "Carlos José Pérez",
      seccion: "Aula 1, Sección A, Etapa 1",
      asistencia: "95%",
      rendimiento: "Bueno",
      observaciones: "Buen desempeño en matemáticas. Necesita refuerzo en actividades de escritura."
    },
    {
      id: 3,
      nombre: "Sofía Elena García",
      seccion: "Aula 1, Sección A, Etapa 1",
      asistencia: "92%",
      rendimiento: "Muy Bueno",
      observaciones: "Excelente en actividades artísticas. Muy colaborativa con sus compañeros."
    }
  ]);

  const [editingStudent, setEditingStudent] = useState<number | null>(null);

  // Datos del estudiante individual (representantes)
  const estudianteData = {
    nombre: "Ana María Rodríguez",
    cedula: "V-12345678",
    fechaNacimiento: "15-03-2019",
    representante: "María Rodríguez",
    telefono: "0414-1234567",
    seccion: "Aula 1, Sección A, Etapa 1",
    docente: "María González",
    descripcionAcademica: "Ana María es una estudiante excepcional que demuestra gran entusiasmo por el aprendizaje. Su participación en clase es activa y siempre está dispuesta a ayudar a sus compañeros. Muestra particular interés en las actividades de lectura y matemáticas básicas. Su comportamiento es ejemplar y mantiene excelentes relaciones con todos sus compañeros y maestros. Se recomienda continuar fomentando su curiosidad natural y proporcionarle desafíos adicionales para mantener su motivación.",
    asistencia: "98%",
    rendimiento: "Excelente",
    ultimaActualizacion: "15 de Enero, 2024"
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    onLogout();
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  // Funciones para gestión de secciones
  const addSection = () => {
    if (newSectionName.trim()) {
      const newSection = {
        id: Date.now(),
        nombre: newSectionName,
        estudiantes: []
      };
      setSecciones([...secciones, newSection]);
      setNewSectionName('');
      setIsAddingSection(false);
    }
  };

  const deleteSection = (sectionId: number) => {
    setSecciones(secciones.filter(section => section.id !== sectionId));
  };

  const addStudentToSection = (sectionId: number) => {
    if (newStudent.nombre && newStudent.cedula && newStudent.representante && newStudent.telefono) {
      const studentWithId = {
        ...newStudent,
        id: Date.now()
      };
      
      setSecciones(secciones.map(section => 
        section.id === sectionId 
          ? { ...section, estudiantes: [...section.estudiantes, studentWithId] }
          : section
      ));
      
      setNewStudent({ nombre: '', cedula: '', representante: '', telefono: '' });
      setAddingStudentToSection(null);
    }
  };

  const deleteStudentFromSection = (sectionId: number, studentId: number) => {
    setSecciones(secciones.map(section => 
      section.id === sectionId 
        ? { ...section, estudiantes: section.estudiantes.filter(student => student.id !== studentId) }
        : section
    ));
  };

  // Funciones para gestión de usuarios
  const addUser = () => {
    if (newUser.nombre && newUser.email) {
      const userWithId = {
        ...newUser,
        id: Date.now()
      };
      setUsuarios([...usuarios, userWithId]);
      setNewUser({ nombre: '', email: '', rol: 'estudiante', activo: true });
      setIsAddingUser(false);
    }
  };

  const toggleUserStatus = (userId: number) => {
    setUsuarios(usuarios.map(user => 
      user.id === userId ? { ...user, activo: !user.activo } : user
    ));
  };

  const deleteUser = (userId: number) => {
    setUsuarios(usuarios.filter(user => user.id !== userId));
  };

  const updateUser = (userId: number, updatedData: any) => {
    setUsuarios(usuarios.map(user => 
      user.id === userId ? { ...user, ...updatedData } : user
    ));
    setEditingUser(null);
  };

  // Funciones para gestión de eventos
  const addEvent = () => {
    if (newEvent.titulo && newEvent.fecha && newEvent.hora) {
      const eventWithId = {
        ...newEvent,
        id: Date.now()
      };
      setEventos([...eventos, eventWithId]);
      setNewEvent({ titulo: '', fecha: '', hora: '', descripcion: '', tipo: 'evento' });
      setIsAddingEvent(false);
    }
  };

  const updateEvent = (eventId: number, updatedEvent: any) => {
    setEventos(eventos.map(event => 
      event.id === eventId ? { ...event, ...updatedEvent } : event
    ));
    setEditingEvent(null);
  };

  const deleteEvent = (eventId: number) => {
    setEventos(eventos.filter(event => event.id !== eventId));
  };

  // Funciones para descripciones de estudiantes
  const updateStudent = (studentId: number, field: string, value: string) => {
    setEstudiantes(estudiantes.map(student => 
      student.id === studentId ? { ...student, [field]: value } : student
    ));
  };

  const getMenuItems = () => {
    const baseItems = [
      { id: 'eventos', label: 'Eventos', icon: Calendar }
    ];

    if (userRole === 'administrador') {
      return [
        { id: 'secciones', label: 'Secciones', icon: Users },
        { id: 'usuarios', label: 'Usuarios', icon: User },
        ...baseItems
      ];
    } else if (userRole === 'docente') {
      return [
        { id: 'descripciones', label: 'Descripciones', icon: User },
        ...baseItems
      ];
    } else {
      return [
        { id: 'descripcion', label: 'Descripción', icon: User },
        ...baseItems
      ];
    }
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'secciones':
        if (userRole !== 'administrador') return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceso Denegado</h2>
            <p className="text-gray-600">No tienes permisos para ver esta sección.</p>
          </div>
        );
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Gestión de Secciones</h2>
              <button
                onClick={() => setIsAddingSection(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Sección
              </button>
            </div>

            {isAddingSection && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Nueva Sección</h3>
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={newSectionName}
                    onChange={(e) => setNewSectionName(e.target.value)}
                    placeholder="Nombre de la sección"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={addSection}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    Agregar
                  </button>
                  <button
                    onClick={() => setIsAddingSection(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {secciones.map((seccion) => (
                <div key={seccion.id} className="bg-white rounded-lg shadow">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-gray-900">{seccion.nombre}</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setAddingStudentToSection(seccion.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center transition-colors"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Agregar Estudiante
                        </button>
                        <button
                          onClick={() => deleteSection(seccion.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm flex items-center transition-colors"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Eliminar Sección
                        </button>
                      </div>
                    </div>
                  </div>

                  {addingStudentToSection === seccion.id && (
                    <div className="p-6 bg-gray-50 border-b border-gray-200">
                      <h4 className="text-lg font-medium mb-4">Agregar Estudiante</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={newStudent.nombre}
                          onChange={(e) => setNewStudent({...newStudent, nombre: e.target.value})}
                          placeholder="Nombre completo"
                          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <input
                          type="text"
                          value={newStudent.cedula}
                          onChange={(e) => setNewStudent({...newStudent, cedula: e.target.value})}
                          placeholder="Cédula"
                          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <input
                          type="text"
                          value={newStudent.representante}
                          onChange={(e) => setNewStudent({...newStudent, representante: e.target.value})}
                          placeholder="Representante"
                          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <input
                          type="text"
                          value={newStudent.telefono}
                          onChange={(e) => setNewStudent({...newStudent, telefono: e.target.value})}
                          placeholder="Teléfono"
                          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div className="flex space-x-4 mt-4">
                        <button
                          onClick={() => addStudentToSection(seccion.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                          Agregar
                        </button>
                        <button
                          onClick={() => setAddingStudentToSection(null)}
                          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    {seccion.estudiantes.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-3 px-4 font-semibold text-gray-900">Nombre</th>
                              <th className="text-left py-3 px-4 font-semibold text-gray-900">Cédula</th>
                              <th className="text-left py-3 px-4 font-semibold text-gray-900">Representante</th>
                              <th className="text-left py-3 px-4 font-semibold text-gray-900">Teléfono</th>
                              <th className="text-left py-3 px-4 font-semibold text-gray-900">Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {seccion.estudiantes.map((estudiante) => (
                              <tr key={estudiante.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4">{estudiante.nombre}</td>
                                <td className="py-3 px-4">{estudiante.cedula}</td>
                                <td className="py-3 px-4">{estudiante.representante}</td>
                                <td className="py-3 px-4">{estudiante.telefono}</td>
                                <td className="py-3 px-4">
                                  <button
                                    onClick={() => deleteStudentFromSection(seccion.id, estudiante.id)}
                                    className="text-red-600 hover:text-red-800 transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No hay estudiantes en esta sección</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'usuarios':
        if (userRole !== 'administrador') return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceso Denegado</h2>
            <p className="text-gray-600">No tienes permisos para ver esta sección.</p>
          </div>
        );
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h2>
              <button
                onClick={() => setIsAddingUser(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Usuario
              </button>
            </div>

            {isAddingUser && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Nuevo Usuario</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={newUser.nombre}
                    onChange={(e) => setNewUser({...newUser, nombre: e.target.value})}
                    placeholder="Nombre completo"
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    placeholder="Email"
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <select
                    value={newUser.rol}
                    onChange={(e) => setNewUser({...newUser, rol: e.target.value})}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="estudiante">Estudiante</option>
                    <option value="docente">Docente</option>
                    <option value="administrador">Administrador</option>
                    <option value="representante">Representante</option>
                  </select>
                </div>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={addUser}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Agregar
                  </button>
                  <button
                    onClick={() => setIsAddingUser(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-6 font-semibold text-gray-900">Nombre</th>
                      <th className="text-left py-3 px-6 font-semibold text-gray-900">Email</th>
                      <th className="text-left py-3 px-6 font-semibold text-gray-900">Rol</th>
                      <th className="text-left py-3 px-6 font-semibold text-gray-900">Estado</th>
                      <th className="text-left py-3 px-6 font-semibold text-gray-900">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usuarios.map((usuario) => (
                      <tr key={usuario.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-6">
                          {editingUser === usuario.id ? (
                            <input
                              type="text"
                              value={usuario.nombre}
                              onChange={(e) => updateUser(usuario.id, {nombre: e.target.value})}
                              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          ) : (
                            usuario.nombre
                          )}
                        </td>
                        <td className="py-4 px-6">
                          {editingUser === usuario.id ? (
                            <input
                              type="email"
                              value={usuario.email}
                              onChange={(e) => updateUser(usuario.id, {email: e.target.value})}
                              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          ) : (
                            usuario.email
                          )}
                        </td>
                        <td className="py-4 px-6">
                          {editingUser === usuario.id ? (
                            <select
                              value={usuario.rol}
                              onChange={(e) => updateUser(usuario.id, {rol: e.target.value})}
                              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                              <option value="estudiante">Estudiante</option>
                              <option value="docente">Docente</option>
                              <option value="administrador">Administrador</option>
                              <option value="representante">Representante</option>
                            </select>
                          ) : (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              usuario.rol === 'administrador' ? 'bg-purple-100 text-purple-800' :
                              usuario.rol === 'docente' ? 'bg-blue-100 text-blue-800' :
                              usuario.rol === 'representante' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {usuario.rol}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            usuario.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {usuario.activo ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex space-x-1">
                            {editingUser === usuario.id ? (
                              <>
                                <button
                                  onClick={() => setEditingUser(null)}
                                  className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs transition-colors flex items-center"
                                >
                                  <Save className="w-3 h-3 mr-1" />
                                  Guardar
                                </button>
                                <button
                                  onClick={() => setEditingUser(null)}
                                  className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs transition-colors flex items-center"
                                >
                                  <X className="w-3 h-3 mr-1" />
                                  Cancelar
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => setEditingUser(usuario.id)}
                                  className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors flex items-center"
                                >
                                  <Edit3 className="w-3 h-3 mr-1" />
                                  Modificar
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => toggleUserStatus(usuario.id)}
                              className={`px-2 py-1 rounded text-xs transition-colors ${
                                usuario.activo 
                                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
                                  : 'bg-green-500 hover:bg-green-600 text-white'
                              }`}
                            >
                              {usuario.activo ? 'Desactivar' : 'Activar'}
                            </button>
                            <button
                              onClick={() => deleteUser(usuario.id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition-colors"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'descripciones':
        if (userRole !== 'docente') return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceso Denegado</h2>
            <p className="text-gray-600">No tienes permisos para ver esta sección.</p>
          </div>
        );
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Descripciones de Estudiantes</h2>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-6 font-semibold text-gray-900">Estudiante</th>
                      <th className="text-left py-3 px-6 font-semibold text-gray-900">Sección</th>
                      <th className="text-left py-3 px-6 font-semibold text-gray-900">Asistencia</th>
                      <th className="text-left py-3 px-6 font-semibold text-gray-900">Rendimiento</th>
                      <th className="text-left py-3 px-6 font-semibold text-gray-900">Observaciones</th>
                      <th className="text-left py-3 px-6 font-semibold text-gray-900">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {estudiantes.map((estudiante) => (
                      <tr key={estudiante.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-6 font-medium">{estudiante.nombre}</td>
                        <td className="py-4 px-6">{estudiante.seccion}</td>
                        <td className="py-4 px-6">
                          {editingStudent === estudiante.id ? (
                            <input
                              type="text"
                              value={estudiante.asistencia}
                              onChange={(e) => updateStudent(estudiante.id, 'asistencia', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          ) : (
                            estudiante.asistencia
                          )}
                        </td>
                        <td className="py-4 px-6">
                          {editingStudent === estudiante.id ? (
                            <select
                              value={estudiante.rendimiento}
                              onChange={(e) => updateStudent(estudiante.id, 'rendimiento', e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                              <option value="Excelente">Excelente</option>
                              <option value="Muy Bueno">Muy Bueno</option>
                              <option value="Bueno">Bueno</option>
                              <option value="Regular">Regular</option>
                              <option value="Necesita Mejora">Necesita Mejora</option>
                            </select>
                          ) : (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              estudiante.rendimiento === 'Excelente' ? 'bg-green-100 text-green-800' :
                              estudiante.rendimiento === 'Muy Bueno' ? 'bg-blue-100 text-blue-800' :
                              estudiante.rendimiento === 'Bueno' ? 'bg-yellow-100 text-yellow-800' :
                              estudiante.rendimiento === 'Regular' ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {estudiante.rendimiento}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 max-w-xs">
                          {editingStudent === estudiante.id ? (
                            <textarea
                              value={estudiante.observaciones}
                              onChange={(e) => updateStudent(estudiante.id, 'observaciones', e.target.value)}
                              rows={3}
                              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          ) : (
                            <p className="text-sm text-gray-600 truncate">{estudiante.observaciones}</p>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          {editingStudent === estudiante.id ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setEditingStudent(null)}
                                className="bg-green-500 hover:bg-green-600 text-white p-1 rounded transition-colors"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setEditingStudent(null)}
                                className="bg-gray-500 hover:bg-gray-600 text-white p-1 rounded transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setEditingStudent(estudiante.id)}
                              className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded transition-colors"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'descripcion':
        if (userRole !== 'estudiante') return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceso Denegado</h2>
            <p className="text-gray-600">No tienes permisos para ver esta sección.</p>
          </div>
        );
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Mi Descripción Académica</h2>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
                <Download className="w-4 h-4 mr-2" />
                Descargar PDF
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-blue-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white">{estudianteData.nombre}</h3>
                <p className="text-green-100">{estudianteData.seccion}</p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cédula</label>
                      <p className="text-gray-900">{estudianteData.cedula}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento</label>
                      <p className="text-gray-900">{estudianteData.fechaNacimiento}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Representante</label>
                      <p className="text-gray-900">{estudianteData.representante}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                      <p className="text-gray-900">{estudianteData.telefono}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Docente</label>
                      <p className="text-gray-900">{estudianteData.docente}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Última Actualización</label>
                      <p className="text-gray-900">{estudianteData.ultimaActualizacion}</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Asistencia</h4>
                      <p className="text-2xl font-bold text-green-600">{estudianteData.asistencia}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Rendimiento</h4>
                      <p className="text-2xl font-bold text-blue-600">{estudianteData.rendimiento}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Descripción Académica</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 leading-relaxed">{estudianteData.descripcionAcademica}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'eventos':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {userRole === 'administrador' ? 'Gestión de Eventos' : 'Eventos Escolares'}
              </h2>
              {userRole === 'administrador' && (
                <button
                  onClick={() => setIsAddingEvent(true)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Evento
                </button>
              )}
            </div>

            {isAddingEvent && userRole === 'administrador' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Nuevo Evento</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={newEvent.titulo}
                    onChange={(e) => setNewEvent({...newEvent, titulo: e.target.value})}
                    placeholder="Título del evento"
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <select
                    value={newEvent.tipo}
                    onChange={(e) => setNewEvent({...newEvent, tipo: e.target.value})}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="evento">Evento</option>
                    <option value="reunion">Reunión</option>
                    <option value="celebracion">Celebración</option>
                    <option value="actividad">Actividad</option>
                  </select>
                  <input
                    type="date"
                    value={newEvent.fecha}
                    onChange={(e) => setNewEvent({...newEvent, fecha: e.target.value})}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="time"
                    value={newEvent.hora}
                    onChange={(e) => setNewEvent({...newEvent, hora: e.target.value})}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <textarea
                    value={newEvent.descripcion}
                    onChange={(e) => setNewEvent({...newEvent, descripcion: e.target.value})}
                    placeholder="Descripción del evento"
                    rows={3}
                    className="md:col-span-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={addEvent}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Agregar
                  </button>
                  <button
                    onClick={() => setIsAddingEvent(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventos.map((evento) => (
                <div key={evento.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className={`h-2 ${
                    evento.tipo === 'reunion' ? 'bg-blue-500' :
                    evento.tipo === 'celebracion' ? 'bg-purple-500' :
                    evento.tipo === 'actividad' ? 'bg-green-500' :
                    'bg-orange-500'
                  }`}></div>
                  
                  <div className="p-6">
                    {editingEvent === evento.id && userRole === 'administrador' ? (
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={evento.titulo}
                          onChange={(e) => updateEvent(evento.id, {titulo: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <input
                          type="date"
                          value={evento.fecha}
                          onChange={(e) => updateEvent(evento.id, {fecha: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <input
                          type="time"
                          value={evento.hora}
                          onChange={(e) => updateEvent(evento.id, {hora: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <textarea
                          value={evento.descripcion}
                          onChange={(e) => updateEvent(evento.id, {descripcion: e.target.value})}
                          rows={3}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingEvent(null)}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={() => setEditingEvent(null)}
                            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold text-gray-900">{evento.titulo}</h3>
                          {userRole === 'administrador' && (
                            <div className="flex space-x-1">
                              <button
                                onClick={() => setEditingEvent(evento.id)}
                                className="text-blue-600 hover:text-blue-800 transition-colors"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteEvent(evento.id)}
                                className="text-red-600 hover:text-red-800 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{new Date(evento.fecha).toLocaleDateString('es-ES', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                          
                          <div className="flex items-center text-gray-600">
                            <span className="w-4 h-4 mr-2 text-center">🕐</span>
                            <span>{evento.hora}</span>
                          </div>
                          
                          <div className="mt-4">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              evento.tipo === 'reunion' ? 'bg-blue-100 text-blue-800' :
                              evento.tipo === 'celebracion' ? 'bg-purple-100 text-purple-800' :
                              evento.tipo === 'actividad' ? 'bg-green-100 text-green-800' :
                              'bg-orange-100 text-orange-800'
                            }`}>
                              {evento.tipo.charAt(0).toUpperCase() + evento.tipo.slice(1)}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 text-sm leading-relaxed mt-4">
                            {evento.descripcion}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Panel de Control</h2>
            <p className="text-gray-600 mb-6">Selecciona una opción del menú lateral para acceder a las diferentes funcionalidades.</p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-blue-800 text-sm">
                <strong>Rol actual:</strong> {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mr-3">
              <img 
                src="/WhatsApp Image 2025-06-03 at 6.47.51 PM.png" 
                alt="Logo" 
                className="w-8 h-8 object-contain rounded-full"
              />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Dashboard</h2>
              <p className="text-sm text-gray-600 capitalize">{userRole}</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {getMenuItems().map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentSection(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    currentSection === item.id
                      ? 'bg-green-100 text-green-700 border-r-2 border-green-500'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button
                  onClick={onNavigateBack}
                  className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Volver al Inicio
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <User className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-gray-700">{userData.firstName || userData.email}</span>
                </div>
                <button
                  onClick={handleLogoutClick}
                  className="flex items-center px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={showLogoutModal}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
        title="Cerrar Sesión"
        message="¿Estás seguro de que deseas cerrar sesión? Tendrás que volver a iniciar sesión para acceder al sistema."
        confirmText="Sí, cerrar sesión"
        cancelText="Cancelar"
        type="warning"
      />
    </div>
  );
};

export default Dashboard;