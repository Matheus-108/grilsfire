
"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Copy, Check, CheckCircle2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { getModelByName, getAllModels } from '@/lib/models';
import type { Model } from '@/lib/models';

function ChatContent() {
  const searchParams = useSearchParams();
  const modelName = searchParams.get('model');
  const allModels = getAllModels();
  // Fallback to the first model if no name is provided or the model is not found
  const [model, setModel] = useState<Model>(getModelByName(modelName || '') || allModels[0]);
  
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [pixCode, setPixCode] = useState('');
  const { toast } = useToast();

  const paymentDetails = 'suportepro29@gmail.com'; // As defined in the AI prompt
  const finalWhatsappNumber = '+55 13 98110-1588'; // As defined in the AI prompt

  useEffect(() => {
    const newModel = getModelByName(modelName || '') || allModels[0];
    setModel(newModel);
  }, [modelName, allModels]);
  
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
       <div className="flex flex-col items-center justify-center w-full min-h-screen bg-black p-4 font-sans">
        <div className="bg-[#0D0D0D] text-white max-w-sm w-full p-5 rounded-2xl shadow-[0_0_30px_rgba(50,255,50,0.3)] border border-green-500/20">
          <div className="text-center mb-4">
            <span className="text-4xl" role="img" aria-label="Festa">🎉</span>
            <h2 className="text-3xl font-bold text-green-400 mt-2">Pagamento Confirmado!</h2>
            <p className="text-gray-300 mt-1">Agora você tem acesso total à {model.name}! 🔥</p>
          </div>

          <div className="relative my-4">
            <Image
              src={model.imageUrl}
              alt={`Foto de ${model.name}`}
              width={400}
              height={500}
              className="rounded-lg w-full h-auto object-cover aspect-[4/5]"
              data-ai-hint="woman posing"
            />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
              ✨ Conteúdo desbloqueado!
            </div>
          </div>
          
          <div className="bg-[#1a1a1a] border border-green-500/30 rounded-lg p-3 text-center my-4">
            <p className="text-sm text-gray-400">WhatsApp da {model.name}:</p>
            <p className="text-2xl font-bold my-1 tracking-widest">{whatsappNumber}</p>
            <p className="text-xs text-gray-400">Clique para conversar agora</p>
          </div>

          <div className="flex flex-col gap-3">
             <a href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button size="lg" className="w-full bg-green-500 hover:bg-green-600 text-black font-bold text-base h-12">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                Abrir WhatsApp da {model.name}
              </Button>
            </a>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => copyToClipboard(whatsappNumber, 'Número copiado!')} 
              className="w-full bg-transparent border-gray-600 hover:bg-gray-800 text-white font-semibold text-base h-12"
            >
              <Copy className="mr-2" /> Copiar Número
            </Button>
          </div>

          <div className="bg-gradient-to-br from-fuchsia-600/20 to-pink-600/20 border border-fuchsia-500/30 rounded-lg p-4 text-center my-4 text-sm">
            <p>
              <span role="img" aria-label="Beijo">💋</span> "Não vejo a hora de conversar com você no meu WhatsApp... Te prometo que vai ser muito especial! 🔥"
            </p>
            <p className="font-bold mt-2">- {model.name}</p>
          </div>

          <div className="text-center text-xs text-gray-400 flex items-center justify-center gap-2 mt-4 flex-wrap">
            <Check className="w-4 h-4 text-green-400"/>
            <span>Acesso liberado</span>
            <span className="hidden sm:inline">•</span>
            <span>Chat sem limites</span>
            <span className="hidden sm:inline">•</span>
            <span>Conteúdo exclusivo</span>
          </div>
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
        <DialogContent className="bg-[#1a1a1a] text-white border-none shadow-[0_0_30px_5px_rgba(192,38,211,0.2)] p-4 sm:p-6 font-sans w-full max-w-[calc(100vw-2rem)] sm:max-w-sm rounded-2xl max-h-[95vh] overflow-y-auto">
          <DialogHeader className="items-center text-center space-y-2">
            <div className="p-3 bg-gradient-to-br from-fuchsia-600 to-pink-600 rounded-full mb-2">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent break-words">
              Desbloquear WhatsApp da {model.name}
            </DialogTitle>
            <DialogDescription className="text-gray-400 text-sm sm:text-base text-center break-words">
              Por segurança, confirme seu perfil com um PIX de R$19,90
            </DialogDescription>
          </DialogHeader>
          
          <div className="text-center my-4 p-4 bg-black/20 rounded-lg">
            <Lock className="mx-auto w-5 h-5 text-gray-400" />
            <h4 className="font-bold text-gray-200 mt-1">Conteúdo Bloqueado</h4>
            <p className="text-sm text-gray-400">Confirme o pagamento para ver</p>
          </div>

          <div className="bg-black/30 border border-purple-500/30 rounded-lg p-4 my-4 space-y-3">
            <h4 className="font-bold text-center text-gray-200 mb-3">Após a confirmação você recebe:</h4>
            <div className="flex items-start gap-2 text-gray-200 text-sm">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span>WhatsApp pessoal da {model.name}</span>
            </div>
            <div className="flex items-start gap-2 text-gray-200 text-sm">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span>Fotos exclusivas e picantes 🔥</span>
            </div>
            <div className="flex items-start gap-2 text-gray-200 text-sm">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span>Chat sem limites 24h</span>
            </div>
             <div className="flex items-start gap-2 text-gray-200 text-sm">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span>Conteúdo personalizado 💋</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-400">Chave PIX (E-mail):</label>
              <div className="flex items-center bg-[#2d2d2d] p-1 pl-4 rounded-lg mt-1">
                <span className="flex-1 font-mono text-gray-200 text-sm break-all">{paymentDetails}</span>
                <Button onClick={() => copyToClipboard(paymentDetails, 'Chave PIX copiada!')} className="bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white font-bold py-2 px-4 rounded-md text-sm shrink-0">
                  Copiar
                </Button>
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-400">Código de confirmação do PIX:</label>
               <Input
                  type="text"
                  value={pixCode}
                  onChange={(e) => setPixCode(e.target.value)}
                  placeholder="Cole aqui o código do seu PIX..."
                  className="bg-[#2d2d2d] border-none text-white mt-1 h-12"
                />
              <p className="text-xs text-gray-500 mt-1">*Digite qualquer código após fazer o PIX</p>
            </div>
          </div>

          <Button
            onClick={handlePaymentConfirmation}
            disabled={!pixCode}
            size="lg"
            className="w-full mt-6 bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white font-bold text-base h-14 hover:from-fuchsia-700 hover:to-pink-700 disabled:opacity-50"
          >
            <span className="mr-2">💖</span> Confirmar Pagamento - R$ 19,90
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

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen bg-background flex items-center justify-center">Carregando...</div>}>
      <ChatContent />
    </Suspense>
  );
}
