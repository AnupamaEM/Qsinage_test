import { useState } from "react";
import { Plus, Calendar, Monitor, Play, Pause } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'scheduled';
  startDate: string;
  endDate: string;
  screens: string[];
  impressions: number;
}

export function CampaignCreator() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Winter Sale 2024',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      screens: ['Screen-001', 'Screen-003', 'Screen-005'],
      impressions: 15420
    },
    {
      id: '2',
      name: 'Product Launch',
      status: 'scheduled',
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      screens: ['Screen-002', 'Screen-004'],
      impressions: 0
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'paused': return 'warning';
      case 'scheduled': return 'info';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="h-3 w-3" />;
      case 'paused': return <Pause className="h-3 w-3" />;
      default: return <Calendar className="h-3 w-3" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Campaign Management</h2>
        <Button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="shadow-primary"
        >
          <Plus className="h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      {showCreateForm && (
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle>Create New Campaign</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Campaign Name</Label>
                <Input id="name" placeholder="Enter campaign name" />
              </div>
              <div>
                <Label htmlFor="media">Media File</Label>
                <Input id="media" placeholder="Select media file" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Campaign description" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start">Start Date</Label>
                <Input id="start" type="date" />
              </div>
              <div>
                <Label htmlFor="end">End Date</Label>
                <Input id="end" type="date" />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button className="shadow-primary">Create Campaign</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{campaign.name}</h3>
                  <p className="text-muted-foreground">
                    {campaign.startDate} → {campaign.endDate}
                  </p>
                </div>
                <Badge variant={getStatusVariant(campaign.status) as any} className="gap-1">
                  {getStatusIcon(campaign.status)}
                  {campaign.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <span className="text-muted-foreground text-sm">Screens</span>
                  <div className="font-medium">{campaign.screens.length}</div>
                </div>
                <div>
                  <span className="text-muted-foreground text-sm">Impressions</span>
                  <div className="font-medium">{campaign.impressions.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-muted-foreground text-sm">Status</span>
                  <div className="font-medium capitalize">{campaign.status}</div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Monitor className="h-4 w-4" />
                  Manage Screens
                </Button>
                <Button size="sm" variant="ghost">
                  Edit
                </Button>
                <Button size="sm" variant="ghost">
                  Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}