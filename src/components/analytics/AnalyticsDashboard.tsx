import { BarChart3, TrendingUp, Clock, Users, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AnalyticsDashboard() {
  const metrics = [
    { title: "Total Impressions", value: "1.2M", change: "+12%", trend: "up" },
    { title: "Active Screens", value: "18/24", change: "75%", trend: "up" },
    { title: "Campaign Performance", value: "94%", change: "+2%", trend: "up" },
    { title: "Avg. Display Time", value: "8.2s", change: "+0.8s", trend: "up" }
  ];

  const campaignData = [
    { name: "Winter Sale", impressions: 245000, clicks: 1200, ctr: "0.49%" },
    { name: "Product Launch", impressions: 180000, clicks: 950, ctr: "0.53%" },
    { name: "Brand Awareness", impressions: 320000, clicks: 1800, ctr: "0.56%" },
    { name: "Summer Promo", impressions: 156000, clicks: 780, ctr: "0.50%" }
  ];

  // Mock device status
  const totalScreens = 24;
  const onlineScreens = 18;
  const offlineScreens = totalScreens - onlineScreens;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="bg-gradient-card border-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-success flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Screen Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Mall Entrance", "Food Court", "Main Lobby", "Exit Area"].map((location, index) => (
                <div key={location} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{location}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-secondary rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full" 
                        style={{ width: `${85 - index * 10}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">{85 - index * 10}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Campaign Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaignData.map((campaign) => (
                <div key={campaign.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{campaign.name}</span>
                    <span className="text-sm text-success">{campaign.ctr}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {campaign.impressions.toLocaleString()} impressions • {campaign.clicks} interactions
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Real-time Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center p-4 bg-secondary rounded-lg">
              <div className="text-2xl font-bold text-success">LIVE</div>
              <div className="text-sm text-muted-foreground">{onlineScreens} Screens Online</div>
            </div>
            <div className="text-center p-4 bg-secondary rounded-lg">
              <div className="flex items-center justify-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-500 animate-pulse" />
                <span className="text-2xl font-bold text-red-500">{offlineScreens}</span>
              </div>
              <div className="text-sm text-red-500 font-semibold">Devices Offline</div>
            </div>
            <div className="text-center p-4 bg-secondary rounded-lg">
              <div className="text-2xl font-bold text-primary">8</div>
              <div className="text-sm text-muted-foreground">Active Campaigns</div>
            </div>
            <div className="text-center p-4 bg-secondary rounded-lg">
              <div className="text-2xl font-bold text-info">2.4K</div>
              <div className="text-sm text-muted-foreground">Hourly Impressions</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}