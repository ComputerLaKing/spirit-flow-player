import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CheckCircle, ArrowLeft, Sparkles, Heart, Brain, Flower } from "lucide-react";

const quizQuestions = [
  {
    id: 1,
    question: "What is your primary goal for spiritual music?",
    options: [
      { id: 'meditation', label: 'Deep Meditation', icon: Flower },
      { id: 'healing', label: 'Emotional Healing', icon: Heart },
      { id: 'focus', label: 'Enhanced Focus', icon: Brain },
      { id: 'peace', label: 'Inner Peace', icon: Sparkles }
    ]
  },
  {
    id: 2,
    question: "When do you prefer to listen to spiritual music?",
    options: [
      { id: 'morning', label: 'Morning Meditation', icon: Sparkles },
      { id: 'evening', label: 'Evening Relaxation', icon: Heart },
      { id: 'anytime', label: 'Throughout the Day', icon: Brain },
      { id: 'night', label: 'Before Sleep', icon: Flower }
    ]
  },
  {
    id: 3,
    question: "What type of spiritual sounds resonate with you?",
    options: [
      { id: 'chanting', label: 'Sacred Chanting', icon: Flower },
      { id: 'instruments', label: 'Instrumental Music', icon: Heart },
      { id: 'nature', label: 'Nature Sounds', icon: Sparkles },
      { id: 'frequencies', label: 'Healing Frequencies', icon: Brain }
    ]
  }
];

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerId: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: answerId }));
    
    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setShowResults(true);
      }, 300);
    }
  };

  const getPersonalizedResult = () => {
    const answerValues = Object.values(answers);
    
    if (answerValues.includes('meditation') || answerValues.includes('chanting')) {
      return {
        title: "The Meditative Soul",
        description: "You seek deep spiritual connection through traditional practices. Sacred chanting and meditative music will guide your journey.",
        recommendation: "Start with our Meditation & Chanting collection"
      };
    } else if (answerValues.includes('healing') || answerValues.includes('frequencies')) {
      return {
        title: "The Healing Seeker",
        description: "Your path focuses on emotional and spiritual healing. Therapeutic frequencies and healing sounds will support your transformation.",
        recommendation: "Explore our Healing Frequencies playlist"
      };
    } else if (answerValues.includes('focus') || answerValues.includes('instruments')) {
      return {
        title: "The Mindful Practitioner",
        description: "You use spiritual music to enhance focus and mindfulness. Instrumental pieces and ambient sounds will elevate your practice.",
        recommendation: "Check out our Focus & Mindfulness selection"
      };
    } else {
      return {
        title: "The Peaceful Explorer",
        description: "You seek overall peace and tranquility. A mix of nature sounds and gentle melodies will create your perfect spiritual atmosphere.",
        recommendation: "Start with our Nature & Peace collection"
      };
    }
  };

  if (showResults) {
    const result = getPersonalizedResult();
    
    return (
      <div className="min-h-screen bg-gradient-peaceful flex items-center justify-center px-6">
        <div className="max-w-2xl w-full">
          <Card className="shadow-spiritual border-spiritual-orange/20">
            <CardHeader className="text-center pb-6">
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 bg-gradient-spiritual rounded-full flex items-center justify-center shadow-spiritual">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl mb-4 bg-gradient-spiritual bg-clip-text text-transparent">
                {result.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {result.description}
              </p>
              
              <div className="bg-spiritual-light p-6 rounded-lg border border-spiritual-orange/20">
                <h3 className="font-semibold text-spiritual-orange mb-2">
                  Personalized Recommendation
                </h3>
                <p className="text-muted-foreground">
                  {result.recommendation}
                </p>
              </div>

              <div className="flex flex-col gap-4 pt-4">
                <Button 
                  variant="spiritual" 
                  size="lg"
                  onClick={() => navigate('/playlist')}
                  className="w-full"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Start Your Personalized Journey
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setCurrentQuestion(0);
                    setAnswers({});
                    setShowResults(false);
                  }}
                  className="w-full"
                >
                  Retake Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-peaceful flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
            <span className="text-sm text-spiritual-orange font-medium">
              {Math.round(progress)}% Complete
            </span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-spiritual h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Card className="shadow-spiritual border-spiritual-orange/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-4">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {question.options.map((option) => {
                const IconComponent = option.icon;
                const isSelected = answers[currentQuestion] === option.id;
                
                return (
                  <Card
                    key={option.id}
                    className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-gentle border-2 active:scale-95 ${
                      isSelected
                        ? 'border-spiritual-orange bg-spiritual-light shadow-spiritual'
                        : 'border-border hover:border-spiritual-orange/50'
                    }`}
                    onClick={() => handleAnswerSelect(option.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isSelected 
                          ? 'bg-spiritual-orange text-white' 
                          : 'bg-spiritual-light text-spiritual-orange'
                      }`}>
                        {isSelected ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <IconComponent className="w-6 h-6" />
                        )}
                      </div>
                      <span className="text-lg font-medium">{option.label}</span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;