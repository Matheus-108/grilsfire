
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Folder, MessageCircle, Camera, Video, TrendingUp, ChevronLeft, ChevronRight, X, Star, CheckCircle2, MapPin, Download, AlertCircle, ThumbsUp, ThumbsDown, MoreVertical, Heart } from 'lucide-react';
import { ParticlesBackground } from '@/components/particles-background';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { type Model, models, moreModels } from '@/lib/models';


const PackModal = ({ model, onClose }: { model: Model; onClose: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [city, setCity] = useState('...'); // Loading state

  useEffect(() => {
    fetch('https://ipinfo.io/json')
      .then(response => response.json())
      .then(data => {
        if (data && data.city) {
          setCity(data.city);
        } else {
          setCity('sua região');
        }
      })
      .catch(error => {
        console.error('Error fetching location:', error);
        setCity('sua região');
      });
  }, []); // Run only on mount

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
      <DialogContent className="bg-[#121212] font-sans border-none text-white p-0 max-w-sm md:max-w-5xl w-full rounded-2xl flex flex-col md:flex-row-reverse max-h-[95vh] h-auto md:h-auto md:max-h-[700px]">
        <DialogHeader className="sr-only">
          <DialogTitle>Pack de {model.name}</DialogTitle>
        </DialogHeader>

        {/* --- RIGHT COLUMN / TOP ON MOBILE: IMAGE CAROUSEL --- */}
        <div className="relative w-full md:w-[55%] flex-shrink-0">
          <div className="relative aspect-[4/5] md:aspect-auto md:h-full">
            <Image
              src={model.packImages[currentIndex]}
              alt={`Modelo ${model.name} - Imagem ${currentIndex + 1}`}
              fill
              className="object-cover md:rounded-r-2xl"
              data-ai-hint="woman posing"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-black/60 md:via-transparent" />
            <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/75 transition-colors z-10">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/75 transition-colors z-10">
              <ChevronRight size={24} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm font-bold px-3 py-1 rounded-full z-10">
              {currentIndex + 1} / {model.packImages.length}
            </div>
          </div>
           <button onClick={onClose} className="absolute top-4 right-4 bg-black/50 p-1.5 rounded-full text-white hover:bg-black/75 transition-colors z-20">
            <X size={20} />
          </button>
        </div>

        {/* --- LEFT COLUMN / BOTTOM ON MOBILE: DETAILS --- */}
        <div className="w-full md:w-[45%] p-6 flex flex-1 flex-col gap-5 overflow-y-auto min-h-0">
          <h2 className="text-3xl font-extrabold">{model.name}</h2>
          
          <div className="flex items-center gap-2 text-gray-400 -mt-4">
            <MapPin size={16} className="text-red-400 flex-shrink-0" />
            <span>
              Perto de você em <span className="font-bold text-white">{city}</span>
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1f2128] p-4 rounded-xl text-center border border-gray-700/50 shadow-lg shadow-black/20">
              <Camera className="mx-auto mb-2 text-red-400" size={24} />
              <p className="text-xl font-bold">{model.photos}</p>
              <p className="text-xs text-gray-400">Fotos Exclusivas</p>
            </div>
             <div className="bg-[#1f2128] p-4 rounded-xl text-center border border-gray-700/50 shadow-lg shadow-black/20">
              <Video className="mx-auto mb-2 text-red-400" size={24} />
              <p className="text-xl font-bold">{model.videos}</p>
              <p className="text-xs text-gray-400">Vídeos Premium</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30 p-4 rounded-xl flex items-start gap-4">
            <TrendingUp className="text-green-400 mt-1" size={32} />
            <div>
              <p className="text-2xl font-bold text-green-400">{model.conversion}%</p>
              <p className="text-base font-bold">Taxa de Conversão</p>
              <p className="text-xs text-gray-400 mt-1">Performance comprovada com alta taxa de conversão em vendas.</p>
            </div>
          </div>
          
          <Link href={`/chat?model=${encodeURIComponent(model.name)}`} className="w-full">
            <Button size="lg" className="w-full bg-green-500 hover:bg-green-600 text-black font-bold text-base h-14">
              <MessageCircle className="mr-2"/> Conversar Agora
            </Button>
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-amber-400">
              <Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} /><Star fill="currentColor" size={18} />
            </div>
            <p className="text-sm mt-1 text-gray-400">Produto com alta avaliação</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30 p-4 rounded-xl flex items-center gap-3">
             <CheckCircle2 size={32} className="text-green-400 flex-shrink-0" />
             <div>
                <p className="font-bold text-base">Conteúdo Validado</p>
                <p className="text-xs text-gray-400">Testado e aprovado por especialistas</p>
             </div>
          </div>
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
        <Link href={`/chat?model=${encodeURIComponent(model.name)}`} className="flex-1">
          <button className="w-full bg-green-400 text-black py-3 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2">
            <MessageCircle size={16} /> Conversar
          </button>
        </Link>
      </div>
    </div>
  </div>
);

