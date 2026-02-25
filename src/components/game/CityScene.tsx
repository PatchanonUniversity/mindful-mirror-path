import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { GameState } from "./GameContainer";

interface Props {
  onFadeSound: () => void;
  state: GameState;
  update: (partial: Partial<GameState>) => void;
  onNext: () => void;
}

// --- Data สำหรับรถ ---
const CARS = [
  { id: 1, side: "left", y: "15%", speed: 4, delay: 0, icon: "🚗" },
  { id: 2, side: "right", y: "30%", speed: 6, delay: 1, icon: "🚕" },
  { id: 4, side: "right", y: "70%", speed: 5, delay: 2, icon: "🏍️🏍️" },
  { id: 5, side: "left", y: "85%", speed: 7, delay: 1.5, icon: "🚌" },
];

const CityScene = ({ onFadeSound, state, update, onNext }: Props) => {
  const [subStep, setSubStep] = useState(0);
  const [feeling, setFeeling] = useState("");

  const handleFeelingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feeling.trim()) return;
    update({ userFeeling: feeling.trim() });
    setSubStep(4);
    setTimeout(() => setSubStep(4.5), 3000);
    setTimeout(() => setSubStep(5), 8000);
    setTimeout(() => setSubStep(6), 13000);
    setTimeout(() => onNext(), 16000);
  };

  const handleFadeHornSound = () => {
    onFadeSound();
    setSubStep(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, hsl(var(--city-dark)), hsl(var(--city-muted)))",
      }}
    >
      {/* LAYER 1: รถวิ่ง (จะแสดงเฉพาะตอนที่ยังวุ่นวาย) */}
      <AnimatePresence>
        {subStep < 6 && (
          <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
            {CARS.map((car) => (
              <motion.div
                key={car.id}
                initial={{ x: car.side === "left" ? "-100%" : "100vw" }}
                animate={{ x: car.side === "left" ? "100vw" : "-100%" }}
                transition={{
                  duration: car.speed,
                  repeat: Infinity,
                  ease: "linear",
                  delay: car.delay,
                }}
                style={{ top: car.y, position: "absolute" }}
                className="text-5xl filter blur-[1px]"
              >
                <span
                  style={{
                    display: "block",
                    transform: car.side === "left" ? "scaleX(-1)" : "none",
                  }}
                >
                  {car.icon}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="space-y-6 text-center">
        {subStep === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            // ใช้ flex-col และ items-center เพื่อจัดกึ่งกลาง และ gap-8 เพื่อเพิ่มระยะห่าง

            className="flex flex-col items-center justify-center space-y-8"
          >
            <motion.p
              animate={{ opacity: 0.8 }}
              className="font-body text-lg text-cream italic text-center"
            >
              ปี้นปี้น!! เสียงคนพูดคุย!!! เสียงความวุ่นวายของเมือง!!
            </motion.p>

            <motion.button
              onClick={handleFadeHornSound}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              animate={{ opacity: 1 }}
              className="w-12 h-12 rounded-full border border-cream/20 bg-cream/5 backdrop-blur-sm flex items-center justify-center text-cream/60 hover:border-cream/50 hover:text-cream transition-all shadow-lg"
            >
              <span className="mb-1 text-xl font-serif">...</span>
            </motion.button>

            <motion.img
              src="/scene1.gif"
              alt="loading"
              className="w-1/5 opacity-80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
          </motion.div>
        )}

        {subStep === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            // ใช้ flex-col และ items-center เพื่อจัดกึ่งกลางแนวตั้งและแนวนอน

            className="flex flex-col items-center justify-center space-y-10"
          >
            <motion.p
              animate={{ opacity: 0.8 }}
              className="narrator-text text-cream text-center max-w-md"
            >
              เงาปริศนาปรากฏตัวออกมาท่ามกลางความวุ่นวาย... <br />
              แต่ยังเห็นหน้าไม่ชัด
            </motion.p>

            <motion.button
              onClick={() => setSubStep(2)} // ไป Step ถัดไป (วุ่นวายเนอะ ว่ามั้ย...)
              whileHover={{
                scale: 1.1,

                backgroundColor: "rgba(255,253,240,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full border border-cream/20 bg-cream/5 backdrop-blur-sm flex items-center justify-center text-cream/60 hover:border-cream/50 hover:text-cream transition-all cursor-pointer"
            >
              <span className="mb-1 text-xl font-serif italic">...</span>
            </motion.button>

            <motion.img
              src="/scene2.gif"
              alt="loading"
              className="w-1/5 opacity-80 pointer-events-none"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1.5 }}
              transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            />
          </motion.div>
        )}

        {subStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8 flex flex-col items-center justify-center w-full"
          >
            <p className="text-cream-dark/90 text-xl md:text-2xl text-cream leading-relaxed">
              "วุ่นวายเนอะ ว่ามั้ย?"
            </p>

            <motion.button
              onClick={() => setSubStep(2.5)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="w-12 h-12 rounded-full border border-cream/20 bg-cream/5 backdrop-blur-sm flex items-center justify-center text-cream/60 hover:border-cream/50 hover:text-cream transition-all"
            >
              <span className="mb-1 text-xl font-serif">...</span>
            </motion.button>
          </motion.div>
        )}

        {subStep === 2.5 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8 flex flex-col items-center justify-center w-full"
          >
            <p className="text-cream-dark/90 text-xl md:text-2xl text-cream leading-relaxed">
              "คุณสงสัย แต่บางอย่างในแววตาของเขาทำให้คุณรู้สึกสบายใจ"
            </p>

            <motion.button
              onClick={() => setSubStep(3)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="w-12 h-12 rounded-full border border-cream/20 bg-cream/5 backdrop-blur-sm flex items-center justify-center text-cream/60 hover:border-cream/50 hover:text-cream transition-all"
            >
              <span className="mb-1 text-xl font-serif">...</span>
            </motion.button>
          </motion.div>
        )}

        {subStep === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-4 flex flex-col items-center"
          >
            <p className="font-serif text-xl md:text-2xl text-cream-dark/90 leading-relaxed">
              "ว่าไง {state.userName} รู้สึกยังไงบ้างตอนนี้?"
            </p>

            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              onSubmit={handleFeelingSubmit}
              className="space-y-2"
            >
              <input
                type="text"
                value={feeling}
                onChange={(e) => setFeeling(e.target.value)}
                placeholder="บอกความรู้สึกของคุณ..."
                className="game-input-dark text-center"
                autoFocus
              />
            </motion.form>

            <motion.button
              onClick={handleFeelingSubmit}
              whileHover={{
                scale: 1.1,

                backgroundColor: "rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="w-12 h-12 rounded-full border border-cream/20 bg-cream/5 backdrop-blur-sm flex items-center justify-center text-cream/60 hover:border-cream/50 hover:text-cream transition-all"
            >
              <span className="mb-1 text-2xl font-bold font-serif tracking-widest">
                ...
              </span>
            </motion.button>
          </motion.div>
        )}

        {subStep === 4 && (
          <>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="font-serif text-lg text-cream/80"
            >
              {state.userName} : เดี๋ยวนะ! คุณคือใคร? รู้จักชื่อฉันได้ไง?
            </motion.p>
          </>
        )}

        {subStep === 4.5 && (
          <>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="font-serif text-lg text-cream/80"
            >
              คุณถามด้วยความสงสัย
            </motion.p>
          </>
        )}

        {subStep === 5 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="font-serif text-xl text-cream leading-relaxed"
          >
            "คุณไม่ต้องรู้หรอกว่าฉันคือใคร... เอาเป็นว่าเราไปหาที่เงียบๆ
            คุยกันดีกว่า"
          </motion.p>
        )}

        {subStep === 6 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="narrator-text text-cream"
          >
            บรรยากาศเริ่มสงบลง...
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default CityScene;
