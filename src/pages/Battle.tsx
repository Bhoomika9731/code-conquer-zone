import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Trophy, 
  Users, 
  Zap, 
  Clock, 
  Target,
  Swords,
  Crown,
  Play,
  UserPlus,
  Hash,
  Star,
  Medal,
  Timer,
  Gamepad2
} from 'lucide-react';

const battleModes = [
  {
    id: 1,
    title: 'Quick Battle',
    description: 'Jump into a match with random players',
    icon: Zap,
    color: 'bg-yellow-500',
    maxPlayers: 5,
    duration: '5 minutes',
    questions: 20,
  },
  {
    id: 2,
    title: 'Private Room',
    description: 'Create or join a room with friends',
    icon: Users,
    color: 'bg-blue-500',
    maxPlayers: 8,
    duration: '10 minutes',
    questions: 30,
  },
  {
    id: 3,
    title: 'Tournament',
    description: 'Compete in ranked tournament matches',
    icon: Crown,
    color: 'bg-purple-500',
    maxPlayers: 16,
    duration: '15 minutes',
    questions: 40,
  },
];

const leaderboard = [
  { rank: 1, name: 'CodeMaster', score: 2480, wins: 48, avatar: '🥇' },
  { rank: 2, name: 'AlgoNinja', score: 2350, wins: 42, avatar: '🥈' },
  { rank: 3, name: 'DevWizard', score: 2280, wins: 39, avatar: '🥉' },
  { rank: 4, name: 'TechGuru', score: 2150, wins: 35, avatar: '👨‍💻' },
  { rank: 5, name: 'QuizMaster', score: 2020, wins: 33, avatar: '🧠' },
];

const Battle = () => {
  const [gameMode, setGameMode] = useState<'menu' | 'lobby' | 'game'>('menu');
  const [selectedMode, setSelectedMode] = useState<number | null>(null);
  const [roomCode, setRoomCode] = useState('');
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);

  const handleModeSelect = (modeId: number) => {
    setSelectedMode(modeId);
    if (modeId === 1) {
      // Quick battle - start matchmaking
      setGameMode('lobby');
    } else if (modeId === 2) {
      // Private room - show room options  
      setIsCreatingRoom(true);
    } else if (modeId === 3) {
      // Tournament - join tournament queue
      setGameMode('lobby');
    }
  };

  const handleCreateRoom = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(code);
    setGameMode('lobby');
  };

  const handleJoinRoom = () => {
    if (roomCode.length >= 4) {
      setGameMode('lobby');
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="container mx-auto px-4">
        {gameMode === 'menu' && (
          <>
            {/* Header */}
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <Swords className="w-4 h-4 mr-2" />
                Quiz Battle Arena
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Battle Mode{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Activated
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Test your knowledge against other players in real-time quiz battles. 
                First to answer correctly gets the points!
              </p>
            </div>

            {/* Player Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card className="p-6 text-center bg-gradient-card">
                <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">1,847</div>
                <div className="text-sm text-muted-foreground">Battle Points</div>
              </Card>
              <Card className="p-6 text-center bg-gradient-card">
                <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">23</div>
                <div className="text-sm text-muted-foreground">Victories</div>
              </Card>
              <Card className="p-6 text-center bg-gradient-card">
                <Medal className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">87%</div>
                <div className="text-sm text-muted-foreground">Win Rate</div>
              </Card>
              <Card className="p-6 text-center bg-gradient-card">
                <Crown className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">#47</div>
                <div className="text-sm text-muted-foreground">Global Rank</div>
              </Card>
            </div>

            {/* Battle Modes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {battleModes.map((mode) => (
                <Card 
                  key={mode.id} 
                  className="p-6 bg-gradient-card hover:shadow-glow transition-all duration-300 border-border hover:border-primary/50 group cursor-pointer"
                  onClick={() => handleModeSelect(mode.id)}
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 ${mode.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-md`}>
                      <mode.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{mode.title}</h3>
                    <p className="text-muted-foreground mb-4">{mode.description}</p>
                    
                    <div className="space-y-2 text-sm text-muted-foreground mb-6">
                      <div className="flex justify-between">
                        <span>Players:</span>
                        <span>Up to {mode.maxPlayers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{mode.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Questions:</span>
                        <span>{mode.questions}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full group-hover:bg-primary/90">
                      <Play className="w-4 h-4 mr-2" />
                      Start Battle
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Private Room Options */}
            {isCreatingRoom && (
              <Card className="p-8 bg-gradient-card max-w-md mx-auto mb-12">
                <h3 className="text-xl font-semibold mb-6 text-center">Private Room</h3>
                <div className="space-y-4">
                  <Button 
                    onClick={handleCreateRoom}
                    className="w-full justify-start"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create New Room
                  </Button>
                  <div className="text-center text-muted-foreground">or</div>
                  <div className="space-y-2">
                    <Input 
                      placeholder="Enter room code"
                      value={roomCode}
                      onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                      className="text-center text-lg font-mono"
                    />
                    <Button 
                      onClick={handleJoinRoom}
                      variant="outline" 
                      className="w-full"
                      disabled={roomCode.length < 4}
                    >
                      <Hash className="w-4 h-4 mr-2" />
                      Join Room
                    </Button>
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={() => setIsCreatingRoom(false)}
                    className="w-full"
                  >
                    Back
                  </Button>
                </div>
              </Card>
            )}

            {/* Leaderboard */}
            <Card className="p-8 bg-gradient-card">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                Global Leaderboard
              </h3>
              <div className="space-y-4">
                {leaderboard.map((player) => (
                  <div key={player.rank} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{player.avatar}</div>
                      <div>
                        <div className="font-medium">#{player.rank} {player.name}</div>
                        <div className="text-sm text-muted-foreground">{player.wins} victories</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{player.score}</div>
                      <div className="text-sm text-muted-foreground">points</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {gameMode === 'lobby' && (
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-12 bg-gradient-card">
              <div className="mb-8">
                <Gamepad2 className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">
                  {roomCode ? `Room: ${roomCode}` : 'Finding Opponents...'}
                </h2>
                <p className="text-muted-foreground">
                  {roomCode ? 'Share the room code with your friends!' : 'Please wait while we match you with other players'}
                </p>
              </div>

              {/* Waiting players */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[1, 2, 3, 4].map((slot) => (
                  <div key={slot} className="p-4 border border-border rounded-lg">
                    {slot <= 2 ? (
                      <div>
                        <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-2 flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-sm font-medium">Player {slot}</div>
                        <Badge variant="secondary" className="mt-1">Ready</Badge>
                      </div>
                    ) : (
                      <div className="opacity-50">
                        <div className="w-12 h-12 bg-muted rounded-full mx-auto mb-2 flex items-center justify-center">
                          <Users className="w-6 h-6" />
                        </div>
                        <div className="text-sm">Waiting...</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setGameMode('menu')}
                  className="flex-1"
                >
                  Leave Lobby
                </Button>
                <Button 
                  variant="hero" 
                  className="flex-1"
                  onClick={() => console.log('Starting game...')}
                >
                  <Timer className="w-4 h-4 mr-2" />
                  Start Game
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Battle;