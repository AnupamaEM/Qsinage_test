import { useState } from "react";
import { Upload, File, Image, Video, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video';
  size: string;
  uploadDate: string;
  tags?: string[];
}

export function MediaUpload() {
  const [files, setFiles] = useState<MediaFile[]>([
    {
      id: '1',
      name: 'summer-sale-banner.jpg',
      type: 'image',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      tags: ['retail', 'promotion', 'summer']
    },
    {
      id: '2',
      name: 'product-showcase.mp4',
      type: 'video',
      size: '15.8 MB',
      uploadDate: '2024-01-14',
      tags: ['product', 'demo']
    }
  ]);

  const handleFileUpload = () => {
    // Simulate file upload
    const newFile: MediaFile = {
      id: Date.now().toString(),
      name: 'new-campaign-video.mp4',
      type: 'video',
      size: '12.3 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      tags: ['campaign', 'marketing']
    };
    setFiles([newFile, ...files]);
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card border-border shadow-card border-dashed border-2 hover:border-primary transition-colors">
        <CardContent className="flex flex-col items-center justify-center p-8">
          <Upload className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload Media Files</h3>
          <p className="text-muted-foreground text-center mb-4">
            Drag and drop your images and videos here, or click to browse
          </p>
          <Button onClick={handleFileUpload} className="shadow-primary">
            <Upload className="h-4 w-4" />
            Choose Files
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <File className="h-5 w-5 text-primary" />
            Media Library ({files.length} files)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-3">
                  {file.type === 'image' ? (
                    <Image className="h-8 w-8 text-info" />
                  ) : (
                    <Video className="h-8 w-8 text-warning" />
                  )}
                  <div>
                    <div className="font-medium">{file.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {file.size} • {file.uploadDate}
                    </div>
                    {file.tags && (
                      <div className="flex gap-1 mt-1">
                        {file.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(file.id)}
                  className="hover:bg-destructive/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}