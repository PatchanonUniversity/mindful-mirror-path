import { motion } from "framer-motion";
import { useState } from "react";
import type { GameState } from "./GameContainer";

interface Props {
  state: GameState;
  update: (partial: Partial<GameState>) => void;
  onNext: () => void;
}

const DeepQuestions = ({ state, update, onNext }: Props) => {
  const [subStep, setSubStep] = useState(0);
  const [chasing, setChasing] = useState("");
  const [tired, setTired] = useState("");

  const handleChasing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chasing.trim()) return;
    update({ userChasing: chasing.trim() });
    setSubStep(1);
  };

  const handleChoice = (isSelf: boolean) => {
    update({ isSelf });
    setSubStep(2);
  };

  const handleTired = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tired.trim()) return;
    update({ userTired: tired.trim() });
    onNext();
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
            className="space-y-4"
          >
            <p className="dialogue-text text-muted-foreground">
              "แล้วตอนนี้เธอกำลังพยายามวิ่งไล่ตามอะไรบางอย่างอยู่หรือเปล่า?"
            </p>

            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              onSubmit={handleChasing}
              className="space-y-2"
            >
              <input
                type="text"
                value={chasing}
                onChange={(e) => setChasing(e.target.value)}
                className="game-input text-center"
                autoFocus
              />
            </motion.form>
          </motion.div>
        )}

        {subStep === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <p className="dialogue-text text-muted-foreground">
              "สิ่งที่เธอทำอยู่ทุกวันนี้เธอทำเพื่อ 'ความสุขของตัวเอง'
              หรือทำเพื่อ 'ความคาดหวัง' ในสายตาคนอื่น?"
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="flex flex-col gap-3"
            >
              <button
                onClick={() => handleChoice(true)}
                className="choice-button"
              >
                ความสุขของตัวเอง
              </button>
              <button
                onClick={() => handleChoice(false)}
                className="choice-button"
              >
                ความคาดหวังของคนอื่น
              </button>
            </motion.div>
          </motion.div>
        )}

        {subStep === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-4"
          >
            <p className="dialogue-text text-muted-foreground">
              "เหนื่อยมั้ย? ดูเหมือนจะไม่ค่อยสบายใจเลย"
            </p>

            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              onSubmit={handleTired}
              className="space-y-2"
            >
              <input
                type="text"
                value={tired}
                onChange={(e) => setTired(e.target.value)}
                placeholder="เล่าให้ฟังหน่อย..."
                className="game-input text-center"
                autoFocus
              />
            </motion.form>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DeepQuestions;
