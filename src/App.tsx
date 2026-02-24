import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useRef } from "react";

const queryClient = new QueryClient();

const App = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playMusic = (src: string, volume = 0.3) => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    audioRef.current.src = src;
    audioRef.current.volume = volume;
    audioRef.current.play();
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* 🎧 audio อยู่ตรงนี้ */}
        <audio ref={audioRef} loop />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index playMusic={playMusic} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
export default App;
