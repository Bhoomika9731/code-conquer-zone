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
  Brain,
  Trophy,
  Clock,
  Target,
  Play,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { subjects, Subject, Topic } from '@/data/questions';
import { PracticeQuiz } from '@/components/practice/PracticeQuiz';

const subjectIcons: { [key: string]: any } = {
  "Database Management System": Database,
  "Operating System": Target,
  "Computer Network": Globe,
  "Object Oriented Programming": Code,
  "Data Structure and Algorithms": Brain,
  "Java Programming": Code
};

const subjectColors: { [key: string]: string } = {
  "Database Management System": "bg-green-500",
  "Operating System": "bg-purple-500",
  "Computer Network": "bg-orange-500",
  "Object Oriented Programming": "bg-red-500",
  "Data Structure and Algorithms": "bg-blue-500",
  "Java Programming": "bg-indigo-500"
};

const subjectStats = [
  {
    title: 'Data Structure and Algorithms',
    topics: 15,
    questions: 450,
    difficulty: 'Intermediate',
    progress: 65,
  },
  {
    title: 'Database Management System',
    topics: 12,
    questions: 380,
    difficulty: 'Intermediate',
    progress: 80,
  },
  {
    title: 'Operating System',
    topics: 10,
    questions: 320,
    difficulty: 'Intermediate',
    progress: 45,
  },
  {
    title: 'Computer Network',
    topics: 8,
    questions: 280,
    difficulty: 'Intermediate',
    progress: 55,
  },
  {
    title: 'Object Oriented Programming',
    topics: 12,
    questions: 350,
    difficulty: 'Beginner',
    progress: 70,
  },
  {
    title: 'Java Programming',
    topics: 14,
    questions: 420,
    difficulty: 'Intermediate',
    progress: 60,
  },
];

const Practice = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [currentSet, setCurrentSet] = useState(0);
  const [view, setView] = useState<'subjects' | 'topics' | 'quiz'>('subjects');

  const handleSelectSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    setView('topics');
  };

  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    setCurrentSet(0);
    setView('quiz');
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setView('topics');
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setSelectedTopic(null);
    setView('subjects');
  };

  const handleAssessment = () => {
    alert(`Starting ${selectedTopic?.name || selectedSubject?.name} Assessment!`);
  };

  const handleSubjectAssessment = () => {
    alert(`Starting ${selectedSubject?.name} Assessment!`);
  };

  // Show quiz view
  if (view === 'quiz' && selectedTopic && selectedSubject) {
    const questions = selectedTopic.questions[currentSet] || [];
    return (
      <div className="min-h-screen bg-background">
        {/* Set Navigation */}
        <div className="bg-card border-b sticky top-16 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 flex-wrap">
                {selectedTopic.questions.map((_, index) => (
                  <Button
                    key={index}
                    variant={currentSet === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentSet(index)}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
              <Badge variant="secondary">Set {currentSet + 1} of {selectedTopic.questions.length}</Badge>
            </div>
          </div>
        </div>
        <PracticeQuiz
          questions={questions}
          topicName={selectedTopic.name}
          subjectName={selectedSubject.name}
          onBack={handleBackToTopics}
          onAssessment={handleAssessment}
        />
      </div>
    );
  }

  // Show topics view
  if (view === 'topics' && selectedSubject) {
    return (
      <div className="min-h-screen bg-background pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button variant="outline" onClick={handleBackToSubjects} className="mb-6">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Subjects
          </Button>

          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              {selectedSubject.name}
            </Badge>
            <h1 className="text-4xl font-bold mb-4">
              Choose a <span className="bg-gradient-primary bg-clip-text text-transparent">Topic</span>
            </h1>
            <p className="text-muted-foreground">
              Select a topic to start practicing with MCQs
            </p>
          </div>

          <div className="space-y-4">
            {selectedSubject.topics.map((topic) => (
              <Card 
                key={topic.id}
                className="p-6 bg-gradient-card hover:shadow-glow transition-all cursor-pointer group border-border hover:border-primary/50"
                onClick={() => handleSelectTopic(topic)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{topic.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {topic.questions.length} question sets available
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Card>
            ))}

            {/* Subject Assessment */}
            <Card className="p-8 bg-gradient-card text-center mt-8">
              <h3 className="text-2xl font-bold mb-4">
                Ready for Complete Assessment?
              </h3>
              <p className="text-muted-foreground mb-6">
                Test your knowledge across all topics in {selectedSubject.name}
              </p>
              <Button size="lg" onClick={handleSubjectAssessment}>
                Take {selectedSubject.name} Assessment
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Show subjects view (default)
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
          {subjects.map((subject) => {
            const SubjectIcon = subjectIcons[subject.name] || Code;
            const stats = subjectStats.find(s => s.title === subject.name);
            
            return (
              <Card 
                key={subject.id} 
                className="p-6 bg-gradient-card hover:shadow-glow transition-all duration-300 border-border hover:border-primary/50 group"
              >
                {/* Subject Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${subjectColors[subject.name]} rounded-lg flex items-center justify-center shadow-md`}>
                    <SubjectIcon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {stats?.difficulty}
                  </Badge>
                </div>

                {/* Subject Info */}
                <h3 className="text-xl font-semibold mb-2">{subject.name}</h3>
                <p className="text-muted-foreground mb-4">Master the fundamentals</p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{stats?.progress}%</span>
                  </div>
                  <Progress value={stats?.progress || 0} className="h-2" />
                </div>

                {/* Stats */}
                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <span>{subject.topics.length} Topics</span>
                  <span>{stats?.questions} Questions</span>
                </div>

                {/* Action Button */}
                <Button 
                  onClick={() => handleSelectSubject(subject)}
                  className="w-full justify-between group-hover:bg-primary/90"
                >
                  <span className="flex items-center">
                    <Play className="w-4 h-4 mr-2" />
                    Start Practice
                  </span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            );
          })}
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