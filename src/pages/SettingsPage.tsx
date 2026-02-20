import { motion } from "framer-motion";
import { Globe, Volume2, Smartphone, Moon, RotateCcw, Info, Shield } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useGameState } from "@/hooks/useGameState";
import { useTheme } from "@/hooks/useTheme";
import { Switch } from "@/components/ui/switch";
import type { Language } from "@/i18n/translations";

const languages: { code: Language; label: string }[] = [
  { code: "pt", label: "Português" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

export default function SettingsPage() {
  const { language, setLanguage, t } = useLanguage();
  const { state, updateState, resetProgress } = useGameState();
  const { isDark, toggleTheme } = useTheme();

  const handleReset = () => {
    if (window.confirm(t.settings.resetConfirm)) {
      resetProgress();
    }
  };

  return (
    <motion.div
      className="px-4 pt-2 pb-24 max-w-lg mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="font-serif text-2xl font-bold mb-6">{t.settings.title}</h1>

      <div className="space-y-3">
        {/* Language */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <Globe className="w-5 h-5 text-gold" />
            <span className="font-medium">{t.settings.language}</span>
          </div>
          <div className="flex gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                  language === lang.code
                    ? "bg-gradient-gold text-gold-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dark Mode */}
        <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Moon className="w-5 h-5 text-purple" />
            <span className="font-medium">{t.settings.darkMode}</span>
          </div>
          <Switch checked={isDark} onCheckedChange={toggleTheme} />
        </div>

        {/* Sound */}
        <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium">{t.settings.sound}</span>
          </div>
          <Switch
            checked={state.settings.sound}
            onCheckedChange={(v) => updateState({ settings: { ...state.settings, sound: v } })}
          />
        </div>

        {/* Vibration */}
        <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium">{t.settings.vibration}</span>
          </div>
          <Switch
            checked={state.settings.vibration}
            onCheckedChange={(v) => updateState({ settings: { ...state.settings, vibration: v } })}
          />
        </div>

        {/* Reset */}
        <button
          onClick={handleReset}
          className="w-full bg-card border border-destructive/30 rounded-xl p-4 flex items-center gap-3 text-destructive"
        >
          <RotateCcw className="w-5 h-5" />
          <span className="font-medium">{t.settings.resetProgress}</span>
        </button>

        {/* About */}
        <div className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium">{t.settings.about}</span>
          </div>
          <span className="text-sm text-muted-foreground">{t.settings.version} 1.0.0</span>
        </div>

        {/* Privacy */}
        <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
          <Shield className="w-5 h-5 text-muted-foreground" />
          <span className="font-medium">{t.settings.privacy}</span>
        </div>
      </div>
    </motion.div>
  );
}
