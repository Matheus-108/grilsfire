
"use client";

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { getModelByName, type Model, getAllModels } from '@/lib/models';

function SuccessContent() {
    const searchParams = useSearchParams();
    const modelName = searchParams.get('model');
    const [model, setModel] = useState<Model | null>(null);
    const { toast } = useToast();
    const whatsappNumber = '+55 13 98110-1588';

    useEffect(() => {
        if (modelName) {
            const foundModel = getModelByName(modelName);
            setModel(foundModel || getAllModels()[0]);
        } else {
            setModel(getAllModels()[0]);
        }
    }, [modelName]);

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

    if (!model) {
        return <div className="w-full h-screen bg-black flex items-center justify-center text-white">Carregando...</div>;
    }

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
             <a href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=Oi%2C%20${model.name}!%20Te%20encontrei%20no%20site.`} target="_blank" rel="noopener noreferrer" className="w-full">
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

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="w-full h-screen bg-black flex items-center justify-center text-white">Carregando...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
