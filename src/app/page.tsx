
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
  { name: 'Camila Santos', photos: 889, videos: 106, conversion: 98.2, imageUrl: 'https://i.imgur.com/4AtEyYU.jpeg', isOnline: true, packImages: ['https://i.imgur.com/4AtEyYU.jpeg', 'https://i.imgur.com/4AtEyYU.jpeg', 'https://i.imgur.com/4AtEyYU.jpeg'] },
  { name: 'Ana Lopes', photos: 760, videos: 88, conversion: 97.5, imageUrl: 'https://i.imgur.com/7zr5mSMl.png', packImages: ['https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/vl5v8a4m42-1751383637200.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/qmiensm86z-1751383637929.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/1v7uoib911o-1751383638587.jpg'] },
  { name: 'Júlia Lima', photos: 920, videos: 112, conversion: 99.1, imageUrl: 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/mmj8ypxqq2e-1751383057848.jpg', isOnline: true, packImages: ['https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/mmj8ypxqq2e-1751383057848.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/80t57q6d1xg-1751383056952.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/fr78twyo38f-1751383058813.jpg'] },
  { name: 'Larissa Melo', photos: 815, videos: 97, conversion: 96.4, imageUrl: 'https://i.imgur.com/Tr56Oryl.png', packImages: ['https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/8sgda2i9um9-1751278270254.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/q6fluga2rfp-1751278270645.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/86a79soufb6-1751278270988.jpg'] },
  { name: 'Bianca Cruz', photos: 780, videos: 102, conversion: 97.8, imageUrl: 'https://i.imgur.com/mkCX0mfl.png', isOnline: true, packImages: ['https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/ho9kwoo86eb-1751277806803.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/1ez64zpyr3z-1751277807708.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/2alew6qocin-1751277807178.jpg'] },
  { name: 'Natália Reis', photos: 833, videos: 93, conversion: 98.6, imageUrl: 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/zjeoj717djh-1751277524013.jpg', packImages: ['https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/zjeoj717djh-1751277524013.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/ao6ww5idoio-1751277524375.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/8bwu20snd0f-1751277524965.jpg'] },
  { name: 'Rebeca Martins', photos: 802, videos: 84, conversion: 95.2, imageUrl: 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/lmgob08qp7-1751277203698.jpg', isOnline: true, packImages: ['https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/lmgob08qp7-1751277203698.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/xloc5te405f-1751277203930.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/wjj6goimdri-1751277203336.jpg'] },
  { name: 'Vanessa Silva', photos: 945, videos: 120, conversion: 99.8, imageUrl: 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/dqk2c1kbvrp-1751276273384.jpg', isOnline: true, packImages: ['https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/dqk2c1kbvrp-1751276273384.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/0qu2ree3u1q9-1751276273613.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/locp2dxsqpd-1751276273802.jpg'] },
  { name: 'Isabela Rocha', photos: 879, videos: 100, conversion: 96.9, imageUrl: 'https://i.imgur.com/kKyoKlql.png', packImages: ['https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/oy41ktrauli-1751275862262.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/ujiqv4kl68-1751275861850.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/7e6sl688j1b-1751275862692.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/e8bl4h2on5i-1751275861295.png'] },
];

const moreModels: Model[] = [
  { name: 'Estela Alves', photos: 850, videos: 90, conversion: 97.0, imageUrl: 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/i23zez97tj-1751260601358.jpeg', isOnline: true, packImages: ['https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/h3684eur4ai-1751260601927.jpeg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/yncgt3tn4ds-1751260602534.jpeg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/80sf89djkf-1751260602882.jpeg'] },
  { name: 'Bianka Gazaki', photos: 820, videos: 85, conversion: 96.5, imageUrl: 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/jscr7iq8lmb-1751260334656.jpg', packImages: ['https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/y13lelnqd7-1751260336294.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/149cw2o8acql-1751260336932.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/jscr7iq8lmb-1751260334656.jpg'] },
  { name: 'Ana Silva', photos: 880, videos: 110, conversion: 98.8, imageUrl: 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/ztv0i1earj-1751259945544.png', isOnline: true, packImages: ['https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/i3luzle1zwi-1751259946177.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/nmhx71sa5z-1751259946449.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/pukge39r83-1751259946764.jpeg'] },
  { name: 'Helena Ferreira', photos: 790, videos: 80, conversion: 95.9, imageUrl: 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/zvsok521t5l-1751259600885.jpg', packImages: ['https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/l9r9x06532-1751259602247.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/mi4wel7v8ia-1751259601598.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/ny8o3odtxrp-1751259601918.jpg'] },
  { name: 'Isabella Rossi', photos: 910, videos: 115, conversion: 99.3, imageUrl: 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/89d8ulb8bpl-1751259289336.jpg', isOnline: true, packImages: ['https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/4p5afnfmw74-1751259290228.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/offy4vltnkq-1751259290495.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/7imasuzeg0f-1751259290982.jpg'] },
  { name: 'Sofia Laurent', photos: 860, videos: 95, conversion: 97.8, imageUrl: 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/fa2r277kgeu-1751259107140.jpg', packImages: ['https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/dozdy4w67nv-1751259108664.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/zvwy8t0zo7-1751259107684.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/312ldbfwqq-1751259108041.jpg'] },
  { name: 'Carol Moraes', photos: 890, videos: 100, conversion: 98.1, imageUrl: 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/oo9ohl2veu9-1751258179497.jpg', isOnline: true, packImages: ['https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/h059p6w20xv-1751258180684.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/bdyeqfxt4r-1751258181140.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/4ycu9iy36o-1751258180066.jpg'] },
  { name: 'Eliane Figueiredo', photos: 840, videos: 88, conversion: 96.2, imageUrl: 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/ylice86m91s-1751221143337.jpg', isOnline: true, packImages: ['https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/0bbn2pgvo8q-1751221143992.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/w8ptgqe5vxe-1751221144395.jpg', 'https://zyrkaapjgzaqrzjplyeq.supabase.co/storage/v1/object/public/uploads/images/x1noy9cm37-1751221144819.jpg'] },
]

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
          
          <Link href="/chat" className="w-full">
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
  const [showMore, setShowMore] = useState(false);

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

      </div>
      {selectedModel && <PackModal model={selectedModel} onClose={() => setSelectedModel(null)} />}
    </main>
  );
}

    
