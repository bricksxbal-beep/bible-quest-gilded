import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, RotateCcw, Home } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export default function QuizResults() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { t } = useLanguage();

  const score = Number(params.get("score") || 0);
  const correct = Number(params.get("correct") || 0);
  const total = Number(params.get("total") || 1);
  const pct = Math.round((correct / total) * 100);

  const getMessage = () => {
    if (pct >= 90) return t.quiz.excellent;
    if (pct >= 70) return t.quiz.great;
    if (pct >= 50) return t.quiz.good;
    return t.quiz.keepTrying;
  };

  return (
    <motion.div
      className="px-4 pt-12 pb-24 max-w-lg mx-auto text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-gold flex items-center justify-center shadow-glow-gold"
      >
        <Trophy className="w-12 h-12 text-gold-foreground" />
      </motion.div>

      <h1 className="font-serif text-3xl font-bold mb-2">{getMessage()}</h1>
      <p className="text-muted-foreground mb-8">
        {correct}/{total} — {pct}%
      </p>

      <div className="bg-card border border-border rounded-2xl p-6 mb-8 shadow-premium">
        <p className="text-sm text-muted-foreground mb-1">{t.quiz.score}</p>
        <p className="text-4xl font-bold text-gradient-gold">+{score} XP</p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => navigate("/quiz")}
          className="flex-1 bg-gradient-purple text-purple-foreground rounded-xl p-4 font-semibold flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <RotateCcw className="w-4 h-4" />
          {t.quiz.playAgain}
        </button>
        <button
          onClick={() => navigate("/")}
          className="flex-1 bg-card border border-border rounded-xl p-4 font-semibold flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <Home className="w-4 h-4" />
          {t.quiz.goHome}
        </button>
      </div>
    </motion.div>
  );
}
