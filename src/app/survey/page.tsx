'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { DollarSign, Home, HelpCircle, CheckCircle, Music } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const initialBalance = 0;
const finalBalanceGoal = 473;

const surveys = [
  {
    artistName: 'Matuê',
    reward: 33,
    imageSrc: '/matue.png',
    imageHint: 'male rapper',
    audioSrc: '/matue.mp3',
    questions: [
      'De 1 a 5, qual nota você daria para as músicas de Matuê?',
      'Recomendaria o cantor Matuê para seus amigos e familiares?',
      'Qual faixa etária você acha que mais escuta o cantor Matuê?',
    ],
    answers: [
      ['1', '2', '3', '4', '5'],
      ['Sim', 'Não'],
      ['-18 anos', '+18 anos'],
    ],
  },
  {
    artistName: 'Luan Santana',
    reward: 34,
    imageSrc: '/LuanSantana.jpg',
    imageHint: 'male singer',
    audioSrc: '/luan.mp3',
    questions: [
      'De 1 a 5, qual nota você daria para as músicas do Luan Santana?',
      'Recomendaria o cantor Luan Santana para seus amigos e familiares?',
      'Qual faixa etária você acha que mais escuta o cantor Luan Santana?',
    ],
    answers: [
      ['1', '2', '3', '4', '5'],
      ['Sim', 'Não'],
      ['-18 anos', '+18 anos'],
    ],
  },
  {
    artistName: 'MC Poze',
    reward: 47,
    imageSrc: '/poze.jpg',
    imageHint: 'male rapper sunglasses',
    audioSrc: '/poze.mp3',
    questions: [
        'De 1 a 5, qual nota você daria para as músicas do Mc Poze?',
        'Recomendaria o cantor Mc Poze para seus amigos e familiares?',
        'Qual faixa etária você acha que mais escuta o cantor Mc Poze?',
    ],
    answers: [
        ['1', '2', '3', '4', '5'],
        ['Sim', 'Não'],
        ['-18 anos', '+18 anos'],
    ],
  },
  {
    artistName: 'Anitta',
    reward: 43,
    imageSrc: '/annita.jpg',
    imageHint: 'female singer',
    audioSrc: '/anitta.mp3',
    questions: [
      'De 1 a 5, qual nota você daria para as músicas de Anitta?',
      'Recomendaria a cantora Anitta para seus amigos e familiares?',
      'Qual faixa etária você acha que mais escuta a cantora Anitta?',
    ],
    answers: [
      ['1', '2', '3', '4', '5'],
      ['Sim', 'Não'],
      ['-18 anos', '+18 anos'],
    ],
  },
  {
    artistName: 'Ludmilla',
    reward: 52,
    imageSrc: '/ludmillaa.jpg',
    imageHint: 'female singer dark hair',
    audioSrc: '/ludmilla.mp3',
    questions: [
      'De 1 a 5, qual nota você daria para as músicas de Ludmilla?',
      'Recomendaria a cantora Ludmilla para seus amigos e familiares?',
      'Qual faixa etária você acha que mais escuta a cantora Ludmilla?',
    ],
    answers: [
      ['1', '2', '3', '4', '5'],
      ['Sim', 'Não'],
      ['-18 anos', '+18 anos'],
    ],
  },
  {
    artistName: 'MC Cabelin',
    reward: 32,
    imageSrc: '/mcabelin.jpg',
    imageHint: 'male rapper tattoos',
    audioSrc: '/mcabelinho.mp3',
    questions: [
      'De 1 a 5, qual nota você daria para as músicas de MC Cabelin?',
      'Recomendaria o cantor MC Cabelin para seus amigos e familiares?',
      'Qual faixa etária você acha que mais escuta o cantor MC Cabelin?',
    ],
    answers: [
      ['1', '2', '3', '4', '5'],
      ['Sim', 'Não'],
      ['-18 anos', '+18 anos'],
    ],
  },
  {
    artistName: 'MC Daniel',
    reward: 32,
    imageSrc: '/mcdaniel.jpg',
    imageHint: 'male rapper smiling',
    audioSrc: '/mdaniel.mp3',
    questions: [
      'De 1 a 5, qual nota você daria para as músicas de Mc Daniel?',
      'Recomendaria o cantor Mc Daniel para seus amigos e familiares?',
      'Qual faixa etária você acha que mais escuta o cantor Mc Daniel?',
    ],
    answers: [
      ['1', '2', '3', '4', '5'],
      ['Sim', 'Não'],
      ['-18 anos', '+18 anos'],
    ],
  },
  {
    artistName: 'Ivete Sangalo',
    reward: 27,
    imageSrc: '/ivete.jpg',
    imageHint: 'female singer smiling',
    audioSrc: '/ivete.mp3',
    questions: [
      'De 1 a 5, qual nota você daria para as músicas da Ivete Sangalo?',
      'Recomendaria a cantora Ivete Sangalo para seus amigos e familiares?',
      'Qual faixa etária você acha que mais escuta a cantora Ivete Sangalo?',
    ],
    answers: [
      ['1', '2', '3', '4', '5'],
      ['Sim', 'Não'],
      ['-18 anos', '+18 anos'],
    ],
  },
  {
    artistName: 'Wesley Safadão',
    reward: 30,
    imageSrc: '/wesley.jpg',
    imageHint: 'male singer smiling',
    audioSrc: '/wesley.mp3',
    questions: [
        'De 1 a 5, qual nota você daria para as músicas de Wesley Safadão?',
        'Recomendaria o cantor Wesley Safadão para seus amigos e familiares?',
        'Qual faixa etária você acha que mais escuta o cantor Wesley Safadão?',
    ],
    answers: [
        ['1', '2', '3', '4', '5'],
        ['Sim', 'Não'],
        ['-18 anos', '+18 anos'],
    ],
  },
  {
    artistName: 'Alok',
    reward: 43,
    imageSrc: '/alok.jpg',
    imageHint: 'male dj',
    audioSrc: '/alok.mp3',
    questions: [
        'De 1 a 5, qual nota você daria para as músicas de Alok?',
        'Recomendaria o cantor Alok para seus amigos e familiares?',
        'Qual faixa etária você acha que mais escuta o cantor Alok?',
    ],
    answers: [
        ['1', '2', '3', '4', '5'],
        ['Sim', 'Não'],
        ['-18 anos', '+18 anos'],
    ],
  },
  {
    artistName: 'Felipe Amorim',
    reward: 100,
    imageSrc: 'https://picsum.photos/seed/felipe/200/200',
    imageHint: 'male singer on stage',
    audioSrc: '/felipeamorim.mp3',
    questions: [
      'De 1 a 5, qual nota você daria para as músicas de Felipe Amorim?',
      'Recomendaria o cantor Felipe Amorim para seus amigos e familiares?',
      'Qual faixa etária você acha que mais escuta o cantor Felipe Amorim?',
    ],
    answers: [
      ['1', '2', '3', '4', '5'],
      ['Sim', 'Não'],
      ['-18 anos', '+18 anos'],
    ],
  },
];


