
export default function ChatPage() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-background p-4">
      <h1 className="text-3xl font-headline font-bold my-6 text-foreground">
        Atendimento Interativo
      </h1>
      <div className="w-full max-w-5xl rounded-lg overflow-hidden shadow-lg shadow-primary/20">
        <iframe
          src="https://typebot.io/funil-isa-64b8rfv"
          width="100%"
          height="600px"
          style={{ border: 'none' }}
        ></iframe>
      </div>
    </div>
  );
}
