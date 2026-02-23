import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { GameState } from "./GameContainer";

interface Props {
  state: GameState;
  update: (partial: Partial<GameState>) => void;
}

const FutureLetter = ({ state, update }: Props) => {
  // สร้าง local state เพื่อเช็คว่าเขียนจดหมายเสร็จหรือยัง
  const [isEmailStep, setIsEmailStep] = useState(false);
  const [email, setEmail] = useState("");

  const isReady = state.userLetter.trim().length > 0;
  const isEmailValid = email.includes("@") && email.includes(".");

  const now = new Date();
  const date = now.toISOString().split("T")[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="phase-container flex flex-col items-center justify-center p-6"
    >
      <div className="w-full max-w-md space-y-6">
        <AnimatePresence mode="wait">
          {!isEmailStep ? (
            /* --- ส่วนที่ 1: หน้าเขียนจดหมาย --- */
            <motion.div
              key="writing-step"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <h2 className=" text-2xl text-foreground">
                  ถึง: {state.userName} ในอีก 5 ปี
                </h2>
                <p className="text-15px]  uppercase tracking-widest">
                  จาก: {state.userName} {date}
                </p>
              </div>

              <textarea
                value={state.userLetter}
                onChange={(e) => update({ userLetter: e.target.value })}
                placeholder="พิมพ์สิ่งที่อยากจะบอกตัวคุณในอีกห้าปีข้างหน้า"
                className="w-full h-80 p-6 bg-warm/5 border border-warm/20 rounded-2xl outline-none font-body leading-relaxed focus:border-warm/40 transition-all shadow-inner"
              />

              <div className="flex justify-center">
                <button
                  disabled={!isReady}
                  onClick={() => setIsEmailStep(true)}
                  className="px-8 py-3 bg-foreground text-background rounded-full font-body text-sm hover:opacity-90 transition-all disabled:opacity-20"
                >
                  เสร็จสิ้น
                </button>
              </div>
            </motion.div>
          ) : (
            /* --- ส่วนที่ 2: หน้ากรอกอีเมล --- */
            <motion.div
              key="email-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8 text-center"
            >
              <div className="space-y-4">
                {/* <h2 className="font-serif text-2xl text-foreground">
                  จดหมายของคุณถูกบันทึกแล้ว
                </h2> */}
                <p className="font-body text-lg text-muted-foreground font-semibold leading-relaxed">
                  เราจะส่งจดหมายฉบับนี้ให้คุณตามอีเมลที่กรอกมา <br />
                  <span className="text-foreground text-muted-foreground font-semibold italic text-sm">
                    ในอีกห้าปีข้างหน้า
                  </span>
                </p>
              </div>

              <div className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="กรอกอีเมลของคุณ"
                  className="w-full p-4 bg-transparent border-b border-warm/30 outline-none text-center font-body text-lg focus:border-warm/80 transition-colors"
                />

                <button
                  disabled={!isEmailValid}
                  onClick={() => window.location.reload()}
                  className="px-8 py-3 bg-foreground text-background rounded-full font-body text-sm hover:opacity-90 transition-all disabled:opacity-20"
                >
                  ส่งจดหมายและจบการเดินทาง
                </button>
              </div>

              <button
                onClick={() => setIsEmailStep(false)}
                className="font-xs text-muted-foreground underline underline-offset-4"
              >
                กลับไปแก้ไขจดหมาย
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FutureLetter;
