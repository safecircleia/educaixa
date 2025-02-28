"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

interface DemoWarningDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

const DemoWarningDialog = ({ isOpen, onClose, onAccept }: DemoWarningDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <DialogContent className="sm:max-w-[425px] bg-red-950/70 border border-red-500/20 p-6 rounded-lg shadow-xl backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }} 
              transition={{ duration: 0.3 }}
            >
              <DialogHeader className="space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <DialogTitle className="text-center text-red-50">Aviso Importante</DialogTitle>
                <div className="text-center space-y-2 text-sm text-muted-foreground">
                  <p className="text-red-200/90">
                    Esta es una versión de demostración del producto que está en desarrollo activo y está sujeta a cambios.
                  </p>
                  <p className="text-red-200/90">
                    El análisis de IA actual no está completamente refinado y su precisión puede variar. Los resultados no deben considerarse definitivos.
                  </p>
                </div>
              </DialogHeader>
              <div className="flex flex-col gap-4 mt-4">
                <Button 
                  onClick={onAccept}
                  className="w-full bg-red-500 hover:bg-red-600 text-white border-none transition-transform transform hover:scale-105"
                >
                  Entiendo y deseo continuar
                </Button>
                <Button 
                  onClick={onClose}
                  variant="ghost" 
                  className="w-full text-red-200 hover:text-red-100 hover:bg-red-500/10 transition-transform transform hover:scale-105"
                >
                  Cancelar
                </Button>
              </div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default DemoWarningDialog;