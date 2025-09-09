import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Play, Music, Heart, Globe, Check, HelpCircle } from "lucide-react";
import { useState } from "react";
import spiritualHero from "@/assets/spiritual-hero.jpg";

const languages = [
  { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', native: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
  { code: 'zh', name: 'Chinese', native: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵' },
  { code: 'pt', name: 'Portuguese', native: 'Português', flag: '🇧🇷' },
];

const Welcome = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    localStorage.setItem('spiritual-language', languageCode);
    setTimeout(() => {
      navigate('/playlist');
    }, 300);
  };

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
        <div className="w-6 h-6 bg-spiritual-orange rounded-full opacity-40" />
      </div>
      <div className="absolute bottom-32 left-32 animate-pulse delay-2000">
        <div className="w-5 h-5 bg-spiritual-yellow rounded-full opacity-50" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
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
          
          <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto px-4">
            Welcome to your sanctuary of spiritual music. Let these divine melodies 
            guide you on a journey of meditation, healing, and enlightenment.
          </p>
        </div>

        {/* Language Selection */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="mb-4 flex justify-center">
              <div className="w-12 h-12 bg-gradient-spiritual rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-spiritual bg-clip-text text-transparent">
              Choose Your Language
            </h2>
            <p className="text-muted-foreground">
              Select your preferred language to personalize your journey
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {languages.map((language) => (
              <Card
                key={language.code}
                className={`p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:shadow-gentle border-2 active:scale-95 ${
                  selectedLanguage === language.code
                    ? 'border-spiritual-orange bg-spiritual-light shadow-spiritual'
                    : 'border-border hover:border-spiritual-orange/50'
                }`}
                onClick={() => handleLanguageSelect(language.code)}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{language.flag}</div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">
                    {language.native}
                  </h3>
                  <p className="text-xs text-muted-foreground">{language.name}</p>
                  
                  {selectedLanguage === language.code && (
                    <div className="mt-2 flex justify-center">
                      <div className="w-5 h-5 bg-spiritual-orange rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 justify-center items-center px-4 mb-8">
          <Button 
            variant="spiritual" 
            size="lg"
            onClick={() => navigate('/playlist')}
            className="group relative overflow-hidden w-full sm:w-auto min-h-[56px]"
          >
            <Heart className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            Start Listening
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </Button>
          
          <Button 
            variant="peaceful" 
            size="lg"
            onClick={() => navigate('/quiz')}
            className="w-full sm:w-auto min-h-[56px]"
          >
            <HelpCircle className="w-5 h-5 mr-2" />
            Take Spiritual Quiz
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          ✨ Curated spiritual music for meditation, healing & transformation ✨
        </div>
      </div>
    </div>
  );
};

export default Welcome;