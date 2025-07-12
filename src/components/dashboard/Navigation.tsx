import { Monitor, Play, BarChart3, Upload, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Monitor },
    { id: 'screens', label: 'Screens', icon: Monitor },
    { id: 'campaigns', label: 'Campaigns', icon: Play },
    { id: 'media', label: 'Media Library', icon: Upload },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <nav className="bg-gradient-card border-b border-border shadow-card p-4">
      <div className="flex gap-2 overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center gap-2 whitespace-nowrap ${
                isActive ? "shadow-glow" : ""
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </div>
    </nav>
  );
}