type Review = {
  avatar: string;
  name: string;
  date: string;
  rating: number;
  text: string;
  usefulCount: number;
};

const reviews: Review[] = [
  {
    avatar: 'https://i.imgur.com/nC4hFAx.png',
    name: 'Juliano Gomes',
    date: '26 de março de 2025',
    rating: 5,
    text: 'podem baixar que e massa de mais uso o dia todo pq estou nas ferias do meu trabalho puts tem que ver as minas so gata slk',
    usefulCount: 143,
  },
  {
    avatar: 'https://i.imgur.com/sC4a8A2.png',
    name: 'Sergio Falles',
    date: '14 de junho de 2025',
    rating: 5,
    text: 'parada é ótima comprei e baixei e nao me arrependo de nada, nao gasto mais dinheiro com privacy nem com grupo no telegram, todas as mulheres que eu aocmpanho estao dentro desse app fodaaaa',
    usefulCount: 38,
  },
  {
    avatar: 'https://i.imgur.com/8f2c3pE.png',
    name: 'David S. Mattos',
    date: '17 de junho de 2025',
    rating: 5,
    text: 'Finalmente encontrei um aplicativo que tudo o que eu sempre quis, mulheres videos e lives pagando só uma vez! nunca mais enjoei das mulheres que eu comprava packa, pq no app tem centenas ou milhares de mulheres, nao paraaaa de aparecerrr so cavalonaaa',
    usefulCount: 1168,
  }
];


