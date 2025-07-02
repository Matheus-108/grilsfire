
"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Lock, Heart, Copy, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function ChatPage() {
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
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
        title="Atendimento Interativo com Typebot"
      ></iframe>
      
      <Dialog open={isPaymentModalOpen} onOpenChange={setPaymentModalOpen}>
        <DialogContent className="bg-card border-primary">
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center text-center font-headline text-2xl">
              <Lock className="w-10 h-10 text-primary animate-pulse my-4" />
              Desbloquear o WhatsApp da Letycia
            </DialogTitle>
            <DialogDescription className="text-center text-lg py-4">
              Por segurança, confirme seu perfil com um Pix de <strong>R$19,90</strong>. Após isso, receba o WhatsApp da Letycia e continue sem limites.
            </DialogDescription>
          </DialogHeader>
          <div className="text-center p-4 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground">Chave PIX E-mail:</p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <p className="font-mono text-lg text-primary-foreground">{paymentDetails}</p>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(paymentDetails, 'Chave PIX copiada!')}>
                  <Copy className="w-5 h-5" />
                </Button>
              </div>
          </div>
          <Button onClick={handlePaymentConfirmation} size="lg" className="w-full mt-4 bg-primary text-primary-foreground animate-shimmer">
            <Heart className="mr-2 fill-red-500"/> Já paguei, confirmar!
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