export default function SurveyPage() {
  const router = useRouter();
  const [currentSurveyIndex, setCurrentSurveyIndex] = useState(0);
  const [balance, setBalance] = useState(initialBalance);
  const [showPopup, setShowPopup] = useState(false);
  const [showFinalPopup, setShowFinalPopup] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [recommend, setRecommend] = useState<string | null>(null);
  const [ageGroup, setAgeGroup] = useState<string | null>(null);
  const [animatedAmount, setAnimatedAmount] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const cashAudioRef = useRef<HTMLAudioElement>(null);
  const [finalBalance, setFinalBalance] = useState(0);
  const [animatedFinalBalance, setAnimatedFinalBalance] = useState(0);

  const currentSurvey = surveys[currentSurveyIndex];

  const allQuestionsAnswered = rating !== null && recommend !== null && ageGroup !== null;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentSurvey.audioSrc;
      audioRef.current.play().catch(e => console.log("Autoplay was prevented.", e));
    }
  }, [currentSurveyIndex, currentSurvey.audioSrc]);

  useEffect(() => {
    if (showPopup) {
      audioRef.current?.pause();
      cashAudioRef.current?.play().catch(e => console.log("Cash sound autoplay was prevented.", e));
      let start = 0;
      const end = currentSurvey.reward;
      if (end === 0) {
        setAnimatedAmount(end)
        return;
      };
      const duration = 1000;
      const stepTime = Math.max(10, duration / end);
      
      const timer = setInterval(() => {
        start += 1;
        setAnimatedAmount(start);
        if (start >= end) {
          setAnimatedAmount(end);
          clearInterval(timer);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [showPopup, currentSurvey.reward]);

  useEffect(() => {
    if (showFinalPopup) {
      cashAudioRef.current?.play().catch(e => console.log("Cash sound autoplay was prevented.", e));
      let start = 0;
      const end = finalBalance;
      if (end === 0) {
        setAnimatedFinalBalance(0);
        return;
      }
      const duration = 1500;
      const stepTime = 16;
      const increment = end / (duration / stepTime);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setAnimatedFinalBalance(end);
          clearInterval(timer);
        } else {
          setAnimatedFinalBalance(start);
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [showFinalPopup, finalBalance]);


  const handleSubmit = () => {
    if (allQuestionsAnswered) {
        const newBalance = balance + currentSurvey.reward;
        if (newBalance >= finalBalanceGoal) {
            setFinalBalance(newBalance);
            setShowFinalPopup(true);
            audioRef.current?.pause();
        } else {
            setShowPopup(true);
        }
    }
  };

  const handleClosePopup = () => {
    const newBalance = balance + currentSurvey.reward;
    setBalance(newBalance);
    setShowPopup(false);
    setAnimatedAmount(0);

    // Reset answers
    setRating(null);
    setRecommend(null);
    setAgeGroup(null);
    
    if (currentSurveyIndex < surveys.length - 1) {
      setCurrentSurveyIndex(currentSurveyIndex + 1);
    } else {
      // This was the last survey
      setFinalBalance(newBalance);
      setShowFinalPopup(true);
      audioRef.current?.pause();
    }
  };

  const handleSaqueAgora = () => {
    router.push(`/withdraw?balance=${finalBalance}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F0F0] text-[#3d4042]">
      <audio ref={audioRef} autoPlay playsInline />
      <audio ref={cashAudioRef} src="/cash.mp3" />
      <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-white shadow-md">
        <Image src="/opinilogo.png" alt="Spotify" width={80} height={24} />
        <div className="bg-[#1DB954] text-white font-bold py-2 px-4 rounded-md">
          R$ {balance.toFixed(2).replace('.', ',')}
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center pt-20 pb-24">
        <div className="w-full max-w-md p-4">
          <Card className="bg-white rounded-lg shadow-lg">
            <CardContent className="pt-6">
              <p className="text-center text-xl font-bold text-[#1DB954] mb-4">
                Responda e ganhe R${currentSurvey.reward.toFixed(2).replace('.', ',')}!
              </p>
              <div className="flex justify-center mb-4">
                <Image
                  src={currentSurvey.imageSrc}
                  alt={currentSurvey.artistName}
                  width={150}
                  height={150}
                  className="rounded-lg object-cover"
                  data-ai-hint={currentSurvey.imageHint}
                />
              </div>

              <div className="flex flex-col items-center mb-4">
                <p className="text-sm font-semibold text-center mb-2 flex items-center">
                  <Music className="w-4 h-4 mr-2" />
                  Ouça a música e responda abaixo:
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-center text-sm font-semibold mb-2">
                    {currentSurvey.questions[0]}
                  </p>
                  <div className="flex justify-center space-x-2">
                    {currentSurvey.answers[0].map((num, index) => (
                      <Button 
                        key={index} 
                        variant="outline" 
                        onClick={() => setRating(index)}
                        className={cn("bg-gray-200 border-gray-300", {
                          "bg-[#1DB954] text-white hover:bg-[#1ED760]": rating === index
                        })}
                      >
                        {num}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-center text-sm font-semibold mb-2">
                    {currentSurvey.questions[1]}
                  </p>
                  <div className="flex justify-center space-x-2">
                     {currentSurvey.answers[1].map((text) => (
                      <Button 
                        key={text}
                        variant="outline" 
                        onClick={() => setRecommend(text)}
                        className={cn("bg-gray-200 border-gray-300 px-8", {
                          "bg-[#1DB954] text-white hover:bg-[#1ED760]": recommend === text
                        })}
                      >
                        {text}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-center text-sm font-semibold mb-2">
                    {currentSurvey.questions[2]}
                  </p>
                  <div className="flex justify-center space-x-2">
                    {currentSurvey.answers[2].map((text) => (
                       <Button 
                        key={text}
                        variant="outline" 
                        onClick={() => setAgeGroup(text)}
                        className={cn("bg-gray-200 border-gray-300", {
                          "bg-[#1DB954] text-white hover:bg-[#1ED760]": ageGroup === text
                        })}
                        >
                          {text}
                        </Button>
                    ))}
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleSubmit} 
                disabled={!allQuestionsAnswered}
                className="w-full h-12 bg-[#1DB954] text-white hover:bg-[#1ED760] mt-6"
              >
                Enviar respostas
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-10 flex items-center justify-around p-2 bg-white shadow-[0_-2px_5px_rgba(0,0,0,0.1)]">
        <button className="flex flex-col items-center text-gray-500">
          <DollarSign size={28} />
        </button>
        <button className="flex flex-col items-center text-[#1DB954]">
          <Home size={28} />
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <HelpCircle size={28} />
        </button>
      </footer>

      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="sm:max-w-[280px] bg-white p-4 rounded-lg shadow-lg text-center overflow-hidden">
           <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">Sucesso!</DialogTitle>
            <DialogDescription className="text-center text-muted-foreground text-sm">
              Você ganhou uma recompensa por responder a pesquisa.
            </DialogDescription>
          </DialogHeader>
          <div className="relative flex justify-center items-center h-20 my-2">
             <CheckCircle className="text-green-500 h-16 w-16 z-10" />
          </div>
          <p className="text-lg font-semibold mt-2">Você recebeu:</p>
          <p className="text-3xl font-bold text-[#1DB954] my-1 tabular-nums">
            R$ {animatedAmount.toFixed(2).replace('.', ',')}
          </p>
          <Button onClick={handleClosePopup} className="mt-4 w-full bg-[#1DB954] text-white hover:bg-[#1ED760]">
            Continuar
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={showFinalPopup} onOpenChange={setShowFinalPopup}>
        <DialogContent className="sm:max-w-xs bg-white p-6 rounded-lg shadow-lg text-center overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-col items-center justify-center">
                <p className="text-3xl font-bold text-[#1DB954] whitespace-nowrap tabular-nums">R$ {animatedFinalBalance.toFixed(2).replace('.', ',')}</p>
                <p className="text-sm text-gray-500">Seu saldo subiu!</p>
            </div>
            <div className="relative flex justify-center items-center h-20 my-4">
             <CheckCircle className="text-green-500 h-16 w-16 z-10" />
            </div>
            <DialogHeader className="mt-2 text-center">
              <DialogTitle className="text-3xl font-bold text-[#1DB954]">Parabéns!</DialogTitle>
              <DialogDescription className="text-lg text-gray-600">
                Você atingiu seu limite diário!
              </DialogDescription>
            </DialogHeader>
            <Button onClick={handleSaqueAgora} className="w-full bg-[#1DB954] text-white hover:bg-[#1ED760] rounded-lg text-lg font-bold py-3 mt-4">
              SAQUE AGORA
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
