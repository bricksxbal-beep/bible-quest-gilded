import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, BookOpen, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useGameState } from "@/hooks/useGameState";
import { questions, type CategoryId, type Difficulty } from "@/data/questions";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const XP_MAP: Record<Difficulty, number> = { easy: 10, medium: 20, hard: 35, expert: 50 };

export default function QuizPlay() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { language, t } = useLanguage();
  const { addXP, addScore, recordAnswer, updateStreak } = useGameState();

  const category = params.get("category") as CategoryId;
  const difficulty = params.get("difficulty") as Difficulty;

  const quizQuestions = useMemo(() => {
    const filtered = questions.filter(
      (q) => q.category === category && q.difficulty === difficulty
    );
    return filtered.sort(() => Math.random() - 0.5).slice(0, 10);
  }, [category, difficulty]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const question = quizQuestions[currentIndex];
  const isFinished = !question;
  const isCorrect = selectedOption === question?.correctIndex;
  const totalQ = quizQuestions.length;

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  const handleSelect = useCallback(
    (index: number) => {
      if (selectedOption !== null) return;
      setSelectedOption(index);
      setShowExplanation(true);

      const correct = index === question.correctIndex;
      recordAnswer(category, correct);

      if (correct) {
        const xp = XP_MAP[difficulty];
        addXP(xp);
        setScore((s) => s + xp);
        setCorrectCount((c) => c + 1);
      }
    },
    [selectedOption, question, category, difficulty, addXP, recordAnswer]
  );

  const handleNext = useCallback(() => {
    setSelectedOption(null);
    setShowExplanation(false);
    if (currentIndex + 1 >= totalQ) {
      addScore(score);
      navigate(`/quiz/results?score=${score}&correct=${correctCount}&total=${totalQ}`, { replace: true });
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, totalQ, score, correctCount, navigate, addScore]);

  if (isFinished || !question) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <p className="text-muted-foreground">No questions available.</p>
      </div>
    );
  }

  const progress = ((currentIndex + 1) / totalQ) * 100;

  return (
    <motion.div
      className="px-4 pt-4 pb-24 max-w-lg mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Progress */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          {t.quiz.question} {currentIndex + 1} {t.quiz.of} {totalQ}
        </span>
        <span className="text-sm font-bold text-gold">+{score} XP</span>
      </div>
      <Progress value={progress} className="h-2 mb-6" />

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="font-serif text-xl font-bold mb-6 leading-snug">
            {question.text[language]}
          </h2>

          <div className="space-y-3 mb-6">
            {question.options[language].map((option, i) => {
              const isSelected = selectedOption === i;
              const isAnswer = i === question.correctIndex;
              const revealed = selectedOption !== null;

              return (
                <motion.button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={revealed}
                  className={cn(
                    "w-full text-left rounded-xl p-4 border transition-all font-medium",
                    !revealed && "bg-card border-border active:scale-[0.98]",
                    revealed && isAnswer && "bg-success/10 border-success text-success",
                    revealed && isSelected && !isAnswer && "bg-destructive/10 border-destructive text-destructive",
                    revealed && !isSelected && !isAnswer && "opacity-50"
                  )}
                  whileTap={!revealed ? { scale: 0.97 } : {}}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-sm font-bold shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{option}</span>
                    {revealed && isAnswer && <CheckCircle2 className="w-5 h-5 text-success shrink-0" />}
                    {revealed && isSelected && !isAnswer && <XCircle className="w-5 h-5 text-destructive shrink-0" />}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-card border border-border rounded-xl p-4 mb-6 overflow-hidden"
              >
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <span className="text-sm font-bold text-success">{t.quiz.correct}</span>
                  ) : (
                    <span className="text-sm font-bold text-destructive">{t.quiz.incorrect}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {question.explanation[language]}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-gold">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{question.reference}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next Button */}
          {selectedOption !== null && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleNext}
              className="w-full bg-gradient-gold text-gold-foreground rounded-2xl p-4 font-bold flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {currentIndex + 1 >= totalQ ? t.quiz.finish : t.quiz.next}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
