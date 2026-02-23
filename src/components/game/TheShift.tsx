import { motion } from "framer-motion";
import { useState } from "react";
import type { GameState } from "./GameContainer";

interface Props {
  state: GameState;
  update: (partial: Partial<GameState>) => void;
  onNext: () => void;
}

const TheShift = ({ state, update, onNext }: Props) => {
  const [subStep, setSubStep] = useState(0);
  const [whyNot, setWhyNot] = useState("");
  const [userLife, setUserLife] = useState("");

  const handleStillLikes = (likes: boolean) => {
    update({ stillLikesHobby: likes });
    if (likes) {
      setSubStep(3);
    } else {
      setSubStep(2);
    }
  };

  const handleWhyNot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whyNot.trim()) return;
    update({ hobbyWhyNot: whyNot.trim() });
    setSubStep(3);
  };

  const handleLife = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userLife.trim()) return;
    update({ userLife: userLife.trim() });
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="phase-container text-center"
    >
      <div className="space-y-8 w-full max-w-md">
        {subStep === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }} // ปรับตัวแม่เป็น 1 เพื่อให้ปุ่มชัด แต่ไปลดที่ p แทน
            transition={{ duration: 1.2 }}
            className="space-y-8 flex flex-col items-center" // เพิ่ม flex-col และ items-center เพื่อให้ปุ่มอยู่กลาง
          >
            <p className="narrator-text text-muted-foreground opacity-50">
              เสียงเมืองเริ่มจางหายไป... ความสงบเข้ามาเเทน
            </p>

            <motion.button
              onClick={() => setSubStep(1)}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(0, 0, 0, 0.1)", // เปลี่ยนเป็นสีดำจางๆ ตอน Hover
              }}
              whileTap={{ scale: 0.95 }}
              // เปลี่ยน border เป็นสีดำ/40 และ text เป็นสีดำ/70 เพื่อให้ตัดกับพื้นหลังขาว
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <p className="dialogue-text text-muted-foreground">
              "ฉันจำได้นะว่าเธอชอบ {state.userHobby}"
            </p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="dialogue-text text-muted-foreground"
            >
              ยังชอบ {state.userHobby} อยู่มั้ย?
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 1 }}
              className="flex gap-4 justify-center"
            >
              <button
                onClick={() => handleStillLikes(true)}
                className="choice-button"
              >
                ชอบสิ
              </button>
              <button
                onClick={() => handleStillLikes(false)}
                className="choice-button"
              >
                ไม่ได้ชอบแล้ว
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
            <p className="dialogue-text">"ทำไมหละ?"</p>
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              onSubmit={handleWhyNot}
              className="space-y-2"
            >
              <input
                type="text"
                value={whyNot}
                onChange={(e) => setWhyNot(e.target.value)}
                placeholder="เล่าให้ฟังหน่อย..."
                className="game-input text-center"
                autoFocus
              />
            </motion.form>
          </motion.div>
        )}

        {subStep === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            // เพิ่ม flex และ items-center เพื่อให้ปุ่มวงกลมอยู่ตรงกลาง
            className="space-y-10 flex flex-col items-center"
          >
            <p className="font-serif text-lg">
              เอ้ะ! เดี๋ยวนะ เธอรู้ได้ไงว่าชั้น...
            </p>

            <motion.button
              onClick={() => setSubStep(4)}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <p className="dialogue-text text-muted-foreground">
              "ชีวิตช่วงนี้เป็นไงบ้าง อยากเล่าให้ชั้นฟังมั้ย?"
            </p>

            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              onSubmit={handleLife}
              className="space-y-2"
            >
              <input
                type="text"
                value={userLife}
                onChange={(e) => setUserLife(e.target.value)}
                placeholder="เล่าเรื่องราวของคุณ..."
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

export default TheShift;
