import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, Music, X, CheckCircle } from 'lucide-react';
import { uploadAudio } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface AudioUploaderProps {
  onAudioUploaded: (url: string, file: File) => void;
}

const AudioUploader = ({ onAudioUploaded }: AudioUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleFiles = async (files: FileList) => {
    const audioFiles = Array.from(files).filter(file => 
      file.type.startsWith('audio/') || file.name.endsWith('.mp3')
    );

    if (audioFiles.length === 0) {
      toast({
        title: "Invalid file type",
        description: "Please upload audio files (MP3, WAV, etc.)",
        variant: "destructive",
      });
      return;
    }

    for (const file of audioFiles) {
      setIsUploading(true);
      try {
        const fileName = `${Date.now()}-${file.name}`;
        const publicUrl = await uploadAudio(file, fileName);
        
        onAudioUploaded(publicUrl, file);
        
        toast({
          title: "Upload successful",
          description: `${file.name} has been uploaded successfully!`,
        });
      } catch (error) {
        console.error('Upload error:', error);
        toast({
          title: "Upload failed",
          description: `Failed to upload ${file.name}. Please try again.`,
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  return (
    <Card className="p-6 border-2 border-dashed border-spiritual-light">
      <div
        className={`relative ${dragActive ? 'bg-spiritual-light/20' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-spiritual-light rounded-full flex items-center justify-center mb-4">
            {isUploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-spiritual-purple"></div>
            ) : (
              <Music className="w-8 h-8 text-spiritual-purple" />
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Upload Audio Files
          </h3>
          
          <p className="text-muted-foreground mb-4">
            Drag and drop your MP3 files here, or click to browse
          </p>
          
          <input
            type="file"
            id="audio-upload"
            multiple
            accept="audio/*,.mp3"
            onChange={handleFileInput}
            className="hidden"
            disabled={isUploading}
          />
          
          <Button
            variant="spiritual"
            onClick={() => document.getElementById('audio-upload')?.click()}
            disabled={isUploading}
            className="mb-2"
          >
            <Upload className="w-4 h-4 mr-2" />
            {isUploading ? 'Uploading...' : 'Choose Files'}
          </Button>
          
          <p className="text-xs text-muted-foreground">
            Supported formats: MP3, WAV, M4A (Max 50MB per file)
          </p>
        </div>
      </div>
    </Card>
  );
};

export default AudioUploader;