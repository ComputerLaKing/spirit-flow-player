import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Globe, Music, Upload, Play, Pause, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AudioUploader from "@/components/AudioUploader";

interface UploadedTrack {
  id: number;
  title: string;
  file: File;
  url: string;
  section: string;
}

const uploadSections = [
  { id: "meditation", name: "Meditation", description: "Guided meditations and mindfulness tracks" },
  { id: "chanting", name: "Chanting", description: "Sacred mantras and devotional songs" },
  { id: "healing", name: "Healing", description: "Sound therapy and healing frequencies" },
  { id: "nature", name: "Nature", description: "Natural soundscapes and ambient sounds" },
  { id: "instrumental", name: "Instrumental", description: "Spiritual music and classical pieces" },
  { id: "other", name: "Other", description: "Other spiritual and wellness content" }
];

const AudioUpload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedSection, setSelectedSection] = useState<string>("meditation");
  const [uploadedTracks, setUploadedTracks] = useState<UploadedTrack[]>([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);

  const handleAudioUploaded = (url: string, file: File) => {
    const newTrack: UploadedTrack = {
      id: Date.now(),
      title: file.name.replace(/\.[^/.]+$/, ""),
      file,
      url,
      section: selectedSection
    };
    
    setUploadedTracks(prev => [...prev, newTrack]);
    
    toast({
      title: "Upload successful!",
      description: `${newTrack.title} has been uploaded to ${uploadSections.find(s => s.id === selectedSection)?.name} section.`,
    });
  };

  const removeTrack = (trackId: number) => {
    setUploadedTracks(prev => prev.filter(track => track.id !== trackId));
    if (currentlyPlaying === trackId) {
      setCurrentlyPlaying(null);
    }
  };

  const togglePlay = (trackId: number) => {
    if (currentlyPlaying === trackId) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(trackId);
    }
  };

  const groupedTracks = uploadedTracks.reduce((acc, track) => {
    if (!acc[track.section]) {
      acc[track.section] = [];
    }
    acc[track.section].push(track);
    return acc;
  }, {} as Record<string, UploadedTrack[]>);

  return (
    <div className="min-h-screen bg-gradient-peaceful">
      {/* Header */}
      <div className="bg-gradient-spiritual text-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/playlist')}
              className="text-white hover:bg-white/10 border border-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Playlist
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="text-white border-white/20 hover:bg-white/10"
            >
              <Globe className="w-4 h-4 mr-2" />
              Change Language
            </Button>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">
              Upload Your Sacred Sounds
            </h1>
            <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto px-4">
              Share your spiritual music collection by organizing them into categories
            </p>
          </div>
        </div>
      </div>

      {/* Upload Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Section Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Select Upload Section
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadSections.map((section) => (
              <Card 
                key={section.id}
                className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedSection === section.id 
                    ? 'ring-2 ring-spiritual-purple bg-spiritual-light/20' 
                    : 'hover:bg-spiritual-light/10'
                }`}
                onClick={() => setSelectedSection(section.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    selectedSection === section.id ? 'bg-spiritual-purple' : 'bg-muted'
                  }`} />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{section.name}</h3>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Audio Uploader */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-foreground mb-4">
            Upload to {uploadSections.find(s => s.id === selectedSection)?.name} Section
          </h3>
          <AudioUploader onAudioUploaded={handleAudioUploaded} />
        </div>

        {/* Uploaded Tracks by Section */}
        {Object.keys(groupedTracks).length > 0 && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-foreground">
              Your Uploaded Tracks ({uploadedTracks.length})
            </h2>
            
            {Object.entries(groupedTracks).map(([sectionId, tracks]) => {
              const section = uploadSections.find(s => s.id === sectionId);
              return (
                <div key={sectionId} className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <Music className="w-5 h-5 text-spiritual-purple" />
                    {section?.name} ({tracks.length})
                  </h3>
                  
                  <div className="grid gap-4">
                    {tracks.map((track) => (
                      <Card key={track.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Button
                              variant="spiritual"
                              size="sm"
                              onClick={() => togglePlay(track.id)}
                            >
                              {currentlyPlaying === track.id ? (
                                <Pause className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4" />
                              )}
                            </Button>
                            
                            <div>
                              <h4 className="font-semibold text-foreground">{track.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {(track.file.size / (1024 * 1024)).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTrack(track.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        {currentlyPlaying === track.id && (
                          <audio 
                            src={track.url} 
                            autoPlay 
                            controls 
                            className="w-full mt-3"
                            onEnded={() => setCurrentlyPlaying(null)}
                          />
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {uploadedTracks.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-spiritual-light rounded-full flex items-center justify-center mx-auto mb-6">
              <Upload className="w-12 h-12 text-spiritual-purple" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No files uploaded yet
            </h3>
            <p className="text-muted-foreground">
              Select a section above and start uploading your spiritual audio files
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioUpload;