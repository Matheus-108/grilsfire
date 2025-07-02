"use client";

import Image from 'next/image';
import Link from 'next/link';

export function LandingScreen() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#0e0e0e] p-4 font-['Segoe_UI',_sans-serif] text-white">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-[#1a1a1a] text-center shadow-[0_0_20px_#00ff9f40]">
        <Image
          src="https://i.imgur.com/3dxHzSt.jpeg"
          alt="Letycia"
          width={400}
          height={400}
          className="w-full border-b-2 border-b-[#00ff9f30] object-cover"
          data-ai-hint="woman portrait"
          priority
        />
        <div className="p-5">
          <p className="text-lg leading-relaxed">
            🔥 <strong>Letycia, 24 anos</strong> está <span className="font-bold text-[#00ff9f]">na sua região</span> e quer te conhecer!<br />
            <span className="font-bold text-[#00ff9f]">Ela está online AGORA...</span>
          </p>
          <div className="mt-5 flex justify-around gap-4">
             <button className="flex-1 cursor-pointer rounded-full border-2 border-[#ff4d4d] bg-[#1e1e1e] py-[14px] px-6 text-base font-bold text-[#ff4d4d] transition-colors duration-300 ease-in-out hover:bg-[#ff4d4d] hover:text-white">
              ✖ Não
            </button>
            <Link href="/chat" className="flex-1">
              <button className="w-full cursor-pointer rounded-full border-none bg-[#00ff9f] py-[14px] px-6 text-base font-bold text-black shadow-[0_0_12px_#00ff9f80] transition-all duration-300 ease-in-out hover:bg-[#00e68a] hover:shadow-[0_0_20px_#00ff9f]">
                💚 SIM, Conversar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