const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <div className="bg-[#1a1a1a] p-5 rounded-xl border border-gray-700/50 shadow-lg shadow-black/20">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <Image src={review.avatar} alt={review.name} width={40} height={40} className="rounded-full" data-ai-hint="person avatar" />
          <div>
            <h4 className="font-bold text-white text-base">{review.name}</h4>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < review.rating ? 'text-green-400 fill-green-400' : 'text-gray-600'} />
                ))}
              </div>
              <p className="text-xs text-gray-400">{review.date}</p>
            </div>
          </div>
        </div>
        <button className="text-gray-500 hover:text-white">
          <MoreVertical size={20} />
        </button>
      </div>
      
      <p className="text-gray-300 text-sm leading-relaxed mb-4">{review.text}</p>
      
      <p className="text-xs text-gray-500 mb-3">{`Essa avaliação foi marcada como útil por ${review.usefulCount} pessoas`}</p>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400">Você achou isso útil?</span>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" className="bg-transparent border-gray-600 hover:bg-gray-700 text-white h-8 px-4 text-sm">Sim</Button>
           <Button variant="outline" size="sm" className="bg-transparent border-gray-600 hover:bg-gray-700 text-white h-8 px-4 text-sm">Não</Button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [showMore, setShowMore] = useState(false);

  return (
    <main className="bg-[#0d0d0d] text-white font-sans min-h-screen relative overflow-hidden pb-24">
      <ParticlesBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center relative z-10">
        
        <div className="max-w-md mx-auto bg-[#1a1a1a] rounded-2xl p-4 md:p-6 border border-gray-700/50 shadow-lg shadow-black/20 mb-12">
          <div className="flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <Image 
                src="https://i.imgur.com/3dxHzSt.jpeg" 
                alt="Ícone do App" 
                width={80} 
                height={80} 
                className="rounded-xl border-2 border-gray-700" 
                data-ai-hint="app icon"
              />
              <div className="absolute -bottom-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-md border-2 border-[#1a1a1a]">18+</div>
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-white">Tiktok Adulto APP</h2>
              <p className="text-green-400 font-semibold text-sm">Acesso ao Conteúdo Adulto</p>
              <p className="text-gray-400 text-xs mt-1">Contém compras no app</p>
            </div>
          </div>
          
          <div className="flex justify-around text-center my-6">
            <div>
              <p className="text-sm font-bold flex items-center justify-center gap-1">5.0 <Star size={14} className="text-amber-400" fill="currentColor" /></p>
              <p className="text-xs text-gray-400">125 mil avaliações</p>
            </div>
            <div>
              <p className="text-sm font-bold flex items-center justify-center gap-1"><Download size={14} /> 800 mil+</p>
              <p className="text-xs text-gray-400">downloads</p>
            </div>
            <div>
              <div className="text-sm font-bold border border-gray-500 px-2 py-0.5 rounded-sm inline-block">18</div>
              <p className="text-xs text-gray-400 mt-1">Classificação</p>
            </div>
          </div>

          <Link href={`/chat?model=Letycia`} className="w-full block">
            <Button size="lg" className="w-full bg-green-500 hover:bg-green-600 text-black font-bold text-base h-14">
              Comprar Acesso - R$ 19,90
            </Button>
          </Link>
          
          <div className="flex items-start text-left gap-2 mt-4 text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            <AlertCircle size={24} className="flex-shrink-0 mt-0.5" />
            <p className="text-xs font-semibold">
              Este aplicativo só é oferecido uma vez por pessoa. Se você fechar essa página, você não terá a oportunidade de adquirir de novo.
            </p>
          </div>
        </div>

        <div className="flex justify-center flex-wrap gap-x-8 gap-y-4 mb-12">
          <div className="text-lg font-semibold text-green-400">🟢 94 Garotas Online</div>
          <div className="text-lg font-semibold text-purple-400">✨ 12 Novas Hoje</div>
          <div className="text-lg font-semibold text-green-400">💬 100% Interações Reais</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map(model => (
            <ModelCard key={model.name} model={model} onVerPackClick={() => setSelectedModel(model)} />
          ))}
          {showMore && moreModels.map(model => (
            <ModelCard key={model.name} model={model} onVerPackClick={() => setSelectedModel(model)} />
          ))}
        </div>
        
        {!showMore && (
          <div className="mt-16 text-center flex flex-col items-center gap-3">
            <button onClick={() => setShowMore(true)} className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-rose-500 to-orange-500 px-8 py-4 text-lg font-bold text-white shadow-[0_4px_20px_rgba(255,100,80,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_25px_rgba(255,100,80,0.6)]">
              <span className="text-2xl">🔥</span>
              <span>Ver Mais Modelos (28+) ↓</span>
            </button>
            <p className="mt-2 text-sm text-gray-400">
              Mais <span className="font-bold text-rose-400">28 modelos exclusivos</span> disponíveis
            </p>
          </div>
        )}

        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-4 text-left">Avaliações Recentes</h2>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {reviews.map(review => (
              <ReviewCard key={review.name} review={review} />
            ))}
          </div>
        </div>

      </div>
      {selectedModel && <PackModal model={selectedModel} onClose={() => setSelectedModel(null)} />}
    </main>
  );
}
