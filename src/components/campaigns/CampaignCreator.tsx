import { useState } from "react";
import { Plus, Calendar, Monitor, Play, Pause, Image, Video, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video';
  size: string;
  uploadDate: string;
  tags?: string[];
  file?: File;
}

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'scheduled';
  startDate: string;
  endDate: string;
  screens: string[];
  impressions: number;
  mediaFile?: MediaFile;
}

const mockScreens = [
  { id: 'Screen-001', name: 'Lobby TV' },
  { id: 'Screen-002', name: 'Conference Room' },
  { id: 'Screen-003', name: 'Reception' },
  { id: 'Screen-004', name: 'Cafeteria' },
  { id: 'Screen-005', name: 'Outdoor Billboard' },
];

const mockMediaLibrary: MediaFile[] = [
  {
    id: '1',
    name: 'winter-sale-banner.jpg',
    type: 'image',
    size: '2.4 MB',
    uploadDate: '2024-01-15',
    tags: ['retail', 'promotion', 'winter'],
    file: undefined,
  },
  {
    id: '2',
    name: 'product-launch-video.mp4',
    type: 'video',
    size: '15.8 MB',
    uploadDate: '2024-01-14',
    tags: ['product', 'launch'],
    file: undefined,
  },
  // Add more mock media as needed
];

