
import Image from 'next/image';
import Link from 'next/link';
import { Folder, MessageCircle } from 'lucide-react';

type Model = {
  name: string;
  photos: number;
  videos: number;
  conversion: number;
  imageUrl: string;
};

const models: Model[] = [
  { name: 'Camila Santos', photos: 889, videos: 106, conversion: 98.2, imageUrl: 'https://i.imgur.com/4AtEyYU.jpeg' },
  { name: 'Ana Lopes', photos: 760, videos: 88, conversion: 97.5, imageUrl: 'https://i.imgur.com/7zr5mSM.png' },
  { name: 'Júlia Lima', photos: 920, videos: 112, conversion: 99.1, imageUrl: 'https://i.imgur.com/NrDNobZ.png' },
  { name: 'Larissa Melo', photos: 815, videos: 97, conversion: 96.4, imageUrl: 'https://i.imgur.com/Tr56Ory.png' },
  { name: 'Bianca Cruz', photos: 780, videos: 102, conversion: 97.8, imageUrl: 'https://i.imgur.com/mkCX0mf.png' },
  { name: 'Natália Reis', photos: 833, videos: 93, conversion: 98.6, imageUrl: 'https://i.imgur.com/oSObgKj.png' },
  { name: 'Rebeca Martins', photos: 802, videos: 84, conversion: 95.2, imageUrl: 'https://i.imgur.com/ZGaW7JT.png' },
  { name: 'Vanessa Silva', photos: 945, videos: 120, conversion: 99.8, imageUrl: 'https://i.imgur.com/ytt7dqR.png' },
  { name: 'Isabela Rocha', photos: 879, videos: 100, conversion: 96.9, imageUrl: 'https://i.imgur.com/kKyoKlq.png' },
];

const ModelCard = ({ model }: { model: Model }) => (
  <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg shadow-red-500/20 transition-transform duration-300 hover:scale-105 group">
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
        <button className="flex-1 bg-[#333] text-white py-3 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2">
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
  return (
    <main className="bg-[#0d0d0d] text-white font-sans min-h-screen relative overflow-hidden
                    before:content-[''] before:fixed before:inset-0 before:bg-[radial-gradient(circle_at_center,#1a1a1a_10%,transparent_11%)] before:bg-[length:5px_5px] before:opacity-10 before:-z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
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
          <div className="text-lg font-semibold text-red-400">🔴 94 Garotas Online</div>
          <div className="text-lg font-semibold text-purple-400">✨ 12 Novas Hoje</div>
          <div className="text-lg font-semibold text-green-400">💬 100% Interações Reais</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map(model => (
            <ModelCard key={model.name} model={model} />
          ))}
        </div>
      </div>
    </main>
  );
}
