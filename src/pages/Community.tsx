import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share, 
  BookOpen,
  Trophy,
  HelpCircle,
  Lightbulb,
  Clock,
  TrendingUp,
  Star,
  ChevronRight
} from 'lucide-react';

const communityStats = [
  { icon: Users, label: 'Active Members', value: '25,847', color: 'text-blue-500' },
  { icon: MessageCircle, label: 'Discussions', value: '1,234', color: 'text-green-500' },
  { icon: HelpCircle, label: 'Questions Answered', value: '8,956', color: 'text-purple-500' },
  { icon: Trophy, label: 'Study Groups', value: '342', color: 'text-yellow-500' },
];

const discussions = [
  {
    id: 1,
    title: 'Best strategies for System Design interviews',
    author: 'TechMaster',
    avatar: 'TM',
    time: '2 hours ago',
    replies: 24,
    hearts: 156,
    category: 'Interview Tips',
    isHot: true,
  },
  {
    id: 2,
    title: 'JavaScript closures explained with examples',
    author: 'CodeNinja',
    avatar: 'CN',
    time: '4 hours ago',
    replies: 18,
    hearts: 89,
    category: 'Programming',
    isHot: false,
  },
  {
    id: 3,
    title: 'How to prepare for FAANG companies in 6 months',
    author: 'CareerGuru',
    avatar: 'CG',
    time: '1 day ago',
    replies: 67,
    hearts: 234,
    category: 'Career Advice',
    isHot: true,
  },
  {
    id: 4,
    title: 'Dynamic Programming patterns cheat sheet',
    author: 'AlgoExpert',
    avatar: 'AE',
    time: '2 days ago',
    replies: 31,
    hearts: 178,
    category: 'Algorithms',
    isHot: false,
  },
];

const studyGroups = [
  {
    id: 1,
    name: 'FAANG Interview Prep',
    members: 124,
    activity: 'Very Active',
    description: 'Preparing for interviews at top tech companies',
    tags: ['System Design', 'Coding', 'Behavioral'],
  },
  {
    id: 2,
    name: 'JavaScript Mastery',
    members: 89,
    activity: 'Active',
    description: 'Deep dive into JavaScript concepts and best practices',
    tags: ['JavaScript', 'Web Dev', 'Frontend'],
  },
  {
    id: 3,
    name: 'Data Structures Study Circle',
    members: 156,
    activity: 'Very Active',
    description: 'Master data structures and algorithms together',
    tags: ['DSA', 'Coding', 'Practice'],
  },
];

const Community = () => {
  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Users className="w-4 h-4 mr-2" />
            HackHustle Community
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Learn Together,{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Grow Together
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with fellow learners, share knowledge, get help, and build your network 
            in our thriving community of tech enthusiasts.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {communityStats.map((stat) => (
            <Card key={stat.label} className="p-6 text-center bg-gradient-card">
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hot Discussions */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Hot Discussions</h2>
                <Button variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start Discussion
                </Button>
              </div>

              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <Card key={discussion.id} className="p-6 bg-gradient-card hover:shadow-md transition-all duration-200">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarFallback>{discussion.avatar}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {discussion.category}
                          </Badge>
                          {discussion.isHot && (
                            <Badge variant="destructive" className="text-xs">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Hot
                            </Badge>
                          )}
                        </div>
                        
                        <h3 className="font-semibold text-lg mb-2 hover:text-primary cursor-pointer">
                          {discussion.title}
                        </h3>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>by {discussion.author}</span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {discussion.time}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm">
                              <Heart className="w-4 h-4 mr-1" />
                              {discussion.hearts}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {discussion.replies}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Study Groups */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Active Study Groups</h2>
              
              <div className="space-y-4">
                {studyGroups.map((group) => (
                  <Card key={group.id} className="p-6 bg-gradient-card hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{group.name}</h3>
                        <p className="text-muted-foreground">{group.description}</p>
                      </div>
                      <Button>
                        Join Group
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {group.members} members
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {group.activity}
                        </Badge>
                      </div>
                      
                      <div className="flex space-x-2">
                        {group.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6 bg-gradient-card">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Ask Question
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Share Knowledge
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Study Resources
                </Button>
              </div>
            </Card>

            {/* Top Contributors */}
            <Card className="p-6 bg-gradient-card">
              <h3 className="font-semibold mb-4">Top Contributors</h3>
              <div className="space-y-4">
                {['CodeMaster', 'AlgoNinja', 'DevWizard'].map((contributor, index) => (
                  <div key={contributor} className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <Avatar>
                        <AvatarFallback>{contributor.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{contributor}</span>
                        {index === 0 && <Crown className="w-4 h-4 text-yellow-500" />}
                      </div>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Community Guidelines */}
            <Card className="p-6 bg-gradient-card">
              <h3 className="font-semibold mb-4">Community Guidelines</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Be respectful and helpful</li>
                <li>• Search before asking questions</li>
                <li>• Share knowledge freely</li>
                <li>• Use appropriate tags</li>
                <li>• Follow academic integrity</li>
              </ul>
              <Button variant="ghost" className="w-full mt-4 text-xs">
                Read Full Guidelines
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const Crown = ({ className }: { className: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M5 4a1 1 0 00-.7 1.7L9 9.4V15H7a1 1 0 100 2h6a1 1 0 100-2h-2V9.4l4.7-3.7A1 1 0 0015 4a1 1 0 00-1 1 1 1 0 01-2 0 1 1 0 00-2 0 1 1 0 01-2 0 1 1 0 00-2 0 1 1 0 01-2 0 1 1 0 00-1-1z" />
  </svg>
);

export default Community;