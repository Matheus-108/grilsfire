"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, Heart } from 'lucide-react';

export function LandingScreen() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background p-4 overflow-hidden">
      <Card className="w-full max-w-sm mx-auto bg-card border-primary/20 shadow-lg shadow-primary/20 rounded-2xl">
        <div className="relative animate-glow rounded-t-2xl">
          <Image
            src="https://placehold.co/400x600.png"
            alt="Letycia"
            width={400}
            height={600}
            className="object-cover w-full h-auto rounded-t-2xl"
            data-ai-hint="woman portrait"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent rounded-t-2xl"></div>
        </div>
        <CardContent className="p-6 text-center space-y-4 bg-card rounded-b-2xl">
          <h1 className="text-2xl font-headline text-foreground leading-tight">
            🚨 Letycia, 24 anos, está na sua região e quer te conhecer! 💋
          </h1>
          <p className="font-semibold text-lg text-primary animate-pulse">Ela está online AGORA…</p>
          <div className="flex flex-col sm:flex-row justify-around gap-4 pt-4">
            <Button variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/10 hover:text-accent-foreground/80 w-full rounded-full text-lg">
              <X className="mr-2" /> Não
            </Button>
            <Link href="/chat" className="w-full">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full rounded-full text-lg shadow-lg shadow-primary/50 animate-shimmer">
                <Heart className="mr-2 fill-red-500" /> SIM, Quero Falar com Ela
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
