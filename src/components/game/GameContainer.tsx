import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Disclaimer from "@/components/game/Disclaimer";
import Welcome from "@/components/game/Welcome";
import CityScene from "@/components/game/CityScene";
import TheShift from "@/components/game/TheShift";
import DeepQuestions from "@/components/game/DeepQuestions";
import Empowerment from "@/components/game/Empowerment";
import TheBasket from "@/components/game/TheBasket";
import TheResult from "@/components/game/TheResult";
import Closing from "@/components/game/Closing";
import FutureLetter from "./FutureLetter";

export interface GameState {
  userName: string;
  userHobby: string;
  userFeeling: string;
  stillLikesHobby: boolean | null;
  hobbyWhyNot: string;
  userLife: string;
  userChasing: string;
  isSelf: boolean | null;
  userTired: string;
  userDream: string;
  userExpectation: string;
  flowerResult: string;
  userLetter: string;
}

const initialState: GameState = {
  userName: "",
  userHobby: "",
  userFeeling: "",
  stillLikesHobby: null,
  hobbyWhyNot: "",
  userLife: "",
  userChasing: "",
  isSelf: null,
  userTired: "",
  userDream: "",
  userExpectation: "",
  flowerResult: "",
  userLetter: "",
};

interface Props {
  playMusic: (src: string) => void;
}

const GameContainer = ({ playMusic }: Props) => {
  const [step, setStep] = useState(0);
  const [gameState, setGameState] = useState<GameState>(initialState);
  useEffect(() => {
    if (step === 0) {
      playMusic("/sonican-slow-piano-cinematic-mood-329858.mp3");
    }
    if (step === 2) {
      playMusic("/km007-street-ambience-9267.mp3");
    }
    if (step === 3) {
      playMusic("/tunetank-ambient-piano-relaxing-music-347950.mp3");
    }
  }, [step]);

  const update = (partial: Partial<GameState>) => {
    setGameState((prev) => ({ ...prev, ...partial }));
  };

  const next = () => setStep((s) => s + 1);

  return (
    <div className="min-h-screen w-full">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <Disclaimer key="disclaimer" onNext={next} playMusic={playMusic} />
        )}{" "}
        {step === 1 && (
          <Welcome
            key="welcome"
            state={gameState}
            update={update}
            onNext={next}
          />
        )}
        {step === 2 && (
          <CityScene
            key="city"
            state={gameState}
            update={update}
            onNext={next}
          />
        )}
        {step === 3 && (
          <TheShift
            key="shift"
            state={gameState}
            update={update}
            onNext={next}
          />
        )}
        {step === 4 && (
          <DeepQuestions
            key="deep"
            state={gameState}
            update={update}
            onNext={next}
          />
        )}
        {step === 5 && (
          <Empowerment
            key="empower"
            state={gameState}
            update={update}
            onNext={next}
          />
        )}
        {step === 6 && (
          <TheBasket
            key="basket"
            state={gameState}
            update={update}
            onNext={next}
          />
        )}
        {step === 7 && (
          <TheResult
            key="result"
            state={gameState}
            update={update}
            onNext={next}
          />
        )}
        {step === 8 && (
          <Closing key="closing" state={gameState} onNext={next} />
        )}
        {step === 9 && (
          <FutureLetter key="letter" state={gameState} update={update} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameContainer;
