"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface AuthFormData {
  email: string;
  password: string;
}

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal = ({ onClose }: AuthModalProps) => {
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<AuthFormData>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const onSubmit = async (data: AuthFormData) => {
    setLoading(true);
    setErrorMessage("");
    if (isLogin) {
      // Login logic
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });
      if (error) setErrorMessage(error.message);
    } else {
      // Signup logic
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password
      });
      if (error) setErrorMessage(error.message);
    }
    setLoading(false);
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) setErrorMessage(error.message);
    setLoading(false);
  };

  const handleForgotPassword = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      toast({
        title: "Email enviado",
        description: "Revisa tu correo para restablecer tu contraseña"
      });
      setIsPasswordReset(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo enviar el correo de recuperación"
      });
    } finally {
      setLoading(false);
    }
  };

  if (isPasswordReset) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md mx-auto bg-background/95 rounded-xl p-8 shadow-2xl backdrop-blur-sm border border-border/30">
          <DialogHeader className="space-y-3 text-center mb-6">
            <DialogTitle className="text-[28px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#2A5CAA] to-blue-400">
              Revisa tu correo
            </DialogTitle>
            <DialogDescription className="text-[15px] text-[#6B7280]">
              Te hemos enviado instrucciones para restablecer tu contraseña
            </DialogDescription>
          </DialogHeader>
          <Button 
            onClick={onClose}
            className="w-full bg-[#2A5CAA] hover:bg-[#234B88] transition-all duration-200 shadow-md shadow-blue-500/20"
          >
            Entendido
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <AnimatePresence>
        <DialogContent
          className="sm:max-w-md mx-auto bg-gradient-to-b from-background/95 to-background/98 rounded-xl p-8 shadow-2xl backdrop-blur-md border border-white/10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ 
              duration: 0.2,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <DialogHeader className="space-y-3 text-center mb-6">
              <DialogTitle 
                className="text-[28px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#2A5CAA] to-blue-400"
              >
                {isLogin ? 'Bienvenido de nuevo' : 'Crear cuenta'}
              </DialogTitle>
              <DialogDescription className="text-[15px] text-[#6B7280]">
                {isLogin ? 'Ingresa tus credenciales para continuar' : 'Ingresa tus datos para unirte a SafeCircle'}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex justify-center space-x-4 mb-6">
                <Button
                  type="button"
                  variant={isLogin ? 'default' : 'outline'}
                  className={cn(
                    'w-32 transition-all duration-200 py-2.5',
                    isLogin ? 'bg-[#2A5CAA] hover:bg-[#234B88] shadow-md shadow-blue-500/20' : 'border-[#2A5CAA] text-[#2A5CAA] hover:bg-blue-50/10'
                  )}
                  onClick={() => setIsLogin(true)}
                >
                  Iniciar Sesión
                </Button>
                <Button
                  type="button"
                  variant={!isLogin ? 'default' : 'outline'}
                  className={cn(
                    'w-32 transition-all duration-200 py-2.5',
                    !isLogin ? 'bg-[#2A5CAA] hover:bg-[#234B88] shadow-md shadow-blue-500/20' : 'border-[#2A5CAA] text-[#2A5CAA] hover:bg-blue-50/10'
                  )}
                  onClick={() => setIsLogin(false)}
                >
                  Registrarse
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-200">
                    Correo Electrónico
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu-correo@ejemplo.com"
                      {...register('email', { 
                        required: 'El correo es requerido',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Correo electrónico inválido'
                        }
                      })}
                      className={cn(
                        'pl-10 bg-black/40 backdrop-blur-sm h-11',
                        'border-white/10 hover:border-white/20',
                        'transition-all duration-200',
                        'focus:ring-2 focus:ring-[#2A5CAA] focus:border-[#2A5CAA]',
                        'placeholder:text-gray-500 placeholder:opacity-50',
                        'focus:placeholder:opacity-0',
                        'autofill:bg-black/40 autofill:text-white',
                        '[&:-webkit-autofill]:bg-black/40 [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0_30px_rgb(0,0,0,0.4)_inset]',
                        errors.email && 'border-red-500 focus:ring-red-500'
                      )}
                      aria-label="Correo electrónico"
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="text-red-500 text-sm flex items-center gap-2"
                    >
                      <span className="h-1 w-1 rounded-full bg-red-500 animate-pulse"></span>
                      {errors.email.message}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-200">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...register('password', { 
                        required: 'La contraseña es requerida',
                        minLength: {
                          value: 6,
                          message: 'La contraseña debe tener al menos 6 caracteres'
                        }
                      })}
                      className={cn(
                        'pl-10 pr-10 bg-black/40 backdrop-blur-sm h-11',
                        'border-white/10 hover:border-white/20',
                        'transition-all duration-200',
                        'focus:ring-2 focus:ring-[#2A5CAA] focus:border-[#2A5CAA]',
                        'placeholder:text-gray-500 placeholder:opacity-50',
                        'focus:placeholder:opacity-0',
                        'autofill:bg-black/40 autofill:text-white',
                        '[&:-webkit-autofill]:bg-black/40 [&:-webkit-autofill]:text-white [&:-webkit-autofill]:shadow-[0_0_0_30px_rgb(0,0,0,0.4)_inset]',
                        errors.password && 'border-red-500 focus:ring-red-500'
                      )}
                      aria-label="Contraseña"
                      autoComplete={isLogin ? 'current-password' : 'new-password'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="text-red-500 text-sm flex items-center gap-2"
                    >
                      <span className="h-1 w-1 rounded-full bg-red-500 animate-pulse"></span>
                      {errors.password.message}
                    </motion.p>
                  )}
                </div>
              </div>

              {errorMessage && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2"
                >
                  <span className="h-2 w-2 rounded-full bg-red-500"></span>
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                </motion.div>
              )}

              <Button 
                type="submit" 
                disabled={loading}
                className={cn(
                  'w-full h-11 bg-[#2A5CAA] hover:bg-[#234B88]',
                  'transition-all duration-200',
                  'shadow-md shadow-blue-500/20',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <motion.div 
                      animate={{ 
                        rotate: 360,
                        scale: [1, 0.8, 1],
                      }} 
                      transition={{ 
                        rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
                        scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  </div>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                  </>
                )}
              </Button>

              {isLogin && (
                <button
                  type="button"
                  onClick={() => handleForgotPassword(getValues("email"))}
                  className="w-full text-sm text-[#6B7280] hover:text-[#2A5CAA] hover:underline transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              )}

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-[#E5E7EB]/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-[#6B7280]">
                    O continuar con
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => handleOAuth('google')}
                  disabled={loading}
                  className="relative overflow-hidden bg-white/5 hover:bg-white/10 border-[#E5E7EB]/20 hover:border-[#E5E7EB]/30 text-[#1F2937] transition-all duration-200 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => handleOAuth('github')}
                  disabled={loading}
                  className="relative overflow-hidden bg-white/5 hover:bg-white/10 border-[#E5E7EB]/20 hover:border-[#E5E7EB]/30 transition-all duration-200 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </div>
            </form>
          </motion.div>
        </DialogContent>
      </AnimatePresence>
    </Dialog>
  );
};

export default AuthModal;
