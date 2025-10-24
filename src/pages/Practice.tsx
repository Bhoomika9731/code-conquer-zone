import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  ChevronLeft,
  FileText
} from 'lucide-react';
import { subjects, Subject, Topic, Question } from '@/data/questions';

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
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const handleSelectSubject = (subject: Subject) => {
    setSelectedSubject(subject);
  };

  const handleQuestionClick = (question: Question, questionIndex: number, topicName: string) => {
    navigate('/question/:id', {
      state: {
        question,
        questionIndex,
        topicName,
        subjectName: selectedSubject?.name
      }
    });
  };

  const handleTopicAssessment = (topic: Topic) => {
    const allQuestions = topic.questions.flat();
    navigate('/assessment', {
      state: {
        questions: allQuestions,
        assessmentName: `${topic.name} Assessment`,
        subjectName: selectedSubject?.name,
        type: 'topic'
      }
    });
  };

  const handleSubjectAssessment = () => {
    if (!selectedSubject) return;
    const allQuestions = selectedSubject.topics.flatMap(t => t.questions.flat());
    navigate('/assessment', {
      state: {
        questions: allQuestions,
        assessmentName: `${selectedSubject.name} Assessment`,
        subjectName: selectedSubject.name,
        type: 'subject'
      }
    });
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
  };

  // Show topics view
  if (selectedSubject) {
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

          <div className="space-y-8">
            {selectedSubject.topics.map((topic) => {
              const firstSet = topic.questions[0] || [];
              return (
                <div key={topic.id} className="space-y-4">
                  <h3 className="text-xl font-semibold">{topic.name}</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {firstSet.map((question, qIndex) => (
                      <Card 
                        key={question.id}
                        className="p-4 bg-gradient-card hover:shadow-glow transition-all duration-300 border-border hover:border-primary/50 group cursor-pointer"
                        onClick={() => handleQuestionClick(question, qIndex, topic.name)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <Badge variant="outline">{qIndex + 1}</Badge>
                            <p className="text-sm truncate">
                              {question.question.substring(0, 60)}...
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </div>
                      </Card>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleTopicAssessment(topic)}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Take {topic.name} Assessment
                  </Button>
                </div>
              );
            })}
            
            {/* Subject Assessment */}
            <Card className="p-8 bg-gradient-card text-center">
              <h3 className="text-2xl font-bold mb-4">Complete Subject Assessment</h3>
              <p className="text-muted-foreground mb-6">
                Test your knowledge across all topics in {selectedSubject.name}
              </p>
              <Button size="lg" onClick={handleSubjectAssessment}>
                <Trophy className="w-5 h-5 mr-2" />
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
            <div className="text-2xl font-bold">6</div>
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
