import { useState, useEffect } from "react";
import { X, Cpu, HardDrive, Thermometer, Activity, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SystemDetailsPopupProps {
  isOpen: boolean;
  onClose: () => void;
  screenName: string;
}

interface SystemMetrics {
  cpuUsage: number;
  ramUsage: number;
  temperature: number;
  uptime: string;
  loadAverage: string;
  diskUsage: number;
}

export function SystemDetailsPopup({ isOpen, onClose, screenName }: SystemDetailsPopupProps) {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpuUsage: 0,
    ramUsage: 0,
    temperature: 0,
    uptime: "0 days, 0 hours",
    loadAverage: "0.00, 0.00, 0.00",
    diskUsage: 0,
  });

  // Simulate real-time system metrics
  useEffect(() => {
    if (!isOpen) return;

    const updateMetrics = () => {
      setMetrics({
        cpuUsage: Math.floor(Math.random() * 40) + 10, // 10-50%
        ramUsage: Math.floor(Math.random() * 30) + 20, // 20-50%
        temperature: Math.floor(Math.random() * 15) + 35, // 35-50°C
        uptime: `${Math.floor(Math.random() * 30) + 1} days, ${Math.floor(Math.random() * 24)} hours`,
        loadAverage: `${(Math.random() * 2).toFixed(2)}, ${(Math.random() * 2).toFixed(2)}, ${(Math.random() * 2).toFixed(2)}`,
        diskUsage: Math.floor(Math.random() * 40) + 30, // 30-70%
      });
    };

    // Update immediately
    updateMetrics();

    // Update every 3 seconds
    const interval = setInterval(updateMetrics, 3000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const getTemperatureColor = (temp: number) => {
    if (temp < 40) return "text-green-500";
    if (temp < 45) return "text-yellow-500";
    return "text-red-500";
  };

  const getUsageColor = (usage: number) => {
    if (usage < 50) return "text-green-500";
    if (usage < 80) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              System Details - {screenName}
            </DialogTitle>
            <Badge variant="outline" className="gap-1">
              <Clock className="h-3 w-3" />
              Raspberry Pi OS
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* CPU Usage */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Cpu className="h-5 w-5 text-blue-500" />
                CPU Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Usage</span>
                <span className={`font-semibold ${getUsageColor(metrics.cpuUsage)}`}>
                  {metrics.cpuUsage}%
                </span>
              </div>
              <Progress value={metrics.cpuUsage} className="h-2" />
              <div className="text-xs text-muted-foreground">
                Load Average: {metrics.loadAverage}
              </div>
            </CardContent>
          </Card>

          {/* RAM Usage */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <HardDrive className="h-5 w-5 text-green-500" />
                Memory Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">RAM Usage</span>
                <span className={`font-semibold ${getUsageColor(metrics.ramUsage)}`}>
                  {metrics.ramUsage}%
                </span>
              </div>
              <Progress value={metrics.ramUsage} className="h-2" />
              <div className="text-xs text-muted-foreground">
                ~{Math.round((metrics.ramUsage / 100) * 4)}GB / 4GB used
              </div>
            </CardContent>
          </Card>

          {/* Temperature */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Thermometer className="h-5 w-5 text-orange-500" />
                System Temperature
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">CPU Temperature</span>
                <span className={`font-semibold ${getTemperatureColor(metrics.temperature)}`}>
                  {metrics.temperature}°C
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    metrics.temperature < 40 ? 'bg-green-500' : 
                    metrics.temperature < 45 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min((metrics.temperature - 30) * 5, 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-muted-foreground">
                {metrics.temperature < 40 ? "Normal" : 
                 metrics.temperature < 45 ? "Warning" : "Critical"} temperature
              </div>
            </CardContent>
          </Card>

          {/* System Info */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="text-sm text-muted-foreground">Uptime</div>
                <div className="font-medium">{metrics.uptime}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-sm text-muted-foreground">Disk Usage</div>
                <div className="font-medium">{metrics.diskUsage}%</div>
              </CardContent>
            </Card>
          </div>

          {/* Raspberry Pi Info */}
          <Card className="bg-secondary/50">
            <CardContent className="pt-4">
              <div className="text-sm text-muted-foreground mb-2">System Information</div>
              <div className="space-y-1 text-xs">
                <div>Model: Raspberry Pi 4 Model B</div>
                <div>Architecture: ARM64</div>
                <div>OS: Raspberry Pi OS (64-bit)</div>
                <div>Kernel: Linux 6.1.0-rpi7</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
} 