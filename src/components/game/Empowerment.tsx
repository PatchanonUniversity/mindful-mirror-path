import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import type { GameState } from "./GameContainer";

interface Props {
  state: GameState;
  update: (partial: Partial<GameState>) => void;
  onNext: () => void;
}

const Empowerment = ({ state, update, onNext }: Props) => {
  const [subStep, setSubStep] = useState(0);
  const [dream, setDream] = useState("");
  const [dreamChoice, setDreamChoice] = useState<null | boolean>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  const handleDreamChoice = (hasThought: boolean) => {
    setDreamChoice(hasThought);
    if (hasThought) {
      setSubStep(3); // show input
    } else {
      // skip to encouragement message
      setSubStep(4);
    }
  };

  const handleDream = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dream.trim()) return;
    update({ userDream: dream.trim() });
    setSubStep(5);
  };

  const advanceAfterDreamResponse = () => {
    setSubStep(6);
  };

  const advanceToInspire = () => {
    setSubStep(7);
  };

  const advanceToRegret = () => {
    setSubStep(8);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="phase-container text-center"
    >
      <div className="space-y-6 w-full max-w-md">
        {/* Sub 0: เข้าใจเลย */}
        {subStep === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-6 flex flex-col items-center"
          >
            <p className="dialogue-text text-muted-foreground">
              "ชั้นเข้าใจเลย เข้าใจดีเลยแหละ"
            </p>
            <motion.button
              onClick={() => setSubStep(1)}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-14 h-14 rounded-full border-2 border-slate-400 bg-white/50 backdrop-blur-md flex items-center justify-center text-slate-700 shadow-md cursor-pointer transition-all hover:border-slate-600 hover:text-slate-900"
            >
              <span className="mb-1 text-2xl font-bold font-serif tracking-widest">
                ...
              </span>
            </motion.button>
            <motion.img
              src="/scene3.gif"
              alt="loading"
              className="w-2/4 opacity-80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        )}

        {/* Sub 1: มีพลัง */}
        {subStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6 flex flex-col items-center"
          >
            <p className="dialogue-text text-muted-foreground">
              "แต่คิดไปคิดมา ฉันว่าเธอนะมีพลังบางอย่างอยู่ในตัวนะ
              ไม่งั้นไม่มาถึงจุดนี้หรอก"
            </p>

            <motion.button
              onClick={() => setSubStep(1.5)}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="w-14 h-14 rounded-full border-2 border-slate-400 bg-white/50 backdrop-blur-md flex items-center justify-center text-slate-700 shadow-md cursor-pointer transition-all hover:border-slate-600 hover:text-slate-900"
            >
              <span className="mb-1 text-2xl font-bold font-serif tracking-widest">
                ...
              </span>
            </motion.button>
            <motion.img
              src="/scene3.gif"
              alt="loading"
              className="w-2/4 opacity-80"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        )}

        {/* Sub 1.5: ชม */}
        {subStep === 1.5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-6 flex flex-col items-center"
          >
            <p className="dialogue-text text-muted-foreground">
              "เธอหนะ
              เก่งอยู่แล้วถ้าโลกนี้ไม่มีใครชมเราอย่างน้อยก็ยังมีตัวเราเองที่ชมนะ"
            </p>
            <motion.button
              onClick={() => setSubStep(2)}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-14 h-14 rounded-full border-2 border-slate-400 bg-white/50 backdrop-blur-md flex items-center justify-center text-slate-700 shadow-md cursor-pointer transition-all hover:border-slate-600 hover:text-slate-900"
            >
              <span className="mb-1 text-2xl font-bold font-serif tracking-widest">
                ...
              </span>
            </motion.button>
            <motion.img
              src="/scene3.gif"
              alt="loading"
              className="w-2/4 opacity-80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </motion.div>
        )}

        {/* Sub 2: ถามว่าคิดเรื่องอนาคตหรือยัง */}
        {subStep === 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <p className="dialogue-text text-muted-foreground">
              "ได้คิดเรื่องอนาคตเอาไว้ยังว่าเรียนจบอยากทำอะไร?"
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="flex flex-col gap-3"
            >
              <button
                onClick={() => handleDreamChoice(true)}
                className="choice-button"
              >
                คิดเอาไว้แล้ว
              </button>
              <button
                onClick={() => handleDreamChoice(false)}
                className="choice-button"
              >
                ยังไม่ได้คิดเลย
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Sub 3: input ความฝัน (เลือก "คิดแล้ว") */}
        {subStep === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-4 flex flex-col items-center"
          >
            <p className="dialogue-text text-muted-foreground">
              "เล่าให้ฟังหน่อยสิ อยากทำอะไร?"
            </p>
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              onSubmit={handleDream}
              className="space-y-2"
            >
              <input
                type="text"
                value={dream}
                onChange={(e) => setDream(e.target.value)}
                placeholder="ความฝันของคุณ..."
                className="game-input text-center"
                autoFocus
              />
            </motion.form>
            <motion.button
              onClick={handleDream}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(0, 0, 0, 0.1)", // เปลี่ยนเป็นสีดำจางๆ ตอน Hover
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="w-14 h-14 rounded-full border-2 border-slate-400 bg-white/50 backdrop-blur-md flex items-center justify-center text-slate-700 shadow-md cursor-pointer transition-all hover:border-slate-600 hover:text-slate-900"
            >
              <span className="mb-1 text-2xl font-bold font-serif tracking-widest">
                ...
              </span>
            </motion.button>
          </motion.div>
        )}

        {/* Sub 4: ยังไม่คิด → ข้อความให้กำลังใจ */}
        {subStep === 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-6 flex flex-col items-center"
          >
            <p className="dialogue-text text-muted-foreground">
              "ไม่เป็นไร อายุแค่นี้เองยังมีเวลาให้ลองค้นหาตัวเองอีกตั้งมากมาย"
            </p>

            <motion.button
              onClick={() => setSubStep(6)}
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

        {/* Sub 5: ตอบรับความฝัน (เลือก "คิดแล้ว") */}
        {subStep === 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-6 flex flex-col items-center"
          >
            <p className="dialogue-text text-muted-foreground">
              "อืมมม {state.userDream}! ฉันก็คิดแบบนั้นเหมือนกัน"
            </p>

            <motion.button
              onClick={advanceAfterDreamResponse}
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

        {/* Sub 6: ให้กำลังใจ */}
        {subStep === 6 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6 flex flex-col items-center"
          >
            <p className="dialogue-text text-muted-foreground">
              "คือฉันอยากจะบอกว่า ถ้าตอนนี้กังวลเรื่องอนาคตอยู่ ไม่ต้องกลัว
              อยากทำอะไรทำเลย อยากลองอะไรลองเลย"
            </p>

            <motion.button
              onClick={advanceToInspire}
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

        {/* Sub 7: สิ่งที่เสียดาย → ข้ามไปหน้าต่อไป */}
        {subStep === 7 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="space-y-6 flex flex-col items-center"
          >
            <p className="dialogue-text italic text-muted-foreground">
              "รู้มั้ย สถานที่ที่ฉันจากมาสิ่งเดียวที่ฉันเสียดาย
              'ไม่ใช่การเลือกผิด'
              แต่คือการที่ฉันมัวแต่กังวลจนไม่กล้าเริ่มเดินต่างหากนะ"
            </p>
            <motion.button
              onClick={onNext}
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
      </div>
    </motion.div>
  );
};

export default Empowerment;
