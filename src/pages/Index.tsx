import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Navigation } from "@/components/dashboard/Navigation";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { ScreenCard } from "@/components/dashboard/ScreenCard";
import { MediaUpload } from "@/components/media/MediaUpload";
import { CampaignCreator } from "@/components/campaigns/CampaignCreator";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const mockScreens = [
    {
      id: 'SCR-001',
      name: 'Mall Entrance Display',
      location: 'North Entrance, Level 1',
      status: 'online' as const,
      uptime: '99.8%',
      lastSeen: '2 min ago',
      resolution: '1920x1080',
      currentCampaign: 'Winter Sale 2024'
    },
    {
      id: 'SCR-002',
      name: 'Food Court Screen',
      location: 'Food Court, Level 2',
      status: 'online' as const,
      uptime: '97.2%',
      lastSeen: '1 min ago',
      resolution: '1920x1080',
      currentCampaign: 'Restaurant Promos'
    },
    {
      id: 'SCR-003',
      name: 'Parking Garage Info',
      location: 'Parking Level B1',
      status: 'maintenance' as const,
      uptime: '0%',
      lastSeen: '2 hours ago',
      resolution: '1280x720'
    },
    {
      id: 'SCR-004',
      name: 'Main Lobby Display',
      location: 'Main Lobby',
      status: 'online' as const,
      uptime: '99.9%',
      lastSeen: 'Just now',
      resolution: '1920x1080',
      currentCampaign: 'Brand Showcase'
    },
    {
      id: 'SCR-005',
      name: 'Exit Screen',
      location: 'South Exit',
      status: 'offline' as const,
      uptime: '0%',
      lastSeen: '30 min ago',
      resolution: '1920x1080'
    },
    {
      id: 'SCR-006',
      name: 'Store Directory',
      location: 'Central Atrium',
      status: 'online' as const,
      uptime: '98.7%',
      lastSeen: '5 min ago',
      resolution: '1920x1080',
      currentCampaign: 'Store Navigation'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <StatsOverview />
            <div>
              <h2 className="text-2xl font-bold mb-4">Screen Overview</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockScreens.slice(0, 6).map((screen) => (
                  <ScreenCard key={screen.id} screen={screen} />
                ))}
              </div>
            </div>
          </div>
        );
      case 'screens':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Screen Management</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockScreens.map((screen) => (
                <ScreenCard key={screen.id} screen={screen} />
              ))}
            </div>
          </div>
        );
      case 'campaigns':
        return <CampaignCreator />;
      case 'media':
        return <MediaUpload />;
      case 'analytics':
        return <AnalyticsDashboard />;
      default:
        return <div>Content for {activeTab}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      <DashboardHeader />
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
