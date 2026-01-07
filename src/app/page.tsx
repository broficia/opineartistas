'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/survey');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F0F0] text-[#656565]">
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md p-4">
          <Card className="bg-white rounded-lg shadow-lg">
            <CardHeader className="items-center text-center">
              <Image src="/opinilogo.png" alt="Spotify" width={109} height={33} />
              <CardTitle className="text-2xl font-bold pt-4">Bem-vindo(a) ao Spotify</CardTitle>
              <CardDescription>Insira seu e-mail para prosseguir!</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <Input
                    id="email"
                    type="email"
                    placeholder="E-mail"
                    required
                    className="h-12 text-center"
                  />
                  <Button type="submit" className="w-full h-12 bg-[#1DB954] text-white hover:bg-[#1ED760]">
                    ENTRAR
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="py-8 text-center">
        <p className="font-bold">2024 Spotify</p>
        <p className="text-sm">Termos e Politica de Privacidade</p>
      </footer>
    </div>
  );
}
