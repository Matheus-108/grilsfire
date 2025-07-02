
"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Heart, Copy, Check, CheckCircle2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function ChatPage() {
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [pixCode, setPixCode] = useState('');
  const { toast } = useToast();

  const paymentDetails = 'suportepro29@gmail.com'; // As defined in the AI prompt
  const finalWhatsappNumber = '+13981101588'; // As defined in the AI prompt

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // For security, check origin in a production app
      // if (event.origin !== 'https://typebot.io') return;

      if (event.data === 'showPaymentModal') {
        setPaymentModalOpen(true);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const copyToClipboard = (text: string, successMessage: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: (
        <div className="flex items-center gap-2">
          <Check className="text-green-500" />
          <span className="font-bold">{successMessage}</span>
        </div>
      ),
      className: "bg-primary-foreground text-background"
    });
  };

  const handlePaymentConfirmation = () => {
    setWhatsappNumber(finalWhatsappNumber);
    setPaymentModalOpen(false);
  };

  // If WhatsApp is unlocked, show the success screen
  if (whatsappNumber) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-background p-4">
        <div className="text-center p-6 bg-card rounded-2xl max-w-md w-full shadow-lg shadow-primary/20 animate-in fade-in zoom-in-95">
          <h3 className="font-headline text-2xl text-green-400">WhatsApp Desbloqueado!</h3>
          <p className="mt-4 text-lg">Clique para copiar meu número e vamos conversar! 💋</p>
          <Button onClick={() => copyToClipboard(whatsappNumber, 'WhatsApp copiado!')} size="lg" className="mt-6 bg-green-500 hover:bg-green-600 text-white w-full">
            <Copy className="mr-2" /> {whatsappNumber}
          </Button>
        </div>
      </div>
    );
  }

  // Otherwise, show the full-screen chatbot iframe
  return (
    <div className="w-full h-screen bg-background">
      <iframe
        src="https://typebot.io/funil-isa-64b8rfv"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      ></iframe>
      
      <Dialog open={isPaymentModalOpen} onOpenChange={setPaymentModalOpen}>
        <DialogContent className="bg-[#1a1a1a] text-white border-none shadow-[0_0_30px_5px_rgba(192,38,211,0.2)] p-6 font-sans max-w-sm mx-auto rounded-2xl">
          <DialogHeader className="items-center text-center space-y-2">
            <div className="p-3 bg-gradient-to-br from-fuchsia-600 to-pink-600 rounded-full mb-2">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Desbloquear WhatsApp da Letycia
            </DialogTitle>
            <DialogDescription className="text-gray-400 text-base text-center">
              Por segurança, confirme seu perfil com um PIX de R$10,00
            </DialogDescription>
          </DialogHeader>

          <div className="bg-black/30 border border-purple-500/30 rounded-lg p-4 my-4 space-y-2">
            <h4 className="font-bold text-center text-gray-200 mb-3">Após a confirmação você recebe:</h4>
            <div className="flex items-center gap-2 text-gray-200">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span>WhatsApp pessoal da Letycia</span>
            </div>
            <div className="flex items-center gap-2 text-gray-200">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span>Fotos exclusivas e picantes 🔥</span>
            </div>
            <div className="flex items-center gap-2 text-gray-200">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span>Chat sem limites 24h</span>
            </div>
             <div className="flex items-center gap-2 text-gray-200">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span>Conteúdo personalizado 💋</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-400">Chave PIX (E-mail):</label>
              <div className="flex items-center bg-[#2d2d2d] p-1 pl-4 rounded-lg mt-1">
                <span className="flex-1 font-mono text-gray-200">{paymentDetails}</span>
                <Button onClick={() => copyToClipboard(paymentDetails, 'Chave PIX copiada!')} className="bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white font-bold py-2 px-4 rounded-md text-sm">
                  Copiar
                </Button>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-semibold text-gray-400">Código de confirmação do PIX:</label>
              <Input
                value={pixCode}
                onChange={(e) => setPixCode(e.target.value)}
                placeholder="Cole aqui o código do seu PIX..."
                className="bg-[#2d2d2d] border-gray-600 text-white mt-1 h-12"
              />
              <p className="text-xs text-gray-500 mt-1">*Digite qualquer código após fazer o PIX</p>
            </div>
          </div>

          <Button
            onClick={handlePaymentConfirmation}
            size="lg"
            className="w-full mt-6 bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white font-bold text-lg h-14 disabled:opacity-50 disabled:cursor-not-allowed hover:from-fuchsia-700 hover:to-pink-700"
          >
            <span className="mr-2">💖</span> Confirmar Pagamento - R$ 10,00
          </Button>
          
          <p className="text-xs text-center text-gray-500 mt-2">
            <Lock className="inline w-3 h-3 mr-1" />
            Pagamento 100% seguro • Satisfaction garantida
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
