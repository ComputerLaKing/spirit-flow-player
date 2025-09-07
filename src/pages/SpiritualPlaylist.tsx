import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, Download, Heart, Clock, User } from "lucide-react";
import { useState } from "react";
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
}

const spiritualTracks: Track[] = [
  {
    id: 1,
    title: "Deep Meditation Flow",
    artist: "Sacred Sounds",
    duration: "15:30",
    image: meditation1,
    category: "Meditation",
    description: "Guided meditation with Tibetan bowls and nature sounds"
  },
  {
    id: 2,
    title: "Om Mani Padme Hum",
    artist: "Zen Masters",
    duration: "21:45",
    image: chanting2,
    category: "Chanting",
    description: "Traditional Sanskrit mantras for compassion and wisdom"
  },
  {
    id: 3,
    title: "432Hz Healing Frequencies",
    artist: "Sound Healers",
    duration: "18:20",
    image: healing3,
    category: "Healing",
    description: "Pure healing tones for chakra alignment and restoration"
  },
];

const SpiritualPlaylist = () => {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const handlePlayPause = (trackId: number) => {
    if (currentTrack === trackId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(trackId);
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
      {/* Header */}
      <div className="bg-gradient-spiritual text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">
              Sacred Sound Library
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Immerse yourself in carefully curated spiritual music for meditation, 
              healing, and inner transformation
            </p>
          </div>
        </div>
      </div>

      {/* Playlist Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Featured Tracks
          </h2>
          <p className="text-muted-foreground">
            Begin your spiritual journey with these transformative sounds
          </p>
        </div>

        <div className="grid gap-6">
          {spiritualTracks.map((track, index) => (
            <Card 
              key={track.id} 
              className="p-6 hover:shadow-spiritual transition-all duration-300 border border-spiritual-purple/10"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Track Image */}
                <div className="relative group">
                  <div className="w-full lg:w-32 h-48 lg:h-32 rounded-lg overflow-hidden">
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
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs bg-spiritual-light text-spiritual-purple px-2 py-1 rounded-full font-medium">
                          {track.category}
                        </span>
                        <span className="text-sm text-muted-foreground">#{index + 1}</span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {track.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {track.artist}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {track.duration}
                        </div>
                      </div>
                      <p className="text-muted-foreground">
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
                      className="group"
                    >
                      {currentTrack === track.id && isPlaying ? (
                        <Pause className="w-5 h-5 mr-2" />
                      ) : (
                        <Play className="w-5 h-5 mr-2" />
                      )}
                      {currentTrack === track.id && isPlaying ? 'Pause' : 'Play'}
                    </Button>

                    <Button
                      variant="peaceful"
                      onClick={() => toggleFavorite(track.id)}
                      className={favorites.has(track.id) ? 'text-red-500' : ''}
                    >
                      <Heart className={`w-4 h-4 ${favorites.has(track.id) ? 'fill-current' : ''}`} />
                    </Button>

                    <Button variant="ghost">
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