export function CampaignCreator() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Winter Sale 2024',
      status: 'active',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      screens: ['Screen-001', 'Screen-003', 'Screen-005'],
      impressions: 15420,
      mediaFile: {
        id: '1',
        name: 'winter-sale-banner.jpg',
        type: 'image',
        size: '2.4 MB',
        uploadDate: '2024-01-15',
        tags: ['retail', 'promotion', 'winter']
      }
    },
    {
      id: '2',
      name: 'Product Launch',
      status: 'scheduled',
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      screens: ['Screen-002', 'Screen-004'],
      impressions: 0,
      mediaFile: {
        id: '2',
        name: 'product-launch-video.mp4',
        type: 'video',
        size: '15.8 MB',
        uploadDate: '2024-01-14',
        tags: ['product', 'launch']
      }
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null);
  const [mediaDialogOpen, setMediaDialogOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    screens: [] as string[],
    mediaFile: null as MediaFile | null,
  });
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleMediaClick = (mediaFile: MediaFile) => {
    setSelectedMedia(mediaFile);
    setMediaDialogOpen(true);
  };

  const closeMediaDialog = () => {
    setMediaDialogOpen(false);
    setSelectedMedia(null);
  };

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const type = file.type.startsWith('image') ? 'image' : file.type.startsWith('video') ? 'video' : undefined;
    if (!type) return;
    const mediaFile: MediaFile = {
      id: Date.now().toString(),
      name: file.name,
      type,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      uploadDate: new Date().toISOString().split('T')[0],
      file,
    };
    setNewCampaign((prev) => ({ ...prev, mediaFile }));
    setMediaPreview(URL.createObjectURL(file));
  };

  const handleScreenSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setNewCampaign((prev) => ({ ...prev, screens: selected }));
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
                <Input id="name" placeholder="Enter campaign name" value={newCampaign.name} onChange={e => setNewCampaign(prev => ({ ...prev, name: e.target.value }))} />
              </div>
              <div>
                <Label htmlFor="media">Media File</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                      type="button"
                    >
                      {newCampaign.mediaFile
                        ? newCampaign.mediaFile.name
                        : "Select media file..."}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72 p-2">
                    <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
                      {mockMediaLibrary.map((media) => (
                        <label
                          key={media.id}
                          className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded hover:bg-accent"
                        >
                          <input
                            type="radio"
                            name="mediaFile"
                            checked={newCampaign.mediaFile?.id === media.id}
                            onChange={() => {
                              setNewCampaign((prev) => ({ ...prev, mediaFile: media }));
                            }}
                            className="accent-primary"
                          />
                          <span className="text-sm">{media.name}</span>
                        </label>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                {/* Preview */}
                {newCampaign.mediaFile && newCampaign.mediaFile.type === 'image' && (
                  <img
                    src={
                      newCampaign.mediaFile.name.endsWith('.jpg') || newCampaign.mediaFile.name.endsWith('.png')
                        ? `/media/${newCampaign.mediaFile.name}`
                        : undefined
                    }
                    alt="Preview"
                    className="mt-2 rounded max-h-32 border"
                    onError={e => (e.currentTarget.style.display = 'none')}
                  />
                )}
                {newCampaign.mediaFile && newCampaign.mediaFile.type === 'video' && (
                  <video
                    src={
                      newCampaign.mediaFile.name.endsWith('.mp4')
                        ? `/media/${newCampaign.mediaFile.name}`
                        : undefined
                    }
                    controls
                    className="mt-2 rounded max-h-32 border"
                    onError={e => (e.currentTarget.style.display = 'none')}
                  />
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="screens">Select Screens</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between"
                    type="button"
                  >
                    {newCampaign.screens.length > 0
                      ? mockScreens
                          .filter((s) => newCampaign.screens.includes(s.id))
                          .map((s) => s.name)
                          .join(", ")
                      : "Select screens..."}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-72 p-2">
                  <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
                    {mockScreens.map((screen) => (
                      <label
                        key={screen.id}
                        className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded hover:bg-accent"
                      >
                        <Checkbox
                          checked={newCampaign.screens.includes(screen.id)}
                          onCheckedChange={(checked) => {
                            setNewCampaign((prev) => {
                              const screens = checked
                                ? [...prev.screens, screen.id]
                                : prev.screens.filter((id) => id !== screen.id);
                              return { ...prev, screens };
                            });
                          }}
                          id={`screen-checkbox-${screen.id}`}
                        />
                        <span className="text-sm">{screen.name}</span>
                      </label>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              <div className="text-xs text-muted-foreground mt-1">You can select multiple screens.</div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Campaign description" value={newCampaign.description} onChange={e => setNewCampaign(prev => ({ ...prev, description: e.target.value }))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start">Start Date</Label>
                <Input id="start" type="date" value={newCampaign.startDate} onChange={e => setNewCampaign(prev => ({ ...prev, startDate: e.target.value }))} />
              </div>
              <div>
                <Label htmlFor="end">End Date</Label>
                <Input id="end" type="date" value={newCampaign.endDate} onChange={e => setNewCampaign(prev => ({ ...prev, endDate: e.target.value }))} />
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

              {/* Media File Display */}
              {campaign.mediaFile && (
                <div className="mb-4 p-3 bg-secondary rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {campaign.mediaFile.type === 'image' ? (
                        <Image className="h-6 w-6 text-info" />
                      ) : (
                        <Video className="h-6 w-6 text-warning" />
                      )}
                      <div>
                        <div className="font-medium text-sm">{campaign.mediaFile.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {campaign.mediaFile.size} • {campaign.mediaFile.type}
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleMediaClick(campaign.mediaFile!)}
                      className="text-xs"
                    >
                      View
                    </Button>
                  </div>
                </div>
              )}
              
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

      {/* Media Preview Dialog */}
      <Dialog open={mediaDialogOpen} onOpenChange={setMediaDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedMedia?.type === 'image' ? (
                <Image className="h-5 w-5 text-info" />
              ) : (
                <Video className="h-5 w-5 text-warning" />
              )}
              {selectedMedia?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Media Preview */}
            <div className="flex justify-center">
              {selectedMedia?.type === 'image' ? (
                <div className="bg-secondary rounded-lg p-4 w-full">
                  <div className="text-center text-muted-foreground">
                    <Image className="h-16 w-16 mx-auto mb-2 opacity-50" />
                    <p>Image Preview: {selectedMedia.name}</p>
                    <p className="text-sm">(Actual image would be displayed here)</p>
                  </div>
                </div>
              ) : (
                <div className="bg-secondary rounded-lg p-4 w-full">
                  <div className="text-center text-muted-foreground">
                    <Video className="h-16 w-16 mx-auto mb-2 opacity-50" />
                    <p>Video Preview: {selectedMedia?.name}</p>
                    <p className="text-sm">(Video player would be displayed here)</p>
                  </div>
                </div>
              )}
            </div>

            {/* File Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">File Name:</span>
                <div className="font-medium">{selectedMedia?.name}</div>
              </div>
              <div>
                <span className="text-muted-foreground">File Type:</span>
                <div className="font-medium capitalize">{selectedMedia?.type}</div>
              </div>
              <div>
                <span className="text-muted-foreground">File Size:</span>
                <div className="font-medium">{selectedMedia?.size}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Upload Date:</span>
                <div className="font-medium">{selectedMedia?.uploadDate}</div>
              </div>
            </div>

            {/* Tags */}
            {selectedMedia?.tags && selectedMedia.tags.length > 0 && (
              <div>
                <span className="text-muted-foreground text-sm">Tags:</span>
                <div className="flex gap-1 mt-1">
                  {selectedMedia.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}