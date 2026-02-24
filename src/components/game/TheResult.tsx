import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { GameState } from "./GameContainer";

interface Props {
  state: GameState;
  update: (partial: Partial<GameState>) => void;
  onNext: () => void;
}

const TheResult = ({ state, update, onNext }: Props) => {
  const [subStep, setSubStep] = useState(0);

  const [flower, setFlower] = useState({ name: "", meaning: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFlower = async () => {
      setIsLoading(true);

      try {
        const res = await fetch("/api/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(state),
        });

        if (!res.ok) {
          throw new Error("Fetch failed");
        }

        const data = await res.json();
        setFlower(data);
      } catch (error) {
        console.error(error);

        setFlower({
          name: "ดอกเดซี่",
          meaning:
            "ดอกเดซี่เป็นสัญลักษณ์ของชีวิตที่เรียบง่ายแต่มั่นคง เติบโตได้แม้ในพื้นที่ธรรมดา ไม่ต้องโดดเด่นหรือสมบูรณ์แบบเพื่อจะมีคุณค่า สื่อถึงการเริ่มต้นใหม่ ความบริสุทธิ์ใจ และความหวังเล็ก ๆ ที่คอยย้ำเตือนว่า ต่อให้โลกจะวุ่นวายหรือโหดร้ายเพียงใด เราก็ยังสามารถยืนหยัด เป็นตัวของตัวเอง และค่อย ๆ เบ่งบานในจังหวะของเราได้เสมอ ไม่ว่าผลลัพธ์จะเป็นยังไง ชั้นภูมิใจในตัวเธอเสมอนะ",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlower();
  }, [state]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="phase-container text-center"
    >
      <div className="space-y-8 w-full max-w-lg">
        {subStep === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-6 flex flex-col items-center"
          >
            <p className="dialogue-text text-muted-foreground">
              "อ่ะ…นี่ เราให้"
            </p>

            {!isLoading && (
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
            )}
          </motion.div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center space-y-4">
            <p className="italic text-slate-400">
              กำลังเลือกดอกไม้ที่เหมาะกับคุณ...
            </p>
          </div>
        ) : (
          subStep === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="space-y-6 flex flex-col items-center text-center"
            >
              <p className="dialogue-text text-muted-foreground">
                "ดอกไม้ดอกนี้คือ{" "}
                <span className="text-slate-800 font-semibold">
                  {flower.name}
                </span>
                "
              </p>
              <motion.img
                src="/scene6.gif"
                alt={flower.name}
                className="w-40 h-40 object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="font-serif text-lg text-muted-foreground leading-relaxed px-4"
              >
                {flower.meaning}
              </motion.p>
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
          )
        )}

        {subStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6 flex flex-col items-center"
          >
            <p className="font-serif text-lg leading-relaxed">
              "มันเติบโตขึ้นจากความพยายามของคุณที่ทำมาโดยตลอด"
            </p>
            <motion.button
              onClick={() => setSubStep(3)}
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

        {subStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="space-y-6 flex flex-col items-center"
          >
            <p className="dialogue-text italic text-muted-foreground">
              "ไม่ว่าผลลัพธ์จะเป็นยังไง ฉันภูมิใจในตัวเธอเสมอนะ
              เธอเก่งที่สุดอยู่เเล้ว"
            </p>
            <motion.button
              onClick={() => setSubStep(4)}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 1.2 }}
              className="w-14 h-14 rounded-full border-2 border-slate-400 bg-white/50 backdrop-blur-md flex items-center justify-center text-slate-700 shadow-md cursor-pointer transition-all hover:border-slate-600 hover:text-slate-900"
            >
              <span className="mb-1 text-2xl font-bold font-serif tracking-widest">
                ...
              </span>
            </motion.button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              onClick={() => setSubStep(4)}
              className="enter-hint cursor-pointer hover:opacity-80"
            >
              ...
            </motion.button>
          </motion.div>
        )}

        {subStep === 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="space-y-6 flex flex-col items-center"
          >
            <p className="narrator-text">
              เงาปริศนาค่อยๆ ชัดขึ้นจนเห็นหน้าลางๆ คล้ายๆตัวเราในอนาคต
              และค่อยๆจางหายไป... พร้อมกับเสียงถนนคนเดิน
              ความวุ่นวายที่เริ่มกลับมา
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="narrator-text"
            >
              คุณมองดอกไม้ในมือ
            </motion.p>
            <motion.button
              onClick={onNext}
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 3, duration: 1 }}
              className="w-14 h-14 rounded-full border-2 border-slate-400 bg-white/50 backdrop-blur-md flex items-center justify-center text-slate-700 shadow-md cursor-pointer transition-all hover:border-slate-600 hover:text-slate-900"
            >
              <span className="mb-1 text-2xl font-bold font-serif tracking-widest">
                ...
              </span>
            </motion.button>
            <motion.img
              src="/scene2.gif"
              alt="loading"
              className="w-2/4 opacity-80"
              initial={{ opacity: 1, scale: 1.5 }} // เริ่มใหญ่ทันที
              animate={{ opacity: 0, scale: 1.5 }} // ขนาดเท่าเดิม แค่จาง
              transition={{
                delay: 3,
                duration: 1.2,
                ease: "easeOut",
              }}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default TheResult;
