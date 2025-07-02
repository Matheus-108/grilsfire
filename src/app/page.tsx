
"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Folder, MessageCircle, Camera, Video, TrendingUp, ChevronLeft, ChevronRight, X, Star, CheckCircle2 } from 'lucide-react';
import { ParticlesBackground } from '@/components/particles-background';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';


type Model = {
  name: string;
  photos: number;
  videos: number;
  conversion: number;
  imageUrl: string;
  isOnline?: boolean;
  packImages?: string[];
};

const models: Model[] = [
  { name: 'Camila Santos', photos: 889, videos: 106, conversion: 98.2, imageUrl: 'https://i.imgur.com/4AtEyYU.jpeg', isOnline: true },
  { name: 'Ana Lopes', photos: 760, videos: 88, conversion: 97.5, imageUrl: 'https://i.imgur.com/7zr5mSM.png', packImages: ['https://i.imgur.com/IESQs9e.png', 'https://i.imgur.com/iyZQuMq.png', 'https://i.imgur.com/oaBNCCP.png'] },
  { name: 'Júlia Lima', photos: 920, videos: 112, conversion: 99.1, imageUrl: 'https://i.imgur.com/NrDNobZ.png', isOnline: true, packImages: ['https://i.imgur.com/kbg9g66.png', 'https://i.imgur.com/297lNzN.png', 'https://i.imgur.com/jjTu1AP.png'] },
  { name: 'Larissa Melo', photos: 815, videos: 97, conversion: 96.4, imageUrl: 'https://i.imgur.com/Tr56Ory.png', packImages: ['https://i.imgur.com/xcqQIRW.png', 'https://i.imgur.com/NJz3OmP.png', 'https://i.imgur.com/jGbAsFW.png'] },
  { name: 'Bianca Cruz', photos: 780, videos: 102, conversion: 97.8, imageUrl: 'https://i.imgur.com/mkCX0mf.png', isOnline: true, packImages: ['https://i.imgur.com/tPGHIkE.png', 'https://i.imgur.com/0WW0nMH.png', 'https://i.imgur.com/8CnzcQ9.png'] },
  { name: 'Natália Reis', photos: 833, videos: 93, conversion: 98.6, imageUrl: 'https://i.imgur.com/oSObgKj.png', packImages: ['https://i.imgur.com/Ckw8Dgd.png', 'https://i.imgur.com/ammIMac.png', 'https://i.imgur.com/t6tTf7H.png'] },
  { name: 'Rebeca Martins', photos: 802, videos: 84, conversion: 95.2, imageUrl: 'https://i.imgur.com/ZGaW7JT.png', isOnline: true },
  { name: 'Vanessa Silva', photos: 945, videos: 120, conversion: 99.8, imageUrl: 'https://i.imgur.com/ytt7dqR.png', isOnline: true },
  { name: 'Isabela Rocha', photos: 879, videos: 100, conversion: 96.9, imageUrl: 'https://i.imgur.com/kKyoKlq.png', packImages: ['https://i.imgur.com/DYeU0Hz.png', 'https://i.imgur.com/sCthPlq.png', 'https://i.imgur.com/BhFifQ8.png'] },
];

