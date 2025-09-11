import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, Download, Heart, Clock, User, SkipForward, ArrowLeft, Globe, Plus } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import meditation1 from "@/assets/meditation-1.jpg";
import chanting2 from "@/assets/chanting-2.jpg";
import healing3 from "@/assets/healing-3.jpg";

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  image: string;
  category: string;
  description: string;
  audioUrl: string;
}

const spiritualTracks: Track[] = [
  {
    id: 1,
    title: "Deep Meditation Flow",
    artist: "Sacred Sounds",
    duration: "15:30",
    image: meditation1,
    category: "Meditation",
    description: "Guided meditation with Tibetan bowls and nature sounds",
    audioUrl: "https://www.soundjay.com/misc/sounds/meditation-chime.mp3" // Demo audio
  },
  {
    id: 2,
    title: "Om Mani Padme Hum",
    artist: "Zen Masters",
    duration: "21:45",
    image: chanting2,
    category: "Chanting",
    description: "Traditional Sanskrit mantras for compassion and wisdom",
    audioUrl: "https://www.soundjay.com/misc/sounds/chanting-meditation.mp3" // Demo audio
  },
  {
    id: 3,
    title: "432Hz Healing Frequencies",
    artist: "Sound Healers",
    duration: "18:20",
    image: healing3,
    category: "Healing",
    description: "Pure healing tones for chakra alignment and restoration",
    audioUrl: "https://www.soundjay.com/misc/sounds/healing-frequencies.mp3" // Demo audio
  },
];

const SpiritualPlaylist = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const audioRef = useRef<HTMLAudioElement>(null);

  // Use default tracks
  const allTracks = spiritualTracks;

  // Auto-play next track when current track ends
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTrackEnd = () => {
      playNextTrack();
    };

    audio.addEventListener('ended', handleTrackEnd);
    return () => audio.removeEventListener('ended', handleTrackEnd);
  }, [currentTrackIndex]);

  const playNextTrack = () => {
    if (currentTrackIndex === null) return;
    
    const nextIndex = currentTrackIndex + 1;
    if (nextIndex < allTracks.length) {
      setCurrentTrackIndex(nextIndex);
      setIsPlaying(true);
      // Audio will start playing due to useEffect below
    } else {
      // End of playlist - stop playing
      setIsPlaying(false);
      setCurrentTrackIndex(null);
    }
  };

  // Handle audio playback when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || currentTrackIndex === null) return;

    const currentTrack = allTracks[currentTrackIndex];
    audio.src = currentTrack.audioUrl;
    
    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [currentTrackIndex, isPlaying]);

  const handlePlayPause = (trackId: number) => {
    const trackIndex = allTracks.findIndex(track => track.id === trackId);
    
    if (currentTrackIndex === trackIndex) {
      // Same track - toggle play/pause
      setIsPlaying(!isPlaying);
    } else {
      // Different track - start playing this track
      setCurrentTrackIndex(trackIndex);
      setIsPlaying(true);
    }
  };

  const toggleFavorite = (trackId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(trackId)) {
      newFavorites.delete(trackId);
    } else {
      newFavorites.add(trackId);
    }
    setFavorites(newFavorites);
  };


  return (
    <div className="min-h-screen bg-gradient-peaceful">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} preload="metadata" />
      
      {/* Header */}
      <div className="bg-gradient-spiritual text-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/10 border border-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
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
              Sacred Sound Library
            </h1>
            <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto px-4">
              Immerse yourself in carefully curated spiritual music for meditation, 
              healing, and inner transformation
            </p>
          </div>
        </div>
      </div>

      {/* Playlist Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                Your Playlist ({allTracks.length} tracks)
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Begin your spiritual journey with these transformative sounds
              </p>
            </div>
            <Button
              variant="spiritual"
              onClick={() => navigate('/upload')}
              className="w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Upload Music
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {allTracks.map((track, index) => (
            <Card 
              key={track.id} 
              className="p-4 sm:p-6 hover:shadow-spiritual transition-all duration-300 border border-spiritual-purple/10"
            >
              <div className="flex flex-col gap-4 sm:gap-6">
                {/* Track Image */}
                <div className="relative group">
                  <div className="w-full h-48 sm:h-32 sm:w-32 rounded-lg overflow-hidden mx-auto sm:mx-0">
                    <img 
                      src={track.image} 
                      alt={track.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Track Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs bg-spiritual-light text-spiritual-purple px-2 py-1 rounded-full font-medium">
                          {track.category}
                        </span>
                        <span className="text-sm text-muted-foreground">#{index + 1}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">
                        {track.title}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {track.artist}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {track.duration}
                        </div>
                      </div>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        {track.description}
                      </p>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-3 mt-4">
                    <Button
                      variant="spiritual"
                      size="lg"
                      onClick={() => handlePlayPause(track.id)}
                      className="group flex-1 sm:flex-none min-h-[48px] relative"
                    >
                      {currentTrackIndex === index && isPlaying ? (
                        <Pause className="w-5 h-5 mr-2" />
                      ) : (
                        <Play className="w-5 h-5 mr-2" />
                      )}
                      {currentTrackIndex === index && isPlaying ? 'Pause' : 'Play'}
                      {currentTrackIndex === index && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-spiritual-gold rounded-full animate-pulse" />
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={playNextTrack}
                      disabled={currentTrackIndex === null || currentTrackIndex >= allTracks.length - 1}
                      className="min-h-[48px] min-w-[48px]"
                      title="Next Track"
                    >
                      <SkipForward className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="peaceful"
                      onClick={() => toggleFavorite(track.id)}
                      className={`${favorites.has(track.id) ? 'text-red-500' : ''} min-h-[48px] min-w-[48px]`}
                    >
                      <Heart className={`w-4 h-4 ${favorites.has(track.id) ? 'fill-current' : ''}`} />
                    </Button>

                    <Button variant="ghost" className="min-h-[48px] min-w-[48px]">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-12 bg-gradient-sunset rounded-2xl shadow-spiritual">
          <h3 className="text-3xl font-bold text-white mb-4">
            Discover More Sacred Sounds
          </h3>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join our community of spiritual seekers and unlock access to hundreds 
            of premium meditation tracks, healing frequencies, and guided journeys.
          </p>
          <Button variant="golden" size="lg">
            Explore Premium Library
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpiritualPlaylist;