import { Monitor, MapPin, Wifi, WifiOff, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SystemDetailsPopup } from "./SystemDetailsPopup";

interface ScreenCardProps {
  screen: {
    id: string;
    name: string;
    location: string;
    status: 'online' | 'offline' | 'maintenance';
    uptime: string;
    lastSeen: string;
    resolution: string;
    currentCampaign?: string;
  };
}

export function ScreenCard({ screen }: ScreenCardProps) {
  const [showSystemDetails, setShowSystemDetails] = useState(false);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'online': return 'success';
      case 'offline': return 'destructive';
      case 'maintenance': return 'warning';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    return status === 'online' ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />;
  };

  return (
    <>
      <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Monitor className="h-5 w-5 text-primary" />
              {screen.name}
            </CardTitle>
            <Badge variant={getStatusVariant(screen.status) as any} className="gap-1">
              {getStatusIcon(screen.status)}
              {screen.status}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {screen.location}
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Uptime:</span>
              <div className="font-medium text-success">{screen.uptime}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Resolution:</span>
              <div className="font-medium">{screen.resolution}</div>
            </div>
          </div>
          
          {screen.currentCampaign && (
            <div className="text-sm">
              <span className="text-muted-foreground">Current Campaign:</span>
              <div className="font-medium text-primary">{screen.currentCampaign}</div>
            </div>
          )}
          
          <div className="flex gap-2 pt-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1"
              onClick={() => setShowSystemDetails(true)}
            >
              <Activity className="h-4 w-4" />
              Details
            </Button>
            <Button size="sm" variant="ghost" className="flex-1">
              Manage
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Details Popup */}
      <SystemDetailsPopup
        isOpen={showSystemDetails}
        onClose={() => setShowSystemDetails(false)}
        screenName={screen.name}
      />
    </>
  );
}