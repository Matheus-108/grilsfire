
"use client";

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Copy, Check, CheckCircle2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { getModelByName, getAllModels } from '@/lib/models';
import type { Model } from '@/lib/models';

function ChatPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modelName = searchParams.get('model');
  const allModels = getAllModels();
  const [model, setModel] = useState<Model>(getModelByName(modelName || '') || allModels[0]);
  
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [pixCode, setPixCode] = useState('');
  const { toast } = useToast();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const paymentDetails = 'suportepro29@gmail.com'; // As defined in the AI prompt

  useEffect(() => {
    const newModel = getModelByName(modelName || '') || allModels[0];
    setModel(newModel);
  }, [modelName, allModels]);
  
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Segurança: opcionalmente, verifique a origem do evento
      // if (event.origin !== 'https://typebot.io') return;
      
      if (event.data === 'openPaymentModal-6') {
        console.log("Received openPaymentModal-6 event. Opening modal.");
        setPaymentModalOpen(true);
      }
    };
    
    // Adiciona o listener de mensagens
    window.addEventListener('message', handleMessage);

    // Limpeza do evento ao desmontar o componente
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []); // O array de dependências vazio garante que isso rode apenas uma vez

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
    router.push(`/success?model=${encodeURIComponent(model.name)}`);
  };

  return (
    <div className="w-full h-screen bg-background">
      <iframe
        ref={iframeRef}
        src="https://typebot.io/funil-isa-64b8rfv"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title="Chatbot"
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
      <ChatPageContent />
    </Suspense>
  );
}
