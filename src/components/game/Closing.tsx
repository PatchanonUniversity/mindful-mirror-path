import { motion } from "framer-motion";
import type { GameState } from "./GameContainer";

interface Props {
  state: GameState;
  onNext: () => void; // เพิ่ม props นี้เพื่อไปหน้าถัดไป
}

const Closing = ({ state, onNext }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="phase-container text-center"
    >
      <div className="space-y-12 w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2 }}
          className="space-y-6"
        >
          <div className="w-16 h-px bg-warm/40 mx-auto" />

          <blockquote className="font-serif text-xl md:text-2xl leading-relaxed text-foreground italic">
            "การตัดสินใจ ควรอิงจากประสบการณ์ แต่เมื่อใดที่ตัดสินใจพลาดไป
            นั่นแหละคือประสบการณ์"
          </blockquote>

          <div className="w-16 h-px bg-warm/40 mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1.2 }}
          className="space-y-4"
        >
          <p className="font-serif text-lg ">
            ขอบคุณที่ร่วมเดินทางกับเรา {state.userName}
          </p>

          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            จากทีมผู้พัฒนา To The Other Me
            <br />
            หวังว่าคุณจะเจอตัวตนของตัวเอง
          </p>
        </motion.div>

        {/* --- ส่วนที่เพิ่มปุ่มใหม่เข้ามา --- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
          className="flex flex-col items-center space-y-6"
        >
          <button
            onClick={onNext}
            className="font-body text-sm px-6 py-2 border border-warm/30 rounded-full  hover:bg-warm/5 hover:text-foreground transition-all duration-300"
          >
            เขียนจดหมายถึงตัวเองในอีก 5 ปี
          </button>

          <button
            onClick={() => window.location.reload()}
            className="font-body text-xs  hover:text-muted-foreground/90 transition-colors duration-300 underline underline-offset-4"
          >
            เริ่มต้นอีกครั้ง
          </button>
        </motion.div>
        {/* --------------------------- */}
      </div>
    </motion.div>
  );
};

export default Closing;
