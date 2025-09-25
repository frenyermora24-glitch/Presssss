import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import SchoolHomepage from './components/SchoolHomepage';
import Dashboard from './components/Dashboard';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'descripcion', 'descripciones', 'eventos', etc.
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState('estudiante'); // 'estudiante' o 'docente'

  const handleSubmit = (data: any) => {
    console.log('Form submitted:', data);
    setUserData(data);
    // Determinar el rol basado en el email o datos del usuario
    if (data.email && (data.email.includes('admin') || data.email.includes('administrador'))) {
      setUserRole('administrador');
    } else if (data.email && (data.email.includes('profesor') || data.email.includes('docente') || data.email.includes('teacher'))) {
      setUserRole('docente');
    } else {
      setUserRole('estudiante');
    }
    setIsLoggedIn(true);
    setCurrentView('home');
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setIsForgotPassword(false);
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
  };

  const handleBackToLogin = () => {
    setIsForgotPassword(false);
    setIsLogin(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    setUserRole('estudiante');
    setCurrentView('home');
    setIsLogin(true);
    setIsForgotPassword(false);
  };

  const handleNavigate = (section: string) => {
    setCurrentView(section);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="relative min-h-screen">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/WhatsApp%20Image%202025-07-03%20at%208.57.42%20PM.jpeg)',
              filter: 'brightness(0.7)'
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/40" />
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
            <div className="text-center mb-12">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg p-2">
                <img 
                  src="/WhatsApp Image 2025-06-03 at 6.47.51 PM.png" 
                  alt="Logo" 
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              
              {/* School Name */}
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                Mariscal Sucre
              </h1>
            </div>

            <div className="w-full max-w-md mb-8">
              <LoginForm 
                isLogin={isLogin} 
                isForgotPassword={isForgotPassword}
                onSubmit={handleSubmit} 
                onToggle={handleToggle}
                onForgotPassword={handleForgotPassword}
                onBackToLogin={handleBackToLogin}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'home') {
    return (
      <SchoolHomepage 
        userData={userData} 
        userRole={userRole}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
      />
    );
  }

  return (
    <Dashboard 
      userData={userData} 
      userRole={userRole}
      onLogout={handleLogout}
      initialSection={currentView}
      onNavigateBack={() => setCurrentView('home')}
    />
  );
}

export default App;