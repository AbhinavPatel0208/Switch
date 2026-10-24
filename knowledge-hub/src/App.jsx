import { useState, useCallback, useEffect } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import CardGrid from './components/cards/CardGrid';
import FilterBar from './components/filters/FilterBar';
import DetailModal from './components/detail/DetailModal';
import StatsBar from './components/dashboard/StatsBar';
import { useKnowledgeBase } from './hooks/useKnowledgeBase';
import { useTheme } from './hooks/useTheme';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const {
    allTopics,
    filteredTopics,
    hierarchicalTopics,
    availableSubcategories,
    allTags,
    activeCategory,
    setActiveCategory,
    activeSubcategory,
    setActiveSubcategory,
    activeDifficulty,
    setActiveDifficulty,
    activeStatus,
    setActiveStatus,
    activeTags,
    toggleTag,
    searchQuery,
    setSearchQuery,
    selectedTopic,
    setSelectedTopic,
    clearFilters,
    hasActiveFilters,
    updateTopicStatus,
    toggleTopicCompleted,
    viewMode,
    setViewMode,
  } = useKnowledgeBase();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && !selectedTopic) {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedTopic]);

  const currentIndex = selectedTopic
    ? filteredTopics.findIndex(t => t.id === selectedTopic.id)
    : -1;

  const navigateTopic = useCallback((direction) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < filteredTopics.length) {
      setSelectedTopic(filteredTopics[newIndex]);
    }
  }, [currentIndex, filteredTopics, setSelectedTopic]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060a06] text-slate-800 dark:text-[#b4ffb4] transition-colors duration-200 selection:bg-[#00ff41] selection:text-black dark:selection:bg-[#00ff41] dark:selection:text-black">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
        theme={theme}
        onToggleTheme={toggleTheme}
        allTopics={allTopics}
        onTopicSelect={setSelectedTopic}
      />

      <div className="flex max-w-[1600px] mx-auto">
        <Sidebar
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          allTopics={allTopics}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          <StatsBar allTopics={allTopics} />

          <div className="mb-8">
            <FilterBar
              activeCategory={activeCategory}
              activeSubcategory={activeSubcategory}
              onSubcategoryChange={setActiveSubcategory}
              availableSubcategories={availableSubcategories}
              activeDifficulty={activeDifficulty}
              onDifficultyChange={setActiveDifficulty}
              activeStatus={activeStatus}
              onStatusChange={setActiveStatus}
              activeTags={activeTags}
              onToggleTag={toggleTag}
              allTags={allTags}
              hasActiveFilters={hasActiveFilters}
              onClearFilters={clearFilters}
              topicCount={filteredTopics.length}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>

          <CardGrid
            topics={filteredTopics}
            hierarchicalTopics={hierarchicalTopics}
            onCardClick={setSelectedTopic}
            onToggleCompleted={toggleTopicCompleted}
            viewMode={viewMode}
          />
        </main>
      </div>

      {selectedTopic && (
        <DetailModal
          topic={selectedTopic}
          onClose={() => setSelectedTopic(null)}
          onPrev={() => navigateTopic(-1)}
          onNext={() => navigateTopic(1)}
          hasPrev={currentIndex > 0}
          hasNext={currentIndex < filteredTopics.length - 1}
          onStatusChange={updateTopicStatus}
          onToggleCompleted={toggleTopicCompleted}
        />
      )}
    </div>
  );
}

export default App;
