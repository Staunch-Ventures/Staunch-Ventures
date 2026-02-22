export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-background">
      <div className="text-center space-y-4 animate-in fade-in duration-1000 ease-out fill-mode-forwards">
        <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tight text-primary">
          Hello World!
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground font-body max-w-md mx-auto">
          Welcome to your fresh start. A simple greeting from HelloWorld.
        </p>
        <div className="pt-8">
          <div className="h-1 w-24 bg-accent mx-auto rounded-full opacity-50" />
        </div>
      </div>
    </main>
  );
}
