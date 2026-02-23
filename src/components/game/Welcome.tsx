import { motion } from "framer-motion";
import { useState } from "react";
import type { GameState } from "./GameContainer";

interface Props {
  state: GameState;
  update: (partial: Partial<GameState>) => void;
  onNext: () => void;
}

const Welcome = ({ state, update, onNext }: Props) => {
  const [nameEntered, setNameEntered] = useState(false);
  const [name, setName] = useState("");
  const [hobby, setHobby] = useState("");

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    update({ userName: name.trim() });
    setNameEntered(true);
  };

  const handleHobbySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hobby.trim()) return;
    update({ userHobby: hobby.trim() });
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1.2 }}
        className="space-y-8 w-full max-w-md"
      >
        <p className="narrator-text">ยินดีต้อนรับสู่ To The Other Me</p>

        {!nameEntered ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="space-y-6"
          >
            <p className="dialogue-text">
              ก่อนที่จะเริ่ม ขอทราบนามสมมติขอบคุณ?
            </p>

            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              onSubmit={handleNameSubmit}
              className="space-y-2"
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="พิมพ์ชื่อของคุณ..."
                className="game-input text-center"
                autoFocus
              />
            </motion.form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <p className="dialogue-text">สวัสดี {state.userName}</p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="dialogue-text"
            >
              เวลาว่างชอบทำอะไร? เช่นงานอดิเรกหรืออะไรก็ได้
            </motion.p>

            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
              onSubmit={handleHobbySubmit}
              className="space-y-2"
            >
              <input
                type="text"
                value={hobby}
                onChange={(e) => setHobby(e.target.value)}
                className="game-input text-center"
                autoFocus
              />
            </motion.form>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Welcome;
