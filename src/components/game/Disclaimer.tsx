import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  onNext: () => void;
}

const Disclaimer = ({ onNext }: Props) => {
  const [subStep, setSubStep] = useState(0);
  const [agreed, setAgreed] = useState(false);

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
        transition={{ delay: 0.5, duration: 1 }}
        className="space-y-8 max-w-lg"
      >
        <h1 className="font-serif text-3xl md:text-4xl text-foreground tracking-wide">
          To The Other Me
        </h1>

        {subStep === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="space-y-6"
          >
            {/* <h3 className="font-serif text-lg text-foreground">คำเตือน</h3> */}
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              สถานที่นี้เปรียบเสมือนพื้นที่ปลอดภัยสำหรับการสำรวจตัวตน
              ประสบการณ์นี้อาจกระตุ้นอารมณ์และความรู้สึกบางอย่างที่ลึกซึ้ง
              หากคุณรู้สึกไม่สบายใจ สามารถหยุดได้ทุกเมื่อ
            </p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              onClick={() => setSubStep(1)}
              className="choice-button"
            >
              ถัดไป
            </motion.button>
          </motion.div>
        )}

        {subStep === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            {/* <h3 className="font-serif text-lg text-foreground">นโยบายข้อมูล</h3> */}
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              ข้อมูลที่คุณกรอกจะถูกใช้ระหว่างการเดินทางเท่านั้น
              จะไม่มีการเก็บหรือแชร์ข้อมูลส่วนตัวของคุณไปที่ใด
              เมื่อปิดหน้าเว็บข้อมูลทั้งหมดจะหายไป
            </p>

            <label className="flex items-center gap-3 cursor-pointer justify-center">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 accent-warm rounded"
              />
              <span className="font-body text-sm text-muted-foreground">
                ฉันเข้าใจและยินยอมดำเนินการต่อ
              </span>
            </label>

            <button
              onClick={onNext}
              disabled={!agreed}
              className="choice-button disabled:opacity-30 disabled:cursor-not-allowed"
            >
              เริ่มต้นการเดินทาง
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Disclaimer;
