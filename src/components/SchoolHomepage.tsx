import React, { useState } from 'react';
import { Clock, User, LogOut, Mail, Phone, Settings, Users, Calendar, Edit3, X, Upload } from 'lucide-react';
import ConfirmationModal from './ConfirmationModal';

interface SchoolHomepageProps {
  userData: any;
  userRole: string;
  onLogout: () => void;
  onNavigate: (section: string) => void;
}

const SchoolHomepage: React.FC<SchoolHomepageProps> = ({ userData, userRole, onLogout, onNavigate }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [schoolName, setSchoolName] = useState("Preescolar Mariscal Sucre");
  const [isEditingSchoolName, setIsEditingSchoolName] = useState(false);
  const [tempSchoolName, setTempSchoolName] = useState(schoolName);
  const [institutionDescription, setInstitutionDescription] = useState({
    title: "Nuestra Institución",
    content: "Somos una institución educativa comprometida con la excelencia académica y el desarrollo integral de nuestros estudiantes. Con más de 25 años de experiencia, hemos formado generaciones de jóvenes preparados para enfrentar los desafíos del futuro. Nuestra misión es brindar una educación de calidad que fomente el pensamiento crítico, la creatividad y los valores humanos, ofreciendo un ambiente seguro y estimulante donde cada estudiante puede desarrollar su máximo potencial."
  });
  const [isEditingInstitution, setIsEditingInstitution] = useState(false);
  const [tempInstitutionDescription, setTempInstitutionDescription] = useState(institutionDescription);

  // Datos de los profesores (ahora como estado para poder modificar)
  const [profesores, setProfesores] = useState([
    {
      id: 1,
      nombre: "María González",
      profesion: "Directora",
      imagen: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=400",
      email: "maria.gonzalez@escuela.edu",
      seccion: "Aula 1, Sección A, Etapa 1"
    },
    {
      id: 2,
      nombre: "Carlos Rodríguez",
      profesion: "Profesor",
      imagen: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
      email: "carlos.rodriguez@escuela.edu",
      seccion: "Aula 1, Sección A, Etapa 1"
    },
    {
      id: 3,
      nombre: "Ana Martínez",
      profesion: "Profesora",
      imagen: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400",
      email: "ana.martinez@escuela.edu",
      seccion: "Aula 1, Sección A, Etapa 1"
    },
    {
      id: 4,
      nombre: "Luis Fernández",
      profesion: "Profesor",
      imagen: "https://images.pexels.com/photos/2182969/pexels-photo-2182969.jpeg?auto=compress&cs=tinysrgb&w=400",
      email: "luis.fernandez@escuela.edu",
      seccion: "Aula 1, Sección A, Etapa 1"
    },
    {
      id: 5,
      nombre: "Carmen Silva",
      profesion: "Profesora",
      imagen: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400",
      email: "carmen.silva@escuela.edu",
      seccion: "Aula 1, Sección A, Etapa 1"
    },
    {
      id: 6,
      nombre: "Roberto Pérez",
      profesion: "Profesor",
      imagen: "https://images.pexels.com/photos/2182975/pexels-photo-2182975.jpeg?auto=compress&cs=tinysrgb&w=400",
      email: "roberto.perez@escuela.edu",
      seccion: "Aula 1, Sección A, Etapa 1"
    }
  ]);

  const [editingTeacher, setEditingTeacher] = useState<number | null>(null);
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [newTeacher, setNewTeacher] = useState({
    nombre: '',
    profesion: '',
    imagen: '',
    email: '',
    seccion: ''
  });

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

  const saveSchoolName = () => {
    setSchoolName(tempSchoolName);
    setIsEditingSchoolName(false);
  };

  const cancelSchoolNameEdit = () => {
    setTempSchoolName(schoolName);
    setIsEditingSchoolName(false);
  };

  const saveInstitutionDescription = () => {
    setInstitutionDescription(tempInstitutionDescription);
    setIsEditingInstitution(false);
  };

  const cancelInstitutionEdit = () => {
    setTempInstitutionDescription(institutionDescription);
    setIsEditingInstitution(false);
  };

  const addTeacher = () => {
    if (newTeacher.nombre && newTeacher.profesion && newTeacher.email) {
      let imageUrl = newTeacher.imagen;
      
      // Si se seleccionó una imagen, crear URL temporal
      if (selectedImage) {
        imageUrl = URL.createObjectURL(selectedImage);
      }
      
      const teacher = {
        ...newTeacher,
        id: Date.now(),
        imagen: imageUrl || "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400"
      };
      setProfesores([...profesores, teacher]);
      setNewTeacher({
        nombre: '',
        profesion: '',
        imagen: '',
        email: '',
        seccion: ''
      });
      setSelectedImage(null);
      setIsAddingTeacher(false);
    }
  };

  const updateTeacher = (id: number, updatedData: any) => {
    setProfesores(profesores.map(prof => 
      prof.id === id ? { ...prof, ...updatedData } : prof
    ));
    setEditingTeacher(null);
  };

  const deleteTeacher = (id: number) => {
    setProfesores(profesores.filter(prof => prof.id !== id));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // También actualizar la URL en el estado del nuevo profesor
      setNewTeacher({...newTeacher, imagen: URL.createObjectURL(file)});
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mr-3 shadow-lg">
                <img 
                  src="/WhatsApp Image 2025-06-03 at 6.47.51 PM.png" 
                  alt="Logo" 
                  className="w-8 h-8 object-contain rounded-full"
                />
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                {schoolName}
              </h1>
              {userRole === 'administrador' && (
                <button
                  onClick={() => setIsEditingSchoolName(true)}
                  className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <nav className="hidden md:flex items-center space-x-2">
              {userRole === 'administrador' && (
                <>
                  <button
                    onClick={() => onNavigate('secciones')}
                    className="flex items-center px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Secciones
                  </button>
                  <button
                    onClick={() => onNavigate('usuarios')}
                    className="flex items-center px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Usuarios
                  </button>
                </>
              )}
              {(userRole === 'docente' || userRole === 'estudiante') && (
                <button
                  onClick={() => onNavigate(userRole === 'estudiante' ? 'descripcion' : 'descripciones')}
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium"
                >
                  <User className="w-4 h-4 mr-2" />
                  {userRole === 'estudiante' ? 'Descripción' : 'Descripciones'}
                </button>
              )}
              <button
                onClick={() => onNavigate('eventos')}
                className="flex items-center px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Eventos
              </button>
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-400 mr-2" />
                <span className="text-gray-700 hidden sm:inline">{userData.firstName || userData.email}</span>
              </div>
              <button
                onClick={handleLogoutClick}
                className="flex items-center px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200 bg-gray-50">
          <div className="px-4 py-3 space-y-2">
            {userRole === 'administrador' && (
              <>
                <button
                  onClick={() => onNavigate('secciones')}
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Gestionar Secciones
                </button>
                <button
                  onClick={() => onNavigate('usuarios')}
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium"
                >
                  <User className="w-4 h-4 mr-2" />
                  Gestionar Usuarios
                </button>
              </>
            )}
            {(userRole === 'docente' || userRole === 'estudiante') && (
              <button
                onClick={() => onNavigate(userRole === 'estudiante' ? 'descripcion' : 'descripciones')}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium"
              >
                <User className="w-4 h-4 mr-2" />
                {userRole === 'estudiante' ? 'Consultar Descripción' : 'Consultar Descripciones'}
              </button>
            )}
            {(userRole === 'docente' || userRole === 'estudiante') && (
              <button
                onClick={() => onNavigate('descripciones')}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium"
              >
                <User className="w-4 h-4 mr-2" />
                Consultar Descripciones
              </button>
            )}
            <button
              onClick={() => onNavigate('eventos')}
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 font-medium"
            >
              <Calendar className="w-4 h-4 mr-2" />
              {userRole === 'administrador' ? 'Gestionar Eventos' : 'Consultar Eventos'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section with School Image */}
        <div className="relative h-screen">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/WhatsApp%20Image%202025-07-03%20at%208.56.04%20PM.jpeg)',
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-indigo-900/50 to-purple-900/60" />
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
            {/* School Logo */}
            <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center mb-8 shadow-2xl p-4">
              <img 
                src="/WhatsApp Image 2025-06-03 at 6.47.51 PM.png" 
                alt="Logo de la Escuela" 
                className="w-full h-full object-contain rounded-full"
              />
            </div>

            {/* Welcome Message */}
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {userRole === 'administrador' ? 'Panel de Administrador' : userRole === 'docente' ? 'Panel de Docente' : 'Bienvenido al'}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Sistema Escolar
                </span>
              </h1>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </div>
        </div>

        {/* School Description Section */}
        <div className="bg-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900">
                {institutionDescription.title}
              </h2>
              {userRole === 'administrador' && (
                <button
                  onClick={() => setIsEditingInstitution(true)}
                  className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {isEditingInstitution && userRole === 'administrador' ? (
              <div className="space-y-6 text-left">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                  <input
                    type="text"
                    value={tempInstitutionDescription.title}
                    onChange={(e) => setTempInstitutionDescription({...tempInstitutionDescription, title: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <textarea
                    value={tempInstitutionDescription.content}
                    onChange={(e) => setTempInstitutionDescription({...tempInstitutionDescription, content: e.target.value})}
                    rows={8}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="flex space-x-4 justify-center">
                  <button
                    onClick={saveInstitutionDescription}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={cancelInstitutionEdit}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
            <div className="prose prose-lg mx-auto text-gray-600 leading-relaxed">
              <p className="text-lg leading-relaxed">
                {institutionDescription.content}
              </p>
            </div>
            )}
          </div>
        </div>

        {/* Teachers Section */}
        <div className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-4">
                <h2 className="text-4xl font-bold text-gray-900">
                  Nuestro Equipo Docente
                </h2>
                {userRole === 'administrador' && (
                  <button
                    onClick={() => setIsAddingTeacher(true)}
                    className="ml-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Agregar Profesor
                  </button>
                )}
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Conoce a los profesionales dedicados que guían el aprendizaje de nuestros estudiantes con pasión y experiencia
              </p>
            </div>

            {/* Add Teacher Form */}
            {isAddingTeacher && userRole === 'administrador' && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Agregar Nuevo Profesor</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    value={newTeacher.nombre}
                    onChange={(e) => setNewTeacher({...newTeacher, nombre: e.target.value})}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="text"
                    placeholder="Profesión"
                    value={newTeacher.profesion}
                    onChange={(e) => setNewTeacher({...newTeacher, profesion: e.target.value})}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={newTeacher.email}
                    onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="text"
                    placeholder="Sección"
                    value={newTeacher.seccion}
                    onChange={(e) => setNewTeacher({...newTeacher, seccion: e.target.value})}
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Imagen del Profesor</label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                        id="teacher-image-upload"
                      />
                      <label
                        htmlFor="teacher-image-upload"
                        className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer transition-colors"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Seleccionar Imagen
                      </label>
                      {selectedImage && (
                        <span className="text-sm text-gray-600">
                          {selectedImage.name}
                        </span>
                      )}
                    </div>
                    {(selectedImage || newTeacher.imagen) && (
                      <div className="mt-2">
                        <img
                          src={selectedImage ? URL.createObjectURL(selectedImage) : newTeacher.imagen}
                          alt="Vista previa"
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={addTeacher}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Agregar
                  </button>
                  <button
                    onClick={() => setIsAddingTeacher(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {profesores.map((profesor, index) => (
                <div key={profesor.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative">
                  {userRole === 'administrador' && (
                    <div className="absolute top-2 right-2 z-10 flex space-x-1">
                      <button
                        onClick={() => setEditingTeacher(profesor.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-full transition-colors"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => deleteTeacher(profesor.id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  
                  <div className="relative">
                    <img 
                      src={profesor.imagen} 
                      alt={profesor.nombre}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  
                  <div className="p-6">
                    {editingTeacher === profesor.id && userRole === 'administrador' ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={profesor.nombre}
                          onChange={(e) => updateTeacher(profesor.id, {nombre: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <input
                          type="text"
                          value={profesor.profesion}
                          onChange={(e) => updateTeacher(profesor.id, {profesion: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <input
                          type="email"
                          value={profesor.email}
                          onChange={(e) => updateTeacher(profesor.id, {email: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <input
                          type="text"
                          value={profesor.seccion}
                          onChange={(e) => updateTeacher(profesor.id, {seccion: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <input
                          type="url"
                          value={profesor.imagen}
                          onChange={(e) => updateTeacher(profesor.id, {imagen: e.target.value})}
                          placeholder="URL de imagen"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingTeacher(null)}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={() => setEditingTeacher(null)}
                            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {profesor.nombre}
                        </h3>
                        
                        <p className="text-sm font-medium text-gray-700 mb-3">
                          {profesor.profesion}
                        </p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-600">
                            <Mail className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="text-sm">{profesor.email}</span>
                          </div>
                          <div className="flex items-start text-gray-600">
                            <User className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                            <span className="text-sm">{profesor.seccion}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* School Name Edit Modal */}
      {isEditingSchoolName && userRole === 'administrador' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Editar Nombre de la Institución
              </h3>
              <input
                type="text"
                value={tempSchoolName}
                onChange={(e) => setTempSchoolName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
                placeholder="Nombre de la institución"
              />
              <div className="flex space-x-3">
                <button
                  onClick={cancelSchoolNameEdit}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={saveSchoolName}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

export default SchoolHomepage;