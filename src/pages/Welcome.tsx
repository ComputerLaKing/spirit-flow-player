import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Play, Music, Heart } from "lucide-react";
import spiritualHero from "@/assets/spiritual-hero.jpg";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-peaceful flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${spiritualHero})` }}
      />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 animate-pulse">
        <div className="w-4 h-4 bg-spiritual-gold rounded-full opacity-60" />
      </div>
      <div className="absolute top-40 right-32 animate-pulse delay-1000">
        <div className="w-6 h-6 bg-spiritual-purple rounded-full opacity-40" />
      </div>
      <div className="absolute bottom-32 left-32 animate-pulse delay-2000">
        <div className="w-5 h-5 bg-spiritual-blue rounded-full opacity-50" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-spiritual rounded-full flex items-center justify-center shadow-spiritual">
              <Music className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-spiritual-gold rounded-full flex items-center justify-center">
              <Play className="w-4 h-4 text-foreground" />
            </div>
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-spiritual bg-clip-text text-transparent">
          Spiritual Harmony
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground mb-4 leading-relaxed">
          Discover inner peace through sacred sounds and healing frequencies
        </p>
        
        <p className="text-base sm:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto px-4">
          Welcome to your sanctuary of spiritual music. Let these divine melodies 
          guide you on a journey of meditation, healing, and enlightenment.
        </p>

        <div className="flex flex-col gap-4 justify-center items-center px-4">
          <Button 
            variant="spiritual" 
            size="lg"
            onClick={() => navigate('/language')}
            className="group relative overflow-hidden w-full sm:w-auto min-h-[56px]"
          >
            <Heart className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            Begin Your Journey
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </Button>
          
          <Button 
            variant="peaceful" 
            size="lg"
            onClick={() => navigate('/playlist')}
            className="w-full sm:w-auto min-h-[56px]"
          >
            <Music className="w-5 h-5 mr-2" />
            Explore Music
          </Button>
        </div>

        <div className="mt-16 text-sm text-muted-foreground">
          ✨ Curated spiritual music for meditation, healing & transformation ✨
        </div>
      </div>
    </div>
  );
};

export default Welcome;