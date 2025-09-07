import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Globe, ArrowRight, Check } from "lucide-react";
import { useState } from "react";

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

const LanguageSelection = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleContinue = () => {
    // Store selected language in localStorage
    localStorage.setItem('spiritual-language', selectedLanguage);
    navigate('/playlist');
  };

  return (
    <div className="min-h-screen bg-gradient-peaceful flex items-center justify-center px-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-gradient-spiritual rounded-full flex items-center justify-center shadow-spiritual">
              <Globe className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 bg-gradient-spiritual bg-clip-text text-transparent">
            Choose Your Language
          </h1>
          <p className="text-lg text-muted-foreground">
            Select your preferred language to personalize your spiritual journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {languages.map((language) => (
            <Card
              key={language.code}
              className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-gentle border-2 ${
                selectedLanguage === language.code
                  ? 'border-spiritual-purple bg-spiritual-light shadow-spiritual'
                  : 'border-border hover:border-spiritual-purple/50'
              }`}
              onClick={() => setSelectedLanguage(language.code)}
            >
              <div className="text-center">
                <div className="text-3xl mb-3">{language.flag}</div>
                <h3 className="font-semibold text-foreground mb-1">
                  {language.native}
                </h3>
                <p className="text-sm text-muted-foreground">{language.name}</p>
                
                {selectedLanguage === language.code && (
                  <div className="mt-3 flex justify-center">
                    <div className="w-6 h-6 bg-spiritual-purple rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="spiritual" 
            size="lg"
            onClick={handleContinue}
            className="group"
          >
            Continue to Playlist
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;