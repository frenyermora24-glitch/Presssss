import React from 'react';
import { CheckCircle, Home } from 'lucide-react';

interface SuccessMessageProps {
  isLogin: boolean;
  userData: any;
  onReset: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ isLogin, userData, onReset }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-white/95 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isLogin ? '¡Bienvenido!' : '¡Registro Exitoso!'}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {isLogin 
            ? `Hola, has iniciado sesión correctamente.`
            : `Hola ${userData.firstName}, tu cuenta ha sido creada exitosamente.`
          }
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">Datos del usuario:</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Email:</strong> {userData.email}</p>
            {!isLogin && (
              <p><strong>Nombre:</strong> {userData.firstName}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={onReset}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Ir al Panel Principal
          </button>
          
          <button
            onClick={onReset}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition-all duration-200"
          >
            Volver al Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;