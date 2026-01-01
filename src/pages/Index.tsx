import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

type Screen = 'auth' | 'feed' | 'reader' | 'library' | 'library-reader' | 'profile' | 'goals' | 'settings' | 'help';
type UserRole = 'Читатель' | 'Модератор' | 'Разработчик';

interface Article {
  id: number;
  title: string;
  source: string;
  preview: string;
  readTime: number;
  saved: boolean;
  category: string;
  progress?: number;
  tags: string[];
}

const mockArticles: Article[] = [
  {
    id: 1,
    title: 'Как работает квантовая запутанность в современной физике',
    source: 'Наука Today',
    preview: 'Квантовая механика продолжает удивлять учёных своими необычными свойствами. Запутанность частиц позволяет им мгновенно влиять друг на друга...',
    readTime: 12,
    saved: false,
    category: 'Наука',
    tags: ['Физика', 'Квантовая механика', 'Наука'],
  },
  {
    id: 2,
    title: 'Будущее искусственного интеллекта: что нас ждёт в 2026 году',
    source: 'Tech Review',
    preview: 'ИИ-модели становятся всё более мощными и доступными. Эксперты предсказывают революцию в медицине, образовании и творческих индустриях...',
    readTime: 8,
    saved: true,
    category: 'Технологии',
    tags: ['ИИ', 'Технологии', 'Будущее'],
  },
  {
    id: 3,
    title: 'Минимализм в дизайне: меньше значит больше',
    source: 'Design Weekly',
    preview: 'Современные интерфейсы стремятся к простоте. Убираем всё лишнее, оставляем только важное — это философия нового поколения дизайнеров...',
    readTime: 6,
    saved: false,
    category: 'Дизайн',
    tags: ['Дизайн', 'UI/UX', 'Минимализм'],
  },
  {
    id: 4,
    title: 'Нейробиология счастья: как мозг создаёт эмоции',
    source: 'Brain Science',
    preview: 'Исследования показывают, что счастье — это не случайность, а результат работы сложных химических процессов в нашем мозге...',
    readTime: 15,
    saved: true,
    category: 'Наука',
    tags: ['Нейробиология', 'Психология', 'Наука'],
  },
];

const libraryItems: Article[] = [
  { ...mockArticles[1], progress: 65 },
  { ...mockArticles[3], progress: 30 },
  { ...mockArticles[0], progress: 100 },
];

