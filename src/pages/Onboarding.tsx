import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Language } from "@/i18n/translations";
import { BookOpen, Globe, Trophy, ChevronRight, Sparkles, Star, CheckCircle2 } from "lucide-react";

const STEPS = 3;

const languageOptions: { code: Language; label: string; flag: string }[] = [
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

const tutorialSteps = [
  { icon: "📖", key: "choose" },
  { icon: "🎯", key: "answer" },
  { icon: "⭐", key: "earn" },
];

export default function Onboarding({ onComplete }: { onComplete?: () => void }) {
  const [step, setStep] = useState(0);
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const finish = () => {
    localStorage.setItem("bqp-onboarded", "true");
    onComplete?.();
    navigate("/", { replace: true });
  };

  const next = () => {
    if (step < STEPS - 1) setStep(step + 1);
    else finish();
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between px-6 py-10 overflow-hidden">
      {/* Progress dots */}
      <div className="flex gap-2 mt-2">
        {Array.from({ length: STEPS }).map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === step ? "w-8 bg-primary" : i < step ? "w-2 bg-primary/60" : "w-2 bg-muted-foreground/20"
            }`}
          />
        ))}
      </div>

      {/* Skip button */}
      <button
        onClick={finish}
        className="absolute top-6 right-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        {t.onboarding.skip}
      </button>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center w-full max-w-sm">
        <AnimatePresence mode="wait" custom={1}>
          {step === 0 && (
            <motion.div
              key="welcome"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex flex-col items-center text-center w-full"
            >
              {/* Animated icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
                className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center mb-8 shadow-xl shadow-primary/20"
              >
                <BookOpen className="w-14 h-14 text-primary-foreground" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <h1 className="text-3xl font-bold font-display text-foreground mb-2">
                  {t.onboarding.welcome}
                </h1>
                <p className="text-lg font-display text-primary font-semibold mb-3">
                  Bible Quiz Pro
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t.onboarding.welcomeDesc}
                </p>
              </motion.div>

              {/* Floating decorations */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute top-32 left-8 text-primary/20"
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute top-40 right-10 text-primary/15"
              >
                <Star className="w-8 h-8" />
              </motion.div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="language"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex flex-col items-center text-center w-full"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
                className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-8 shadow-xl shadow-blue-500/20"
              >
                <Globe className="w-14 h-14 text-white" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="w-full"
              >
                <h2 className="text-2xl font-bold font-display text-foreground mb-6">
                  {t.onboarding.selectLanguage}
                </h2>

                <div className="flex flex-col gap-3 w-full">
                  {languageOptions.map((opt) => (
                    <button
                      key={opt.code}
                      onClick={() => setLanguage(opt.code)}
                      className={`flex items-center gap-4 px-5 py-4 rounded-2xl border-2 transition-all duration-200 ${
                        language === opt.code
                          ? "border-primary bg-primary/10 shadow-md shadow-primary/10"
                          : "border-border bg-card hover:border-primary/40"
                      }`}
                    >
                      <span className="text-3xl">{opt.flag}</span>
                      <span className="text-lg font-semibold text-foreground">{opt.label}</span>
                      {language === opt.code && (
                        <CheckCircle2 className="w-5 h-5 text-primary ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="tutorial"
              custom={1}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex flex-col items-center text-center w-full"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
                className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-8 shadow-xl shadow-amber-500/20"
              >
                <Trophy className="w-14 h-14 text-white" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="w-full"
              >
                <h2 className="text-2xl font-bold font-display text-foreground mb-2">
                  {t.onboarding.howItWorks}
                </h2>
                <p className="text-muted-foreground mb-8">
                  {t.onboarding.howItWorksDesc}
                </p>

                {/* Tutorial steps */}
                <div className="flex flex-col gap-4 w-full">
                  {[
                    { icon: "📖", title: { pt: "Escolha uma categoria", en: "Choose a category", es: "Elige una categoría" }, desc: { pt: "10 categorias bíblicas", en: "10 biblical categories", es: "10 categorías bíblicas" } },
                    { icon: "🎯", title: { pt: "Responda perguntas", en: "Answer questions", es: "Responde preguntas" }, desc: { pt: "4 alternativas por pergunta", en: "4 choices per question", es: "4 opciones por pregunta" } },
                    { icon: "⭐", title: { pt: "Ganhe XP e suba de nível", en: "Earn XP and level up", es: "Gana XP y sube de nivel" }, desc: { pt: "Desbloqueie conquistas", en: "Unlock achievements", es: "Desbloquea logros" } },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.15 }}
                      className="flex items-center gap-4 bg-card border border-border rounded-2xl px-5 py-4 text-left"
                    >
                      <span className="text-3xl">{item.icon}</span>
                      <div>
                        <p className="font-semibold text-foreground">{item.title[language]}</p>
                        <p className="text-sm text-muted-foreground">{item.desc[language]}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={next}
        className="w-full max-w-sm py-4 rounded-2xl bg-gradient-to-r from-primary to-purple-500 text-primary-foreground font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/25 mt-6"
      >
        {step === STEPS - 1 ? t.onboarding.letsGo : t.onboarding.next}
        <ChevronRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
