import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Code, 
  Database, 
  Globe, 
  Smartphone,
  Brain,
  Trophy,
  Clock,
  Target,
  Play,
  ChevronRight
} from 'lucide-react';

const subjects = [
  {
    id: 1,
    title: 'Data Structures & Algorithms',
    icon: Brain,
    description: 'Master the fundamentals of computer science',
    topics: 15,
    questions: 450,
    difficulty: 'Intermediate',
    progress: 65,
    color: 'bg-blue-500',
  },
  {
    id: 2,
    title: 'Web Development',
    icon: Globe,
    description: 'Frontend and backend web technologies',
    topics: 12,
    questions: 380,
    difficulty: 'Beginner',
    progress: 80,
    color: 'bg-green-500',
  },
  {
    id: 3,
    title: 'Database Management',
    icon: Database,
    description: 'SQL, NoSQL, and database design',
    topics: 8,
    questions: 220,
    difficulty: 'Intermediate',
    progress: 45,
    color: 'bg-purple-500',
  },
  {
    id: 4,
    title: 'Mobile Development',
    icon: Smartphone,
    description: 'iOS, Android, and cross-platform apps',
    topics: 10,
    questions: 310,
    difficulty: 'Advanced',
    progress: 30,
    color: 'bg-orange-500',
  },
  {
    id: 5,
    title: 'Programming Languages',
    icon: Code,
    description: 'Java, Python, JavaScript, and more',
    topics: 18,
    questions: 540,
    difficulty: 'All Levels',
    progress: 70,
    color: 'bg-red-500',
  },
  {
    id: 6,
    title: 'System Design',
    icon: Target,
    description: 'Scalable system architecture',
    topics: 6,
    questions: 150,
    difficulty: 'Advanced',
    progress: 25,
    color: 'bg-indigo-500',
  },
];

const Practice = () => {
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);

  const handleStartPractice = (subjectId: number) => {
    setSelectedSubject(subjectId);
    // In a real app, this would navigate to the quiz
    console.log(`Starting practice for subject ${subjectId}`);
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <BookOpen className="w-4 h-4 mr-2" />
            Practice Mode
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Learning Path
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Master technical concepts through structured practice. Each subject contains 
            curated MCQs organized by difficulty and topics.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 text-center bg-gradient-card">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">2,450</div>
            <div className="text-sm text-muted-foreground">Total Questions</div>
          </Card>
          <Card className="p-6 text-center bg-gradient-card">
            <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">85%</div>
            <div className="text-sm text-muted-foreground">Avg. Accuracy</div>
          </Card>
          <Card className="p-6 text-center bg-gradient-card">
            <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">45 min</div>
            <div className="text-sm text-muted-foreground">Avg. Session</div>
          </Card>
          <Card className="p-6 text-center bg-gradient-card">
            <Brain className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">69</div>
            <div className="text-sm text-muted-foreground">Subjects</div>
          </Card>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((subject) => (
            <Card 
              key={subject.id} 
              className="p-6 bg-gradient-card hover:shadow-glow transition-all duration-300 border-border hover:border-primary/50 group"
            >
              {/* Subject Header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${subject.color} rounded-lg flex items-center justify-center shadow-md`}>
                  <subject.icon className="w-6 h-6 text-white" />
                </div>
                <Badge variant="outline" className="text-xs">
                  {subject.difficulty}
                </Badge>
              </div>

              {/* Subject Info */}
              <h3 className="text-xl font-semibold mb-2">{subject.title}</h3>
              <p className="text-muted-foreground mb-4">{subject.description}</p>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{subject.progress}%</span>
                </div>
                <Progress value={subject.progress} className="h-2" />
              </div>

              {/* Stats */}
              <div className="flex justify-between text-sm text-muted-foreground mb-4">
                <span>{subject.topics} Topics</span>
                <span>{subject.questions} Questions</span>
              </div>

              {/* Action Button */}
              <Button 
                onClick={() => handleStartPractice(subject.id)}
                className="w-full justify-between group-hover:bg-primary/90"
              >
                <span className="flex items-center">
                  <Play className="w-4 h-4 mr-2" />
                  Start Practice
                </span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Card className="p-8 bg-gradient-card max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready for a Challenge?
            </h3>
            <p className="text-muted-foreground mb-6">
              Test your skills across multiple subjects with our comprehensive assessment.
            </p>
            <Button variant="hero" size="lg">
              Take Mixed Assessment
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Practice;