const Index = () => {
  const [screen, setScreen] = useState<Screen>('auth');
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('Читатель');
  const [activeCategory, setActiveCategory] = useState('Для вас');
  const [articles, setArticles] = useState(mockArticles);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [readProgress, setReadProgress] = useState(42);
  const [dailyGoal, setDailyGoal] = useState(30);
  const [notifications, setNotifications] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);

  const toggleSave = (id: number) => {
    setArticles(prev =>
      prev.map(article =>
        article.id === id ? { ...article, saved: !article.saved } : article
      )
    );
  };

  const skipArticle = (id: number) => {
    setArticles(prev => prev.filter(article => article.id !== id));
  };

  const handleAuth = () => {
    setIsAuthenticated(true);
    setScreen('feed');
  };

  const categories = ['Для вас', 'Технологии', 'Наука', 'Сохранённое'];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 fade-in">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Pluck</h1>
            <p className="text-[var(--text-secondary)]">
              Ваша персональная библиотека для чтения
            </p>
          </div>

          <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 space-y-6">
            <div className="flex gap-2">
              <Button
                onClick={() => setIsLogin(true)}
                className={`flex-1 ${
                  isLogin
                    ? 'bg-[var(--accent)] hover:bg-[var(--accent)]/90'
                    : 'bg-transparent hover:bg-[var(--bg-tertiary)]'
                }`}
              >
                Вход
              </Button>
              <Button
                onClick={() => setIsLogin(false)}
                className={`flex-1 ${
                  !isLogin
                    ? 'bg-[var(--accent)] hover:bg-[var(--accent)]/90'
                    : 'bg-transparent hover:bg-[var(--bg-tertiary)]'
                }`}
              >
                Регистрация
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="bg-[var(--bg-tertiary)] border-0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-[var(--bg-tertiary)] border-0"
                />
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirm">Подтвердите пароль</Label>
                  <Input
                    id="confirm"
                    type="password"
                    placeholder="••••••••"
                    className="bg-[var(--bg-tertiary)] border-0"
                  />
                </div>
              )}

              <Button
                onClick={handleAuth}
                className="w-full bg-[var(--accent)] hover:bg-[var(--accent)]/90"
              >
                {isLogin ? 'Войти' : 'Создать аккаунт'}
              </Button>

              {isLogin && (
                <button className="w-full text-center text-sm text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]">
                  Забыли пароль?
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pb-20">
      {/* Feed Screen */}
      {screen === 'feed' && (
        <div className="fade-in">
          <div className="sticky top-0 z-10 bg-[var(--bg-primary)] border-b border-[var(--divider)] px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold tracking-tight">Pluck</h1>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Icon name="Search" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Icon name="Bell" size={20} />
                </Button>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {categories.map(cat => (
                <Button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  variant={activeCategory === cat ? 'default' : 'ghost'}
                  className={`rounded-full whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90'
                      : 'text-[var(--text-secondary)]'
                  }`}
                  size="sm"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          <div className="px-4 pt-4 space-y-4">
            {articles.map(article => (
              <div
                key={article.id}
                className="bg-[var(--bg-secondary)] rounded-xl p-4"
              >
                <div className="flex justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <Badge
                      variant="secondary"
                      className="mb-2 text-[var(--accent)] bg-[var(--accent)]/10 border-0"
                    >
                      {article.source}
                    </Badge>
                    <h3
                      className="text-lg font-semibold text-[var(--text-primary)] mb-2 leading-tight cursor-pointer hover:text-[var(--accent)] transition-colors"
                      onClick={() => {
                        setSelectedArticle(article);
                        setScreen('reader');
                      }}
                    >
                      {article.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3 mb-3">
                      {article.preview}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.tags.map(tag => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs border-[var(--divider)] text-[var(--text-tertiary)]"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[var(--text-tertiary)]">
                        {article.readTime} мин чтения
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[var(--text-tertiary)] hover:text-red-400"
                          onClick={() => skipArticle(article.id)}
                        >
                          <Icon name="X" size={16} className="mr-1" />
                          Пропустить
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={
                            article.saved
                              ? 'text-[var(--accent)]'
                              : 'text-[var(--text-tertiary)]'
                          }
                          onClick={() => toggleSave(article.id)}
                        >
                          <Icon
                            name={article.saved ? 'Bookmark' : 'BookmarkPlus'}
                            size={16}
                            className="mr-1"
                          />
                          {article.saved ? 'Сохранено' : 'Сохранить'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            className="fixed bottom-24 right-4 h-14 w-14 rounded-full shadow-lg bg-[var(--accent)] hover:bg-[var(--accent)]/90"
            size="icon"
          >
            <Icon name="RefreshCw" size={20} />
          </Button>
        </div>
      )}

      {/* Reader Screen */}
      {screen === 'reader' && selectedArticle && (
        <div className="fade-in">
          <div className="sticky top-0 z-10 bg-[var(--bg-primary)]/95 backdrop-blur-sm border-b border-[var(--divider)] px-4 py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setScreen('feed')}
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <span className="text-sm text-[var(--text-secondary)] truncate max-w-[200px]">
                {selectedArticle.source}
              </span>
              <Button variant="ghost" size="icon">
                <Icon name="MoreVertical" size={20} />
              </Button>
            </div>
          </div>

          <div className="px-6 py-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold leading-tight mb-3">
              {selectedArticle.title}
            </h1>
            <div className="text-sm text-[var(--text-tertiary)] mb-4">
              {selectedArticle.source} · {selectedArticle.readTime} мин чтения
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {selectedArticle.tags.map(tag => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-[var(--divider)] text-[var(--text-tertiary)]"
                >
                  #{tag}
                </Badge>
              ))}
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                {selectedArticle.preview}
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                Это начало захватывающей истории, которая раскрывает перед
                читателем новые горизонты понимания. Каждый абзац продуман так,
                чтобы информация усваивалась легко и естественно.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                Минималистичный дизайн этого приложения не отвлекает от главного
                — от содержания. Только вы и текст. Никаких лишних элементов,
                только чистое погружение в чтение.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                Тёмная тема специально разработана для комфортного чтения в
                любое время суток. Цвета подобраны так, чтобы глаза не
                уставали даже при длительном чтении.
              </p>
            </div>
          </div>

          <div className="fixed bottom-20 left-0 right-0 bg-[var(--bg-secondary)]/95 backdrop-blur-sm border-t border-[var(--divider)] px-6 py-4">
            <Progress value={readProgress} className="mb-4" />
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon">
                <Icon name="ChevronLeft" size={20} />
              </Button>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                  <Icon name="Volume2" size={20} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon name="Sun" size={20} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon name="Type" size={20} />
                </Button>
              </div>
              <Button variant="ghost" size="icon">
                <Icon name="ChevronRight" size={20} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Library Screen */}
      {screen === 'library' && (
        <div className="fade-in">
          <div className="sticky top-0 z-10 bg-[var(--bg-primary)] border-b border-[var(--divider)] px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Моя библиотека</h1>
              <Button variant="ghost" size="sm">
                Изменить
              </Button>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {['Все', 'Позже', 'История', 'Офлайн'].map(tab => (
                <Button
                  key={tab}
                  variant="ghost"
                  className="rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                  size="sm"
                >
                  {tab}
                </Button>
              ))}
            </div>
          </div>

          <div className="px-4 pt-4 space-y-3">
            {libraryItems.map(item => (
              <div
                key={item.id}
                className="bg-[var(--bg-secondary)] rounded-xl p-4 hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
                onClick={() => {
                  setSelectedArticle(item);
                  setScreen('library-reader');
                }}
              >
                <div className="flex gap-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-[var(--text-primary)] mb-1 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--text-tertiary)] mb-3">
                      {item.source} · {item.readTime} мин
                    </p>
                    <div className="flex items-center gap-2">
                      <Progress value={item.progress} className="flex-1 h-1.5" />
                      <span className="text-xs text-[var(--text-tertiary)]">
                        {item.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Library Reader Screen */}
      {screen === 'library-reader' && selectedArticle && (
        <div className="fade-in">
          <div className="sticky top-0 z-10 bg-[var(--bg-primary)]/95 backdrop-blur-sm border-b border-[var(--divider)] px-4 py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setScreen('library')}
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <span className="text-sm text-[var(--text-secondary)]">
                Прогресс: {selectedArticle.progress}%
              </span>
              <Button variant="ghost" size="icon">
                <Icon name="MoreVertical" size={20} />
              </Button>
            </div>
          </div>

          <div className="px-6 py-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold leading-tight mb-3">
              {selectedArticle.title}
            </h1>
            <div className="text-sm text-[var(--text-tertiary)] mb-8">
              {selectedArticle.source} · {selectedArticle.readTime} мин чтения
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                {selectedArticle.preview}
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                Продолжение вашего чтения. Здесь вы остановились в прошлый раз.
                Приложение запомнило вашу позицию и теперь вы можете продолжить
                с того же места.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Profile Screen */}
      {screen === 'profile' && (
        <div className="fade-in">
          <div className="px-4 py-6 border-b border-[var(--divider)]">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-16 w-16 bg-[var(--accent)]">
                <AvatarFallback className="bg-[var(--accent)] text-white text-xl font-semibold">
                  АИ
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold">Александр Иванов</h2>
                <p className="text-sm text-[var(--text-tertiary)]">
                  Читатель с января 2026
                </p>
                <Badge
                  variant="secondary"
                  className="mt-2 text-[var(--accent)] bg-[var(--accent)]/10 border-0"
                >
                  {userRole}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setScreen('settings')}
              >
                <Icon name="Settings" size={20} />
              </Button>
            </div>
          </div>

          <div className="px-4 py-6">
            <h3 className="text-lg font-semibold mb-4">Статистика</h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Book" size={18} className="text-[var(--accent)]" />
                  <span className="text-sm text-[var(--text-tertiary)]">
                    Прочитано
                  </span>
                </div>
                <p className="text-2xl font-bold">127</p>
              </div>
              <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Flame" size={18} className="text-[var(--accent)]" />
                  <span className="text-sm text-[var(--text-tertiary)]">
                    Серия дней
                  </span>
                </div>
                <p className="text-2xl font-bold">23</p>
              </div>
              <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Clock" size={18} className="text-[var(--accent)]" />
                  <span className="text-sm text-[var(--text-tertiary)]">
                    Среднее время
                  </span>
                </div>
                <p className="text-2xl font-bold">42 мин</p>
              </div>
              <div className="bg-[var(--bg-secondary)] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Target" size={18} className="text-[var(--accent)]" />
                  <span className="text-sm text-[var(--text-tertiary)]">
                    Прогресс цели
                  </span>
                </div>
                <p className="text-2xl font-bold">78%</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-4">Активность</h3>
            <div className="bg-[var(--bg-secondary)] rounded-xl p-4 mb-6">
              <div className="flex justify-between text-sm text-[var(--text-tertiary)] mb-3">
                <span>Янв</span>
                <span>Фев</span>
                <span>Мар</span>
                <span>Апр</span>
                <span>Май</span>
                <span>Июн</span>
              </div>
              <div className="space-y-2">
                {Array.from({ length: 7 }).map((_, weekDay) => (
                  <div key={weekDay} className="flex gap-1">
                    {Array.from({ length: 26 }).map((_, week) => {
                      const intensity = Math.random();
                      return (
                        <div
                          key={week}
                          className="h-3 w-3 rounded-sm transition-colors"
                          style={{
                            backgroundColor:
                              intensity > 0.7
                                ? 'var(--accent)'
                                : intensity > 0.4
                                ? 'rgba(123, 97, 255, 0.5)'
                                : 'var(--bg-tertiary)',
                          }}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {[
                { icon: 'Target', label: 'Цели чтения', screen: 'goals' },
                { icon: 'Settings', label: 'Настройки приложения', screen: 'settings' },
                { icon: 'HelpCircle', label: 'Помощь и поддержка', screen: 'help' },
                { icon: 'LogOut', label: 'Выйти', screen: 'auth' },
              ].map(item => (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.screen === 'auth') {
                      setIsAuthenticated(false);
                      setScreen('auth');
                    } else {
                      setScreen(item.screen as Screen);
                    }
                  }}
                  className="w-full flex items-center justify-between bg-[var(--bg-secondary)] rounded-xl p-4 hover:bg-[var(--bg-tertiary)] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon name={item.icon as any} size={20} />
                    <span>{item.label}</span>
                  </div>
                  <Icon name="ChevronRight" size={20} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Goals Screen */}
      {screen === 'goals' && (
        <div className="fade-in">
          <div className="sticky top-0 z-10 bg-[var(--bg-primary)] border-b border-[var(--divider)] px-4 py-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setScreen('profile')}
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <h1 className="text-2xl font-bold">Цели чтения</h1>
            </div>
          </div>

          <div className="px-4 py-6 space-y-6">
            <div className="bg-[var(--bg-secondary)] rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Ежедневная цель</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-secondary)]">
                    Читать {dailyGoal} минут в день
                  </span>
                  <span className="text-2xl font-bold text-[var(--accent)]">
                    {dailyGoal} мин
                  </span>
                </div>
                <Slider
                  value={[dailyGoal]}
                  onValueChange={val => setDailyGoal(val[0])}
                  min={10}
                  max={120}
                  step={5}
                  className="w-full"
                />
              </div>
            </div>

            <div className="bg-[var(--bg-secondary)] rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Прогресс недели</h3>
              <div className="grid grid-cols-7 gap-2">
                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, i) => (
                  <div key={day} className="text-center">
                    <div className="text-xs text-[var(--text-tertiary)] mb-2">
                      {day}
                    </div>
                    <div
                      className={`h-12 rounded-lg flex items-center justify-center ${
                        i < 5
                          ? 'bg-[var(--accent)]'
                          : 'bg-[var(--bg-tertiary)]'
                      }`}
                    >
                      {i < 5 && <Icon name="Check" size={20} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-[var(--bg-secondary)] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold mb-1">Прочитать 50 статей</h4>
                  <p className="text-sm text-[var(--text-tertiary)]">
                    27 из 50 выполнено
                  </p>
                </div>
                <Progress value={54} className="w-20 h-2" />
              </div>

              <div className="bg-[var(--bg-secondary)] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold mb-1">30 дней подряд</h4>
                  <p className="text-sm text-[var(--text-tertiary)]">
                    23 из 30 выполнено
                  </p>
                </div>
                <Progress value={77} className="w-20 h-2" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Screen */}
      {screen === 'settings' && (
        <div className="fade-in">
          <div className="sticky top-0 z-10 bg-[var(--bg-primary)] border-b border-[var(--divider)] px-4 py-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setScreen('profile')}
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <h1 className="text-2xl font-bold">Настройки</h1>
            </div>
          </div>

          <div className="px-4 py-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Уведомления</h3>
              <div className="bg-[var(--bg-secondary)] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold mb-1">Push-уведомления</h4>
                  <p className="text-sm text-[var(--text-tertiary)]">
                    Напоминания о чтении
                  </p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Чтение</h3>
              <div className="bg-[var(--bg-secondary)] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold mb-1">Автовоспроизведение</h4>
                  <p className="text-sm text-[var(--text-tertiary)]">
                    Автоматическое аудио
                  </p>
                </div>
                <Switch checked={autoPlay} onCheckedChange={setAutoPlay} />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Роль пользователя</h3>
              <div className="bg-[var(--bg-secondary)] rounded-xl p-4 space-y-2">
                {(['Читатель', 'Модератор', 'Разработчик'] as UserRole[]).map(role => (
                  <button
                    key={role}
                    onClick={() => setUserRole(role)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      userRole === role
                        ? 'bg-[var(--accent)] text-white'
                        : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]/70'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help Screen */}
      {screen === 'help' && (
        <div className="fade-in">
          <div className="sticky top-0 z-10 bg-[var(--bg-primary)] border-b border-[var(--divider)] px-4 py-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setScreen('profile')}
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <h1 className="text-2xl font-bold">Помощь и поддержка</h1>
            </div>
          </div>

          <div className="px-4 py-6 space-y-4">
            <div className="bg-[var(--bg-secondary)] rounded-xl p-6 text-center">
              <Icon
                name="MessageCircle"
                size={48}
                className="mx-auto mb-4 text-[var(--accent)]"
              />
              <h3 className="text-lg font-semibold mb-2">Нужна помощь?</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Мы всегда готовы помочь вам разобраться с приложением
              </p>
              <Button className="bg-[var(--accent)] hover:bg-[var(--accent)]/90">
                Написать в поддержку
              </Button>
            </div>

            <div className="space-y-2">
              {[
                { icon: 'FileText', label: 'Часто задаваемые вопросы' },
                { icon: 'Youtube', label: 'Видеоинструкции' },
                { icon: 'Mail', label: 'Email: support@pluck.app' },
                { icon: 'Globe', label: 'Сайт: pluck.app' },
              ].map(item => (
                <div
                  key={item.label}
                  className="bg-[var(--bg-secondary)] rounded-xl p-4 flex items-center gap-3"
                >
                  <Icon
                    name={item.icon as any}
                    size={20}
                    className="text-[var(--accent)]"
                  />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            <div className="bg-[var(--bg-secondary)] rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">О приложении</h3>
              <div className="space-y-2 text-sm text-[var(--text-secondary)]">
                <p>Версия: 1.0.0</p>
                <p>© 2026 Pluck. Все права защищены.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      {screen !== 'auth' && screen !== 'goals' && screen !== 'settings' && screen !== 'help' && screen !== 'library-reader' && (
        <div className="fixed bottom-0 left-0 right-0 bg-[var(--bg-secondary)] border-t border-[var(--divider)] px-6 py-3 z-20">
          <div className="flex justify-around items-center">
            {[
              { id: 'feed', icon: 'Home', label: 'Лента' },
              { id: 'library', icon: 'Library', label: 'Библиотека' },
              { id: 'profile', icon: 'User', label: 'Профиль' },
            ].map(nav => (
              <button
                key={nav.id}
                onClick={() => setScreen(nav.id as Screen)}
                className="flex flex-col items-center gap-1 transition-colors"
              >
                <Icon
                  name={nav.icon as any}
                  size={24}
                  className={
                    screen === nav.id
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--text-tertiary)]'
                  }
                />
                <span
                  className={`text-xs ${
                    screen === nav.id
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--text-tertiary)]'
                  }`}
                >
                  {nav.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
