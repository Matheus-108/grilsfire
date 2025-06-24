"use client";

import { useState, useEffect, useRef, FormEvent } from 'react';
import Image from 'next/image';
import { Send, Heart, Lock, Copy, Check, MessageSquareHeart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { handleChatSubmit } from '@/app/actions';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  image?: string;
};

type ChatScreenProps = {
  letyciaPhotoDataUri: string;
  samplePhotoDataUri: string;
  profilePhotoUrl: string;
};

export default function ChatScreen({ letyciaPhotoDataUri, samplePhotoDataUri, profilePhotoUrl }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [userName, setUserName] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Initial message from bot
    const getInitialMessage = async () => {
      setIsTyping(true);
      try {
        const result = await handleChatSubmit({
          userMessage: 'oi',
          letyciaPhotoDataUri,
          samplePhotoDataUri
        });
        setMessages(prev => [...prev, { id: Date.now(), text: result.response, sender: 'bot' }]);
      } catch (error) {
        console.error("Failed to get initial message", error);
        setMessages(prev => [...prev, { id: Date.now(), text: 'Oi! Tive um problema pra conectar, pode me mandar uma mensagem?', sender: 'bot' }]);
      } finally {
        setIsTyping(false);
      }
    };
    getInitialMessage();
  }, [letyciaPhotoDataUri, samplePhotoDataUri]);

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessageText = input;
    const newMessages: Message[] = [...messages, { id: Date.now(), text: userMessageText, sender: 'user' }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    let currentUserName = userName;
    if (!userName) {
      currentUserName = userMessageText;
      setUserName(userMessageText);
    }
    
    try {
      const result = await handleChatSubmit({
        userMessage: userMessageText,
        userName: currentUserName,
        letyciaPhotoDataUri,
        samplePhotoDataUri
      });

      setMessages(prev => [...prev, { id: Date.now() + 1, text: result.response, sender: 'bot' }]);

      if(result.needsPayment && result.paymentDetails) {
        setPaymentDetails(result.paymentDetails);
        setTimeout(() => setPaymentModalOpen(true), 1000);
      }
      if(result.whatsappNumber) {
        setWhatsappNumber(result.whatsappNumber);
        setMessages(prev => [...prev, { id: Date.now() + 2, text: `Pode me chamar aqui, amor: ${result.whatsappNumber}`, sender: 'bot' }]);
      }

    } catch (error) {
      console.error("Failed to submit message", error);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: 'Ops, minha conexão caiu. Pode repetir?', sender: 'bot' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handlePaymentConfirmation = async () => {
    setPaymentModalOpen(false);
    const confirmationMessage = "Pronto amor, já fiz a confirmação. Quero te ver! 😏";
    setMessages(prev => [...prev, { id: Date.now(), text: confirmationMessage, sender: 'user' }]);
    setIsTyping(true);

     try {
      const result = await handleChatSubmit({
        userMessage: confirmationMessage,
        userName,
        letyciaPhotoDataUri,
        samplePhotoDataUri
      });

      if (result.whatsappNumber) {
         setWhatsappNumber(result.whatsappNumber);
         setMessages(prev => [...prev, { id: Date.now() + 1, text: result.response, sender: 'bot' }, { id: Date.now() + 2, text: `Pode me chamar aqui, amor: ${result.whatsappNumber}`, sender: 'bot' }]);
      } else {
        setMessages(prev => [...prev, { id: Date.now() + 1, text: result.response, sender: 'bot' }]);
      }
    } catch (error) {
       console.error("Failed to confirm payment", error);
       setMessages(prev => [...prev, { id: Date.now() + 1, text: 'Não consegui confirmar aqui, meu bem. Tenta de novo em um minutinho.', sender: 'bot' }]);
    } finally {
       setIsTyping(false);
    }
  };

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

  return (
    <div className="flex flex-col h-screen max-h-screen bg-background text-foreground overflow-hidden">
      <header className="flex items-center p-3 border-b-2 border-primary/20 bg-card shadow-lg z-10">
        <Avatar className="h-12 w-12 border-2 border-primary animate-glow">
          <AvatarImage src={profilePhotoUrl} alt="Letycia" data-ai-hint="woman portrait" />
          <AvatarFallback>L</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <h2 className="font-headline text-xl">Letycia</h2>
          <div className="flex items-center">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <p className="text-sm text-green-400">Online Agora</p>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1" viewportRef={scrollAreaRef}>
        <div className="p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={cn("flex items-end gap-2", msg.sender === 'user' ? 'justify-end' : 'justify-start')}>
              {msg.sender === 'bot' && <Avatar className="h-8 w-8"><AvatarImage src={profilePhotoUrl} /></Avatar>}
              <div className={cn("max-w-[80%] p-3 rounded-2xl animate-in fade-in zoom-in-95",
                msg.sender === 'bot' ? 'bg-primary/80 text-primary-foreground rounded-bl-none' : 'bg-secondary text-secondary-foreground rounded-br-none'
              )}>
                <p className="text-lg">{msg.text}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-end gap-2 justify-start">
               <Avatar className="h-8 w-8"><AvatarImage src={profilePhotoUrl} /></Avatar>
               <div className="bg-primary/80 text-primary-foreground p-3 rounded-2xl rounded-bl-none flex items-center gap-1">
                  <span className="w-2 h-2 bg-primary-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 bg-primary-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 bg-primary-foreground/50 rounded-full animate-bounce"></span>
               </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t-2 border-primary/20 bg-card">
        {whatsappNumber ? (
            <div className="text-center p-4 bg-green-500/10 rounded-lg">
                <h3 className="font-headline text-xl text-green-400">WhatsApp Desbloqueado!</h3>
                <p className="mt-2">Clique para copiar meu número e vamos conversar! 💋</p>
                <Button onClick={() => copyToClipboard(whatsappNumber, 'WhatsApp copiado!')} className="mt-4 bg-green-500 hover:bg-green-600 text-white w-full">
                    {whatsappNumber} <Copy className="ml-2" />
                </Button>
            </div>
        ) : (
          <form onSubmit={onFormSubmit} className="flex items-center gap-2">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isTyping ? "Letycia está digitando..." : "Digite seu nome..."}
              className="flex-1 text-lg rounded-full px-5 py-6 bg-input focus:ring-2 focus:ring-primary"
              disabled={isTyping || !!paymentDetails}
            />
            <Button type="submit" size="icon" className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90" disabled={isTyping || !input.trim()}>
              <Send className="h-6 w-6" />
            </Button>
          </form>
        )}
      </div>

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
