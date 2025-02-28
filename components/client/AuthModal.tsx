"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AuthFormData {
  email: string;
  password: string;
}

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal = ({ onClose }: AuthModalProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<AuthFormData>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const onSubmit = async (data: AuthFormData) => {
    setLoading(true);
    setErrorMessage("");
    
    try {
      if (activeTab === "login") {
        // Login logic
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password
        });
        if (error) throw error;
      } else {
        // Signup logic
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password
        });
        if (error) throw error;
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Authentication error");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) throw error;
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Authentication error");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (email: string) => {
    if (!email) {
      toast({
        variant: "destructive", 
        title: "Error", 
        description: "Por favor, ingresa tu correo electrónico"
      });
      return;
    }

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
        <DialogContent className="sm:max-w-md mx-auto bg-black/80 rounded-xl p-6 shadow-xl backdrop-blur-md border border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <DialogHeader className="space-y-2 text-center mb-4">
              <DialogTitle className="text-2xl font-bold text-white">
                Revisa tu correo
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-400">
                Te hemos enviado instrucciones para restablecer tu contraseña
              </DialogDescription>
            </DialogHeader>
            <Button 
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all"
            >
              Entendido
            </Button>
          </motion.div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 mx-auto rounded-xl overflow-hidden bg-black/80 backdrop-blur-md border border-white/10 shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="p-6"
          >
            <DialogHeader className="space-y-2 text-center mb-6">
              <DialogTitle className="text-2xl font-bold text-white">
                {activeTab === "login" ? 'Iniciar sesión' : 'Crear cuenta'}
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-400">
                {activeTab === "login" 
                  ? 'Accede a tu cuenta para continuar' 
                  : 'Únete a SafeCircle para empezar'
                }
              </DialogDescription>
            </DialogHeader>

            <Tabs 
              defaultValue="login" 
              value={activeTab} 
              onValueChange={(value) => setActiveTab(value as "login" | "register")}
              className="w-full mb-6"
            >
              <TabsList className="grid w-full grid-cols-2 bg-black/40">
                <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
                <TabsTrigger value="register">Registrarse</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="email-login" className="text-sm text-gray-300">
                        Correo electrónico
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="email-login"
                          type="email"
                          placeholder="tu@correo.com"
                          autoComplete="email"
                          {...register('email', { 
                            required: 'Correo requerido',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Correo electrónico inválido'
                            }
                          })}
                          className={cn(
                            'pl-10 h-10 bg-black/20',
                            'border-white/10 focus:border-blue-500',
                            'focus:ring focus:ring-blue-500/20',
                            errors.email && 'border-red-500 focus:ring-red-500/20'
                          )}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-400 text-xs">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <Label htmlFor="password-login" className="text-sm text-gray-300">
                          Contraseña
                        </Label>
                        <button
                          type="button"
                          onClick={() => handleForgotPassword(getValues("email"))}
                          className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          ¿Olvidaste?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="password-login"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          autoComplete="current-password"
                          {...register('password', { 
                            required: 'Contraseña requerida',
                            minLength: {
                              value: 6,
                              message: 'Mínimo 6 caracteres'
                            }
                          })}
                          className={cn(
                            'pl-10 pr-10 h-10 bg-black/20',
                            'border-white/10 focus:border-blue-500',
                            'focus:ring focus:ring-blue-500/20',
                            errors.password && 'border-red-500 focus:ring-red-500/20'
                          )}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-400 text-xs">{errors.password.message}</p>
                      )}
                    </div>
                  </div>
                  
                  {errorMessage && (
                    <div className="p-2 rounded bg-red-500/10 text-red-400 text-xs border border-red-500/20">
                      {errorMessage}
                    </div>
                  )}

                  <Button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Iniciar sesión'
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="email-register" className="text-sm text-gray-300">
                        Correo electrónico
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="email-register"
                          type="email"
                          placeholder="tu@correo.com"
                          autoComplete="email"
                          {...register('email', { 
                            required: 'Correo requerido',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Correo electrónico inválido'
                            }
                          })}
                          className={cn(
                            'pl-10 h-10 bg-black/20',
                            'border-white/10 focus:border-blue-500',
                            'focus:ring focus:ring-blue-500/20',
                            errors.email && 'border-red-500 focus:ring-red-500/20'
                          )}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-400 text-xs">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="password-register" className="text-sm text-gray-300">
                        Contraseña
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="password-register"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          autoComplete="new-password"
                          {...register('password', { 
                            required: 'Contraseña requerida',
                            minLength: {
                              value: 6,
                              message: 'Mínimo 6 caracteres'
                            }
                          })}
                          className={cn(
                            'pl-10 pr-10 h-10 bg-black/20',
                            'border-white/10 focus:border-blue-500',
                            'focus:ring focus:ring-blue-500/20',
                            errors.password && 'border-red-500 focus:ring-red-500/20'
                          )}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-400 text-xs">{errors.password.message}</p>
                      )}
                    </div>
                  </div>
                  
                  {errorMessage && (
                    <div className="p-2 rounded bg-red-500/10 text-red-400 text-xs border border-red-500/20">
                      {errorMessage}
                    </div>
                  )}

                  <Button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Crear cuenta'
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-black/80 px-2 text-gray-400">
                  O continuar con
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                type="button"
                variant="outline"
                onClick={() => handleOAuth('google')}
                disabled={loading}
                className="bg-transparent border border-white/10 hover:bg-white/5 text-white h-10"
              >
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
                className="bg-transparent border border-white/10 hover:bg-white/5 text-white h-10"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
