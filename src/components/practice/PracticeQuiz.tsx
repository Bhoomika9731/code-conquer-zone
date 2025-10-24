import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import { Question } from '@/data/questions';

interface PracticeQuizProps {
  questions: Question[];
  topicName: string;
  subjectName: string;
  onBack: () => void;
  onAssessment: () => void;
}

export const PracticeQuiz = ({ questions, topicName, subjectName, onBack, onAssessment }: PracticeQuizProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState<{ [key: number]: boolean }>({});

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answerIndex });
    setShowResults({ ...showResults, [questionId]: true });
  };

  const correctCount = Object.keys(showResults).filter(
    (qId) => selectedAnswers[parseInt(qId)] === questions.find(q => q.id === parseInt(qId))?.correctAnswer
  ).length;

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="outline" onClick={onBack} className="mb-4">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Topics
          </Button>
          <div className="flex items-center justify-between mb-4">
            <div>
              <Badge variant="secondary" className="mb-2">{subjectName}</Badge>
              <h1 className="text-3xl font-bold">{topicName}</h1>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Score</div>
              <div className="text-2xl font-bold">{correctCount}/{Object.keys(showResults).length}</div>
            </div>
          </div>
          <Progress value={(Object.keys(showResults).length / questions.length) * 100} className="h-2" />
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question, index) => {
            const isAnswered = showResults[question.id];
            const selectedAnswer = selectedAnswers[question.id];
            const isCorrect = selectedAnswer === question.correctAnswer;

            return (
              <Card key={question.id} className="p-6 bg-gradient-card">
                <div className="flex items-start gap-4 mb-4">
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    {index + 1}
                  </Badge>
                  <h3 className="text-lg font-medium flex-1">{question.question}</h3>
                  {isAnswered && (
                    isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500" />
                    )
                  )}
                </div>

                <div className="space-y-3 ml-12">
                  {question.options.map((option, optionIndex) => {
                    const isSelected = selectedAnswer === optionIndex;
                    const isCorrectOption = optionIndex === question.correctAnswer;
                    
                    let buttonClass = "justify-start text-left h-auto py-3 px-4 ";
                    if (isAnswered) {
                      if (isCorrectOption) {
                        buttonClass += "border-green-500 bg-green-500/10";
                      } else if (isSelected && !isCorrect) {
                        buttonClass += "border-red-500 bg-red-500/10";
                      }
                    } else if (isSelected) {
                      buttonClass += "border-primary bg-primary/10";
                    }

                    return (
                      <Button
                        key={optionIndex}
                        variant="outline"
                        className={buttonClass}
                        onClick={() => !isAnswered && handleAnswer(question.id, optionIndex)}
                        disabled={isAnswered}
                      >
                        <span className="font-semibold mr-2">{String.fromCharCode(65 + optionIndex)}.</span>
                        {option}
                      </Button>
                    );
                  })}
                </div>

                {isAnswered && question.explanation && (
                  <div className="ml-12 mt-4 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Explanation:</strong> {question.explanation}
                    </p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Assessment CTA */}
        <Card className="p-8 bg-gradient-card text-center mt-8">
          <h3 className="text-2xl font-bold mb-4">Ready for the Assessment?</h3>
          <p className="text-muted-foreground mb-6">
            Test your complete understanding of {topicName}
          </p>
          <Button size="lg" onClick={onAssessment}>
            Take {topicName} Assessment
          </Button>
        </Card>
      </div>
    </div>
  );
};
