import { motion } from "framer-motion";
import { BarChart3, Target, Clock, TrendingUp } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useGameState } from "@/hooks/useGameState";
import { categoryIcons, type CategoryId } from "@/data/questions";

export default function Stats() {
  const { t } = useLanguage();
  const { state } = useGameState();

  const accuracy = state.totalAnswers > 0
    ? Math.round((state.correctAnswers / state.totalAnswers) * 100)
    : 0;

  const catEntries = Object.entries(state.categoryStats) as [CategoryId, { correct: number; total: number }][];
  const sorted = [...catEntries].sort((a, b) => {
    const aPct = a[1].total > 0 ? a[1].correct / a[1].total : 0;
    const bPct = b[1].total > 0 ? b[1].correct / b[1].total : 0;
    return bPct - aPct;
  });

  return (
    <motion.div
      className="px-4 pt-2 pb-24 max-w-lg mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="font-serif text-2xl font-bold mb-6">{t.stats.title}</h1>

      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <Target className="w-5 h-5 mx-auto text-gold mb-1" />
          <p className="text-2xl font-bold">{accuracy}%</p>
          <p className="text-xs text-muted-foreground">{t.stats.accuracy}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <BarChart3 className="w-5 h-5 mx-auto text-purple mb-1" />
          <p className="text-2xl font-bold">{state.gamesPlayed}</p>
          <p className="text-xs text-muted-foreground">{t.stats.gamesPlayed}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <TrendingUp className="w-5 h-5 mx-auto text-success mb-1" />
          <p className="text-2xl font-bold">{state.totalScore}</p>
          <p className="text-xs text-muted-foreground">{t.stats.totalScore}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 text-center">
          <Clock className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
          <p className="text-2xl font-bold">{state.totalAnswers}</p>
          <p className="text-xs text-muted-foreground">{t.quiz.questionsCount}</p>
        </div>
      </div>

      {catEntries.length > 0 && (
        <>
          <h2 className="font-serif text-lg font-semibold mb-3">{t.stats.byCategory}</h2>
          <div className="space-y-3">
            {sorted.map(([cat, data]) => {
              const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
              return (
                <div key={cat} className="bg-card border border-border rounded-xl p-3 flex items-center gap-3">
                  <span className="text-xl">{categoryIcons[cat]}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{t.categories[cat]}</p>
                    <div className="w-full bg-muted rounded-full h-2 mt-1">
                      <div
                        className="h-full rounded-full bg-gradient-gold transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-bold">{pct}%</span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </motion.div>
  );
}
