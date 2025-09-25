import React, { useState } from 'react';
import { Lock, Mail, UserPlus, LogIn, Eye, EyeOff, ArrowLeft, Send, Key } from 'lucide-react';

interface LoginFormProps {
  isLogin: boolean;
  isForgotPassword: boolean;
  onSubmit: (data: any) => void;
  onToggle: () => void;
  onForgotPassword: () => void;
  onBackToLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  isLogin, 
  isForgotPassword, 
  onSubmit, 
  onToggle, 
  onForgotPassword, 
  onBackToLogin 
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    cedula: '',
    fechaNacimiento: '',
    telefono: '',
    direccion: '',
    rol: 'Representante',
    genero: 'Hombre',
    verificationCode: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [codeSent, setCodeSent] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const correctCode = "123456"; // Código de verificación simulado

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Verificar código automáticamente cuando se ingresa
    if (name === 'verificationCode' && value === correctCode) {
      setCodeVerified(true);
      setErrors(prev => ({ ...prev, verificationCode: '' }));
    } else if (name === 'verificationCode' && value !== correctCode && value.length === correctCode.length) {
      setCodeVerified(false);
      setErrors(prev => ({ ...prev, verificationCode: 'Código incorrecto' }));
    } else if (name === 'verificationCode') {
      setCodeVerified(false);
      setErrors(prev => ({ ...prev, verificationCode: '' }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (isForgotPassword) {
      if (!formData.email.trim()) {
        newErrors.email = 'El correo electrónico es requerido';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'El correo electrónico no es válido';
      }

      if (codeSent) {
        if (!formData.verificationCode.trim()) {
          newErrors.verificationCode = 'El código de verificación es requerido';
        } else if (formData.verificationCode !== correctCode) {
          newErrors.verificationCode = 'Código incorrecto';
        }

        if (codeVerified && !formData.newPassword.trim()) {
          newErrors.newPassword = 'La nueva contraseña es requerida';
        } else if (codeVerified && formData.newPassword.length < 6) {
          newErrors.newPassword = 'La contraseña debe tener al menos 6 caracteres';
        }

        if (codeVerified && !formData.confirmNewPassword.trim()) {
          newErrors.confirmNewPassword = 'Confirma la nueva contraseña';
        } else if (codeVerified && formData.newPassword !== formData.confirmNewPassword) {
          newErrors.confirmNewPassword = 'Las contraseñas no coinciden';
        }
      }
    } else {
      if (!formData.email.trim()) {
        newErrors.email = 'El correo electrónico es requerido';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'El correo electrónico no es válido';
      }

      if (!isLogin) {
        if (!formData.firstName.trim()) {
          newErrors.firstName = 'El nombre es requerido';
        }
        
        if (!formData.cedula.trim()) {
          newErrors.cedula = 'La cédula es requerida';
        } else if (!/^[VE]-?\d{7,8}$/i.test(formData.cedula.replace(/\s/g, ''))) {
          newErrors.cedula = 'La cédula debe tener el formato V-12345678 o E-12345678';
        }
        
        if (!formData.fechaNacimiento.trim()) {
          newErrors.fechaNacimiento = 'La fecha de nacimiento es requerida';
        }
        
        if (!formData.telefono.trim()) {
          newErrors.telefono = 'El teléfono es requerido';
        } else if (!/^0\d{3}-?\d{7}$/.test(formData.telefono.replace(/\s/g, ''))) {
          newErrors.telefono = 'El teléfono debe tener el formato 0414-1234567';
        }
        
        if (!formData.direccion.trim()) {
          newErrors.direccion = 'La dirección es requerida';
        }
      }

      if (!formData.password.trim()) {
        newErrors.password = 'La contraseña es requerida';
      } else if (!isLogin && formData.password.length < 6) {
        newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      }

      if (!isLogin) {
        if (!formData.confirmPassword.trim()) {
          newErrors.confirmPassword = 'Confirma tu contraseña';
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (isForgotPassword && !codeSent) {
        // Simular envío de código
        setCodeSent(true);
        alert('Código de verificación enviado a tu correo electrónico');
      } else if (isForgotPassword && codeSent) {
        // Simular cambio de contraseña
        if (codeVerified) {
          alert('Contraseña cambiada exitosamente');
          onBackToLogin();
          setCodeSent(false);
          setCodeVerified(false);
          setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            cedula: '',
            fechaNacimiento: '',
            telefono: '',
            direccion: '',
            rol: 'Representante',
            genero: 'Hombre',
            verificationCode: '',
            newPassword: '',
            confirmNewPassword: ''
          });
        }
      } else {
        onSubmit(formData);
      }
    }
  };

  const getTitle = () => {
    if (isForgotPassword) {
      return codeSent ? 'Cambiar Contraseña' : 'Recuperar Contraseña';
    }
    return isLogin ? 'Iniciar Sesión' : 'Registro';
  };

  const getSubtitle = () => {
    if (isForgotPassword) {
      return codeSent ? 'Ingresa tu nueva contraseña' : 'Te enviaremos un código de verificación';
    }
    return isLogin ? 'Bienvenido de vuelta' : 'Únete a nuestra comunidad escolar';
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-sm bg-white/95">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <img 
              src="/WhatsApp Image 2025-06-03 at 6.47.51 PM.png" 
              alt="Logo" 
              className="w-12 h-12 object-contain rounded-full"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {getTitle()}
          </h2>
          <p className="text-gray-600">
            {getSubtitle()}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Back button for forgot password */}
          {isForgotPassword && (
            <button
              type="button"
              onClick={onBackToLogin}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio de sesión
            </button>
          )}

          {/* Name field for registration */}
          {!isLogin && !isForgotPassword && (
            <div>
              <div className="relative">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Nombre completo"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
          )}

          {/* Cedula field for registration */}
          {!isLogin && !isForgotPassword && (
            <div>
              <div className="relative">
                <input
                  type="text"
                  name="cedula"
                  value={formData.cedula}
                  onChange={handleChange}
                  placeholder="Cédula (V-12345678)"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                    errors.cedula ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.cedula && (
                <p className="text-red-500 text-sm mt-1">{errors.cedula}</p>
              )}
            </div>
          )}

          {/* Fecha de nacimiento field for registration */}
          {!isLogin && !isForgotPassword && (
            <div>
              <div className="relative">
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                    errors.fechaNacimiento ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.fechaNacimiento && (
                <p className="text-red-500 text-sm mt-1">{errors.fechaNacimiento}</p>
              )}
            </div>
          )}