const PackModal = ({ model, onClose }: { model: Model; onClose: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!model.packImages || model.packImages.length === 0) {
    return null;
  }

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % model.packImages!.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + model.packImages!.length) % model.packImages!.length);
  };

  return (
    <Dialog open={true} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="bg-[#1f2128] border-none text-white p-0 max-w-sm w-full rounded-2xl flex flex-col max-h-[90vh]">
        <DialogHeader className="sr-only">
          <DialogTitle>Detalhes do Pack de {model.name}</DialogTitle>
        </DialogHeader>
        {/* PHOTOS */}
        <div className="relative aspect-[3/4] flex-shrink-0">
          <Image
            src={model.packImages[currentIndex]}
            alt={`Modelo ${model.name} - Imagem ${currentIndex + 1}`}
            fill
            className="object-cover"
            data-ai-hint="woman posing"
          />
          <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-1 rounded-full text-white hover:bg-black/75 transition-colors">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-1 rounded-full text-white hover:bg-black/75 transition-colors">
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full">
            {currentIndex + 1} / {model.packImages.length}
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 bg-black/50 p-1.5 rounded-full text-white hover:bg-black/75 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4 overflow-y-auto">
          {/* NAME */}
          <h2 className="text-2xl font-bold">{model.name}</h2>
          
          {/* STARS & VALIDATION */}
          <div className="flex flex-col gap-2 -mt-2 mb-2">
            <div className="flex items-center gap-1 text-amber-400">
              <Star fill="currentColor" size={16} />
              <Star fill="currentColor" size={16} />
              <Star fill="currentColor" size={16} />
              <Star fill="currentColor" size={16} />
              <Star fill="currentColor" size={16} />
            </div>
            <div className="flex items-center gap-2 text-sm text-green-400 font-semibold">
              <CheckCircle2 size={16} />
              <span>Conteúdo Validado</span>
            </div>
          </div>

          {/* PHOTO/VIDEO COUNT */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#2a2d35] p-4 rounded-lg text-center border-t-2 border-red-500/50 shadow-lg shadow-red-500/10">
              <Camera className="mx-auto mb-2 text-red-400" size={24} />
              <p className="text-lg font-bold">{model.photos}</p>
              <p className="text-xs text-gray-400">Fotos Exclusivas</p>
            </div>
            <div className="bg-[#2a2d35] p-4 rounded-lg text-center border-t-2 border-red-500/50 shadow-lg shadow-red-500/10">
              <Video className="mx-auto mb-2 text-red-400" size={24} />
              <p className="text-lg font-bold">{model.videos}</p>
              <p className="text-xs text-gray-400">Vídeos Premium</p>
            </div>
          </div>

          {/* CONVERSION RATE */}
          <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg flex items-center gap-4">
            <TrendingUp className="text-green-400" size={32} />
            <div>
              <p className="text-xl font-bold text-green-400">{model.conversion}%</p>
              <p className="text-sm font-bold">Taxa de Conversão</p>
              <p className="text-xs text-gray-400 mt-1">Performance comprovada com alta taxa de conversão em vendas.</p>
            </div>
          </div>
          
          {/* CHAT BUTTON */}
          <Link href="/chat" className="w-full">
            <Button size="lg" className="w-full bg-green-500 hover:bg-green-600 text-black font-bold text-base">
              Conversar Agora
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ModelCard = ({ model, onVerPackClick }: { model: Model, onVerPackClick: () => void }) => (
  <div className="relative bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg shadow-red-500/20 transition-transform duration-300 hover:scale-105 group">
    {model.isOnline && (
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
        <span>🟢</span>
        <span>Online</span>
      </div>
    )}
    <Image 
      src={model.imageUrl} 
      alt={`Modelo ${model.name}`} 
      width={400} 
      height={340} 
      className="w-full h-80 object-cover"
      data-ai-hint="woman portrait"
    />
    <div className="p-4 text-left">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-white">{model.name}</h3>
      </div>
      <div className="text-sm text-gray-400 my-1">
        📸 {model.photos} fotos • 🎥 {model.videos} vídeos
      </div>
      <div className="text-sm font-bold text-green-400 my-2">
        📈 {model.conversion}% CONVERSÃO
      </div>
      <div className="flex justify-between gap-3 mt-4">
        <button 
          onClick={onVerPackClick}
          disabled={!model.packImages || model.packImages.length === 0}
          className="flex-1 bg-[#333] text-white py-3 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          <Folder size={16} /> Ver Pack
        </button>
        <Link href="/chat" className="flex-1">
          <button className="w-full bg-green-400 text-black py-3 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2">
            <MessageCircle size={16} /> Conversar
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default function Home() {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);

  return (
    <main className="bg-[#0d0d0d] text-white font-sans min-h-screen relative overflow-hidden">
      <ParticlesBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center relative z-10">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-red-500">GirlFinder 💬</h2>
          <button className="bg-[#333] text-white py-2 px-5 rounded-lg font-semibold">Entrar</button>
        </header>

        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent mt-5">
          Garotas Reais, Agora Mesmo — Online e Prontas Pra Conversar
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto mt-4 mb-10">
          Descubra quem está disponível na sua região e comece a trocar mensagens em segundos. Sem burocracia, sem enrolação. Apenas cliques reais e conversas diretas.
        </p>
        
        <div className="flex justify-center flex-wrap gap-x-8 gap-y-4 mb-12">
          <div className="text-lg font-semibold text-green-400">🟢 94 Garotas Online</div>
          <div className="text-lg font-semibold text-purple-400">✨ 12 Novas Hoje</div>
          <div className="text-lg font-semibold text-green-400">💬 100% Interações Reais</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map(model => (
            <ModelCard key={model.name} model={model} onVerPackClick={() => setSelectedModel(model)} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="bg-gradient-to-r from-red-500 to-orange-400 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform duration-300 hover:scale-105">
            Exibir mais
          </button>
        </div>
      </div>
      {selectedModel && <PackModal model={selectedModel} onClose={() => setSelectedModel(null)} />}
    </main>
  );
}
