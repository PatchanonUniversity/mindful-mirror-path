import { motion } from "framer-motion";
import { useState } from "react";
import type { GameState } from "./GameContainer";

interface Props {
  state: GameState;
  update: (partial: Partial<GameState>) => void;
  onNext: () => void;
}

const TheBasket = ({ state, update, onNext }: Props) => {
  const [subStep, setSubStep] = useState(0);
  const [expectation, setExpectation] = useState("");

  const handleExpectation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expectation.trim()) return;
    update({ userExpectation: expectation.trim() });
    setSubStep(4);
    setTimeout(() => onNext(), 3500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="phase-container text-center"
    >
      <div className="space-y-8 w-full max-w-md">
        {subStep === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6 flex flex-col items-center"
          >
            <p className="dialogue-text text-muted-foreground">
              "เอาละ! เรามาแลกของกันเถอะ"
            </p>
            <motion.button
              onClick={() => setSubStep(1)}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 1 }}
              className="w-14 h-14 rounded-full border-2 border-slate-400 bg-white/50 backdrop-blur-md flex items-center justify-center text-slate-700 shadow-md cursor-pointer transition-all hover:border-slate-600 hover:text-slate-900"
            >
              <span className="mb-1 text-2xl font-bold font-serif tracking-widest">
                ...
              </span>
            </motion.button>
          </motion.div>
        )}

        {subStep === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-6 flex flex-col items-center"
          >
            <p className="font-serif text-xl">
              {state.userName} : "เราไม่มีอะไรจะให้นะสิ"
            </p>
            <motion.button
              onClick={() => setSubStep(2)}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 1 }}
              className="w-14 h-14 rounded-full border-2 border-slate-400 bg-white/50 backdrop-blur-md flex items-center justify-center text-slate-700 shadow-md cursor-pointer transition-all hover:border-slate-600 hover:text-slate-900"
            >
              <span className="mb-1 text-2xl font-bold font-serif tracking-widest">
                ...
              </span>
            </motion.button>
          </motion.div>
        )}

        {subStep === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-6 flex flex-col items-center"
          >
            <p className="dialogue-text text-muted-foreground">
              "มีสิ!! ความคาดหวังของคนอื่นไง"
            </p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="dialogue-text text-muted-foreground"
            >
              "วางความคาดหวังของคนอื่นมาที่ตะกร้านี่เลย"
            </motion.p>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              onClick={() => setSubStep(3)}
              className="choice-button"
            >
              วางลงในตะกร้า
            </motion.button>
            <motion.img
              src="/scene5.gif"
              alt="loading"
              className="w-2/4 opacity-80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            />
          </motion.div>
        )}

        {subStep === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 flex flex-col items-center"
          >
            <p className="dialogue-text text-muted-foreground">
              ปล่อยความคาดหวังของคนอื่นทิ้งไป
            </p>

            <form onSubmit={handleExpectation} className="space-y-2">
              <textarea
                value={expectation}
                onChange={(e) => setExpectation(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleExpectation(e);
                  }
                }}
                placeholder="สิ่งไหนที่คุณแบกรับไว้ ทั้งที่ไม่ใช่ตัวคุณ"
                className="game-input w-full min-h-[80px] resize-none text-center pt-8 pb-0 leading-tight"
                autoFocus
              />
            </form>
            <motion.button
              onClick={handleExpectation}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="w-14 h-14 rounded-full border-2 border-slate-400 bg-white/50 backdrop-blur-md flex items-center justify-center text-slate-700 shadow-md cursor-pointer transition-all hover:border-slate-600 hover:text-slate-900"
            >
              <span className="mb-1 text-2xl font-bold font-serif tracking-widest">
                ...
              </span>
            </motion.button>
          </motion.div>
        )}

        {subStep === 4 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="space-y-4"
          >
            <motion.p
              animate={{ opacity: [1, 0.3] }}
              transition={{ duration: 2.5, delay: 0.5 }}
              className="font-body text-muted-foreground italic"
            >
              "{state.userExpectation}"
            </motion.p>
            <p className="narrator-text">
              ความคาดหวังนั้นค่อยๆ จางหายไปในตะกร้า...
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default TheBasket;
