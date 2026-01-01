import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';


type Screen = 'feed' | 'reader' | 'library' | 'profile';

interface Article {
  id: number;
  title: string;
  source: string;
  preview: string;
  readTime: number;
  saved: boolean;
  category: string;
  progress?: number;
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
  },
  {
    id: 2,
    title: 'Будущее искусственного интеллекта: что нас ждёт в 2026 году',
    source: 'Tech Review',
    preview: 'ИИ-модели становятся всё более мощными и доступными. Эксперты предсказывают революцию в медицине, образовании и творческих индустриях...',
    readTime: 8,
    saved: true,
    category: 'Технологии',
  },
  {
    id: 3,
    title: 'Минимализм в дизайне: меньше значит больше',
    source: 'Design Weekly',
    preview: 'Современные интерфейсы стремятся к простоте. Убираем всё лишнее, оставляем только важное — это философия нового поколения дизайнеров...',
    readTime: 6,
    saved: false,
    category: 'Дизайн',
  },
  {
    id: 4,
    title: 'Нейробиология счастья: как мозг создаёт эмоции',
    source: 'Brain Science',
    preview: 'Исследования показывают, что счастье — это не случайность, а результат работы сложных химических процессов в нашем мозге...',
    readTime: 15,
    saved: true,
    category: 'Наука',
  },
];

const libraryItems: Article[] = [
  { ...mockArticles[1], progress: 65 },
  { ...mockArticles[3], progress: 30 },
  { ...mockArticles[0], progress: 100 },
];

const Index = () => {
  const [screen, setScreen] = useState<Screen>('feed');
  const [activeCategory, setActiveCategory] = useState('Для вас');
  const [articles, setArticles] = useState(mockArticles);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [readProgress, setReadProgress] = useState(42);

  const toggleSave = (id: number) => {
    setArticles(prev =>
      prev.map(article =>
        article.id === id ? { ...article, saved: !article.saved } : article
      )
    );
  };

  const categories = ['Для вас', 'Технологии', 'Наука', 'Сохранённое'];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pb-20">
      {/* Feed Screen */}
      {screen === 'feed' && (
        <div className="fade-in">
          {/* Header */}
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

            {/* Categories */}
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

          {/* Articles */}
          <div className="px-4 pt-4 space-y-4">
            {articles.map(article => (
              <div
                key={article.id}
                className="bg-[var(--bg-secondary)] rounded-xl p-4 transition-all hover:bg-[var(--bg-tertiary)] cursor-pointer"
                onClick={() => {
                  setSelectedArticle(article);
                  setScreen('reader');
                }}
              >
                <div className="flex justify-between gap-3">
                  <div className="flex-1">
                    <Badge
                      variant="secondary"
                      className="mb-2 text-[var(--accent)] bg-[var(--accent)]/10 border-0"
                    >
                      {article.source}
                    </Badge>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                      {article.preview}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-[var(--text-tertiary)]">
                        {article.readTime} мин чтения
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={e => {
                          e.stopPropagation();
                          toggleSave(article.id);
                        }}
                      >
                        <Icon
                          name={article.saved ? 'Bookmark' : 'BookmarkPlus'}
                          size={18}
                          className={article.saved ? 'fill-[var(--accent)]' : ''}
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Refresh Button */}
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
          {/* Reader Header */}
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

          {/* Article Content */}
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

          {/* Reader Controls */}
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
          {/* Library Header */}
          <div className="sticky top-0 z-10 bg-[var(--bg-primary)] border-b border-[var(--divider)] px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">Моя библиотека</h1>
              <Button variant="ghost" size="sm">
                Изменить
              </Button>
            </div>

            {/* Filter Tabs */}
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

          {/* Library Grid */}
          <div className="px-4 pt-4 space-y-3">
            {libraryItems.map(item => (
              <div
                key={item.id}
                className="bg-[var(--bg-secondary)] rounded-xl p-4 hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
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

      {/* Profile Screen */}
      {screen === 'profile' && (
        <div className="fade-in">
          {/* Profile Header */}
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
              </div>
              <Button variant="ghost" size="icon">
                <Icon name="Settings" size={20} />
              </Button>
            </div>
          </div>

          {/* Stats */}
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

            {/* Activity Chart */}
            <h3 className="text-lg font-semibold mb-4">Активность за год</h3>
            <div className="bg-[var(--bg-secondary)] rounded-xl p-4 mb-6">
              <div className="grid grid-cols-12 gap-1">
                {Array.from({ length: 365 }).map((_, i) => {
                  const intensity = Math.random();
                  return (
                    <div
                      key={i}
                      className="aspect-square rounded-sm transition-colors"
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
            </div>

            {/* Menu */}
            <div className="space-y-2">
              {[
                { icon: 'Target', label: 'Цели чтения' },
                { icon: 'Settings', label: 'Настройки приложения' },
                { icon: 'HelpCircle', label: 'Помощь и поддержка' },
                { icon: 'LogOut', label: 'Выйти' },
              ].map(item => (
                <button
                  key={item.label}
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

      {/* Bottom Navigation */}
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
    </div>
  );
};

export default Index;