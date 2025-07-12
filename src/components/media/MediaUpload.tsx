import { useState, useRef } from "react";
import { Upload, File, Image, Video, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video';
  size: string;
  uploadDate: string;
  tags?: string[];
  file?: File; // Add the actual file object
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

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<MediaFile | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileType = (file: File): 'image' | 'video' => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    return 'image'; // fallback
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const newFiles: MediaFile[] = Array.from(selectedFiles).map((file) => {
      const fileType = getFileType(file);
      const tags = fileType === 'image' ? ['image', 'media'] : ['video', 'media'];
      
      return {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: fileType,
        size: formatFileSize(file.size),
        uploadDate: new Date().toISOString().split('T')[0],
        tags,
        file // Store the actual file object
      };
    });

    setFiles(prev => [...newFiles, ...prev]);
    
    // Reset the input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleChooseMedia = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteClick = (file: MediaFile) => {
    setFileToDelete(file);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (fileToDelete) {
      setFiles(files.filter(f => f.id !== fileToDelete.id));
      setFileToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const cancelDelete = () => {
    setFileToDelete(null);
    setDeleteDialogOpen(false);
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
          <Button onClick={handleChooseMedia} className="shadow-primary">
            <Upload className="h-4 w-4 mr-2" />
            Choose Media
          </Button>
          
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
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
                  onClick={() => handleDeleteClick(file)}
                  className="hover:bg-destructive/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Media File</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{fileToDelete?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}