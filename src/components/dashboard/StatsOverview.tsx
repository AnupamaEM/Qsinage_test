import { Monitor, Play, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'neutral';
}

function StatCard({ title, value, change, icon, trend }: StatCardProps) {
  const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-destructive' : 'text-muted-foreground';
  
  return (
    <Card className="bg-gradient-card border-border shadow-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${trendColor} flex items-center gap-1`}>
          <TrendingUp className="h-3 w-3" />
          {change} from last month
        </p>
      </CardContent>
    </Card>
  );
}

export function StatsOverview() {
  const stats = [
    {
      title: "Total Screens",
      value: "24",
      change: "+2",
      icon: <Monitor className="h-4 w-4" />,
      trend: 'up' as const
    },
    {
      title: "Active Campaigns",
      value: "8",
      change: "+1",
      icon: <Play className="h-4 w-4" />,
      trend: 'up' as const
    },
    {
      title: "Total Impressions",
      value: "1.2M",
      change: "+12%",
      icon: <TrendingUp className="h-4 w-4" />,
      trend: 'up' as const
    },
    {
      title: "Avg. Uptime",
      value: "99.2%",
      change: "+0.3%",
      icon: <Clock className="h-4 w-4" />,
      trend: 'up' as const
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}