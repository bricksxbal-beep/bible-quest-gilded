import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Trophy, Flame, Star, Crown, ChevronRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useGameState } from "@/hooks/useGameState";
import { categoryIcons, type CategoryId } from "@/data/questions";
import { cn } from "@/lib/utils";

const categoryList: CategoryId[] = [
  "oldTestament", "newTestament", "gospels", "prophets", "apostles",
  "womenOfBible", "miracles", "parables", "biblicalHistory", "generalKnowledge",
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { state, getLevel } = useGameState();
  const level = getLevel();
  const accuracy = state.totalAnswers > 0
    ? Math.round((state.correctAnswers / state.totalAnswers) * 100)
    : 0;

  return (
    <motion.div
      className="px-4 pt-2 pb-24 max-w-lg mx-auto"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="text-center mb-6">
        <p className="text-sm text-muted-foreground">{t.home.welcome}</p>
        <h1 className="text-3xl font-serif font-bold text-gradient-gold">{t.app.name}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t.home.subtitle}</p>
      </motion.div>

      {/* Stats Row */}
      <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-card rounded-xl p-3 text-center shadow-premium border border-border">
          <Flame className="w-5 h-5 mx-auto text-gold mb-1" />
          <p className="text-lg font-bold">{state.streak}</p>
          <p className="text-[10px] text-muted-foreground">{t.home.streak}</p>
        </div>
        <div className="bg-card rounded-xl p-3 text-center shadow-premium border border-border">
          <Crown className="w-5 h-5 mx-auto text-purple mb-1" />
          <p className="text-lg font-bold">{level.level}</p>
          <p className="text-[10px] text-muted-foreground">{t.home.level}</p>
        </div>
        <div className="bg-card rounded-xl p-3 text-center shadow-premium border border-border">
          <Star className="w-5 h-5 mx-auto text-gold mb-1" />
          <p className="text-lg font-bold">{state.totalScore}</p>
          <p className="text-[10px] text-muted-foreground">{t.home.points}</p>
        </div>
      </motion.div>

      {/* Start Quiz CTA */}
      <motion.button
        variants={fadeUp}
        onClick={() => navigate("/quiz")}
        className="w-full bg-gradient-navy text-navy-foreground rounded-2xl p-5 mb-4 flex items-center gap-4 shadow-premium active:scale-[0.98] transition-transform"
      >
        <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-gold" />
        </div>
        <div className="text-left flex-1">
          <p className="font-serif font-bold text-lg">{t.home.startQuiz}</p>
          <p className="text-xs opacity-75">{accuracy}% {t.stats.accuracy.toLowerCase()}</p>
        </div>
        <ChevronRight className="w-5 h-5 opacity-60" />
      </motion.button>

      {/* Daily Challenge */}
      <motion.button
        variants={fadeUp}
        onClick={() => navigate("/quiz")}
        className="w-full bg-gradient-purple text-purple-foreground rounded-2xl p-4 mb-6 flex items-center gap-4 shadow-glow-purple active:scale-[0.98] transition-transform"
      >
        <Trophy className="w-6 h-6" />
        <span className="font-semibold">{t.home.dailyChallenge}</span>
        <ChevronRight className="w-5 h-5 ml-auto opacity-60" />
      </motion.button>

      {/* Categories */}
      <motion.div variants={fadeUp}>
        <h2 className="font-serif font-semibold text-lg mb-3">{t.home.categories}</h2>
        <div className="grid grid-cols-2 gap-3">
          {categoryList.map((cat) => (
            <motion.button
              key={cat}
              variants={fadeUp}
              onClick={() => navigate(`/quiz?category=${cat}`)}
              className="bg-card border border-border rounded-xl p-3 text-left flex items-center gap-3 shadow-sm hover:shadow-premium transition-shadow active:scale-[0.97]"
            >
              <span className="text-2xl">{categoryIcons[cat]}</span>
              <span className="text-sm font-medium leading-tight">
                {t.categories[cat]}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