          {/* Telefono field for registration */}
          {!isLogin && !isForgotPassword && (
            <div>
              <div className="relative">
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Teléfono (0414-1234567)"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                    errors.telefono ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.telefono && (
                <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>
              )}
            </div>
          )}

          {/* Direccion field for registration */}
          {!isLogin && !isForgotPassword && (
            <div>
              <div className="relative">
                <textarea
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  placeholder="Dirección completa"
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all resize-none ${
                    errors.direccion ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.direccion && (
                <p className="text-red-500 text-sm mt-1">{errors.direccion}</p>
              )}
            </div>
          )}

          {/* Rol field for registration */}
          {!isLogin && !isForgotPassword && (
            <div>
              <div className="relative">
                <select
                  name="rol"
                  value={formData.rol}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-white"
                >
                  <option value="Representante">Representante</option>
                  <option value="Docente">Docente</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
          )}

          {/* Genero field for registration */}
          {!isLogin && !isForgotPassword && (
            <div>
              <div className="relative">
                <select
                  name="genero"
                  value={formData.genero}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all bg-white"
                >
                  <option value="Hombre">Hombre</option>
                  <option value="Mujer">Mujer</option>
                </select>
              </div>
            </div>
          )}

          {/* Email field */}
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo electrónico"
                className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password field for login/register */}
          {!isForgotPassword && (
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Contraseña"
                  className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          )}

          {/* Confirm password field for registration */}
          {!isLogin && !isForgotPassword && (
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirmar contraseña"
                  className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          {/* Forgot password link for login */}
          {isLogin && !isForgotPassword && (
            <div className="text-left">
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-green-500 hover:text-green-600 text-sm transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}

          {/* Verification code field for forgot password */}
          {isForgotPassword && codeSent && (
            <div>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="verificationCode"
                  value={formData.verificationCode}
                  onChange={handleChange}
                  placeholder="Código de verificación (123456)"
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                    errors.verificationCode ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.verificationCode && (
                <p className="text-red-500 text-sm mt-1">{errors.verificationCode}</p>
              )}
            </div>
          )}

          {/* New password fields for forgot password */}
          {isForgotPassword && codeSent && (
            <>
              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    disabled={!codeVerified}
                    placeholder="Nueva contraseña"
                    className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                      errors.newPassword ? 'border-red-500' : 'border-gray-300'
                    } ${!codeVerified ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  />
                  <button
                    type="button"
                    disabled={!codeVerified}
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors ${
                      !codeVerified ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                )}
              </div>

              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmNewPassword ? 'text' : 'password'}
                    name="confirmNewPassword"
                    value={formData.confirmNewPassword}
                    onChange={handleChange}
                    disabled={!codeVerified}
                    placeholder="Confirmar nueva contraseña"
                    className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                      errors.confirmNewPassword ? 'border-red-500' : 'border-gray-300'
                    } ${!codeVerified ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                  />
                  <button
                    type="button"
                    disabled={!codeVerified}
                    onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors ${
                      !codeVerified ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {showConfirmNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmNewPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmNewPassword}</p>
                )}
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isForgotPassword && codeSent && !codeVerified}
            className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
              isForgotPassword && codeSent && !codeVerified
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-green-500 hover:bg-green-600 text-white transform hover:scale-105'
            }`}
          >
            {isForgotPassword ? (
              codeSent ? (
                <>
                  <Key className="w-5 h-5" />
                  Cambiar Contraseña
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Enviar Código de Verificación
                </>
              )
            ) : isLogin ? (
              <>
                <LogIn className="w-5 h-5" />
                Iniciar Sesión
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5" />
                Registrarse
              </>
            )}
          </button>
        </form>

        {!isForgotPassword && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            </p>
            <button
              onClick={onToggle}
              className="mt-2 text-green-500 hover:text-green-600 font-semibold transition-colors"
            >
              {isLogin ? 'Registrarse aquí' : 'Iniciar sesión aquí'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;