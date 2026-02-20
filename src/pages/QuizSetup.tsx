import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Play } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { categoryIcons, type CategoryId, type Difficulty } from "@/data/questions";
import { cn } from "@/lib/utils";

const categories: CategoryId[] = [
  "oldTestament", "newTestament", "gospels", "prophets", "apostles",
  "womenOfBible", "miracles", "parables", "biblicalHistory", "generalKnowledge",
];

const difficulties: Difficulty[] = ["easy", "medium", "hard", "expert"];

const difficultyColors: Record<Difficulty, string> = {
  easy: "bg-success/10 text-success border-success/20",
  medium: "bg-gold/10 text-gold border-gold/20",
  hard: "bg-destructive/10 text-destructive border-destructive/20",
  expert: "bg-purple/10 text-purple border-purple/20",
};

export default function QuizSetup() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { t } = useLanguage();

  const preselected = params.get("category") as CategoryId | null;
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(preselected);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);

  const canStart = selectedCategory && selectedDifficulty;

  return (
    <motion.div
      className="px-4 pt-2 pb-24 max-w-lg mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <button onClick={() => navigate("/")} className="flex items-center gap-1 text-muted-foreground mb-4">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">{t.nav.home}</span>
      </button>

      <h1 className="font-serif text-2xl font-bold mb-6">{t.quiz.selectCategory}</h1>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "bg-card border rounded-xl p-3 text-left flex items-center gap-3 transition-all",
              selectedCategory === cat
                ? "border-gold shadow-glow-gold ring-1 ring-gold/30"
                : "border-border"
            )}
          >
            <span className="text-xl">{categoryIcons[cat]}</span>
            <span className="text-sm font-medium">{t.categories[cat]}</span>
          </button>
        ))}
      </div>

      <h2 className="font-serif text-xl font-bold mb-4">{t.quiz.selectDifficulty}</h2>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {difficulties.map((diff) => (
          <button
            key={diff}
            onClick={() => setSelectedDifficulty(diff)}
            className={cn(
              "rounded-xl p-3 text-center font-semibold border transition-all",
              difficultyColors[diff],
              selectedDifficulty === diff && "ring-2 ring-offset-2 ring-offset-background"
            )}
          >
            {t.quiz[diff]}
          </button>
        ))}
      </div>

      <motion.button
        onClick={() => canStart && navigate(`/quiz/play?category=${selectedCategory}&difficulty=${selectedDifficulty}`)}
        disabled={!canStart}
        className={cn(
          "w-full rounded-2xl p-4 flex items-center justify-center gap-3 font-bold text-lg transition-all",
          canStart
            ? "bg-gradient-gold text-gold-foreground shadow-glow-gold active:scale-[0.98]"
            : "bg-muted text-muted-foreground"
        )}
        whileTap={canStart ? { scale: 0.97 } : {}}
      >
        <Play className="w-5 h-5" />
        {t.quiz.start}
      </motion.button>
    </motion.div>
  );
}
