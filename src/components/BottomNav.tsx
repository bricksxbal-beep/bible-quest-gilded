import { useLocation, useNavigate } from "react-router-dom";
import { Home, BookOpen, BarChart3, User, Settings } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", icon: Home, labelKey: "home" as const },
  { path: "/quiz", icon: BookOpen, labelKey: "quiz" as const },
  { path: "/stats", icon: BarChart3, labelKey: "stats" as const },
  { path: "/profile", icon: User, labelKey: "profile" as const },
  { path: "/settings", icon: Settings, labelKey: "settings" as const },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map(({ path, icon: Icon, labelKey }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-colors relative min-w-[56px]",
                isActive ? "text-gold" : "text-muted-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-gold"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{t.nav[labelKey]}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
