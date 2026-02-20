import { useState } from "react";
import { motion } from "framer-motion";
import { User, Star, Trophy, Gamepad2, Award } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useGameState } from "@/hooks/useGameState";
import { Input } from "@/components/ui/input";

export default function Profile() {
  const { t } = useLanguage();
  const { state, updateState, getLevel } = useGameState();
  const level = getLevel();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(state.playerName);

  const saveName = () => {
    updateState({ playerName: name });
    setEditing(false);
  };

  return (
    <motion.div
      className="px-4 pt-2 pb-24 max-w-lg mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="font-serif text-2xl font-bold mb-6">{t.profile.title}</h1>

      {/* Avatar & Name */}
      <div className="bg-card border border-border rounded-2xl p-6 text-center mb-6 shadow-premium">
        <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-gold flex items-center justify-center shadow-glow-gold">
          <User className="w-10 h-10 text-gold-foreground" />
        </div>
        {editing ? (
          <div className="flex gap-2 max-w-xs mx-auto">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveName()}
              className="text-center"
              autoFocus
            />
            <button onClick={saveName} className="text-sm font-bold text-gold">OK</button>
          </div>
        ) : (
          <button onClick={() => setEditing(true)} className="text-lg font-bold">
            {state.playerName || t.profile.editName}
          </button>
        )}
        <p className="text-sm text-muted-foreground mt-1">
          {t.levels[level.name]} • Lv.{level.level}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
          <Star className="w-5 h-5 text-gold shrink-0" />
          <div>
            <p className="text-lg font-bold">{state.totalXP}</p>
            <p className="text-xs text-muted-foreground">{t.profile.totalXP}</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
          <Trophy className="w-5 h-5 text-purple shrink-0" />
          <div>
            <p className="text-lg font-bold">{state.bestScore}</p>
            <p className="text-xs text-muted-foreground">{t.profile.bestScore}</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
          <Gamepad2 className="w-5 h-5 text-muted-foreground shrink-0" />
          <div>
            <p className="text-lg font-bold">{state.gamesPlayed}</p>
            <p className="text-xs text-muted-foreground">{t.profile.gamesPlayed}</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
          <Award className="w-5 h-5 text-gold shrink-0" />
          <div>
            <p className="text-lg font-bold">{state.achievements.length}</p>
            <p className="text-xs text-muted-foreground">{t.home.achievements}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
