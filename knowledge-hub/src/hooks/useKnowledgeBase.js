import { useState, useMemo, useEffect } from 'react';
import Fuse from 'fuse.js';

// Import all JSON data files
import frontendData from '../data/frontend.json';
import systemDesignData from '../data/system-design.json';
import javaSpringData from '../data/java-spring.json';
import dataEngineeringData from '../data/data-engineering.json';
import microservicesData from '../data/microservices.json';
import dsaData from '../data/dsa.json';
import databasesData from '../data/databases.json';
import devopsCloudData from '../data/devops-cloud.json';
import interviewQuestionsData from '../data/interview-questions.json';

const STORAGE_KEY = 'knowledge_hub_topic_statuses_v2';

const allDataFiles = [
  frontendData,
  systemDesignData,
  javaSpringData,
  dataEngineeringData,
  microservicesData,
  dsaData,
  databasesData,
  devopsCloudData,
  interviewQuestionsData,
];

export function useKnowledgeBase() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSubcategory, setActiveSubcategory] = useState('all');
  const [activeDifficulty, setActiveDifficulty] = useState('all');
  const [activeStatus, setActiveStatus] = useState('all');
  const [activeTags, setActiveTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [viewMode, setViewMode] = useState('grouped'); // 'grouped' | 'flat'

  // Load user status overrides from localStorage
  const [statusOverrides, setStatusOverrides] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Persist status overrides whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(statusOverrides));
    } catch (e) {
      console.error('Failed to save topic status to localStorage', e);
    }
  }, [statusOverrides]);

  // Flatten all topics and merge with localStorage status overrides
  const allTopics = useMemo(() => {
    return allDataFiles.flatMap(file => file.topics || []).map(topic => {
      const userStatus = statusOverrides[topic.id];
      return userStatus ? { ...topic, status: userStatus } : topic;
    });
  }, [statusOverrides]);

  // Keep selectedTopic in sync if its status changed
  useEffect(() => {
    if (selectedTopic) {
      const updated = allTopics.find(t => t.id === selectedTopic.id);
      if (updated && updated.status !== selectedTopic.status) {
        setSelectedTopic(updated);
      }
    }
  }, [allTopics, selectedTopic]);

  // Available subcategories for the current category selection
  const availableSubcategories = useMemo(() => {
    const list = activeCategory === 'all'
      ? allTopics
      : allTopics.filter(t => t.category === activeCategory);
    const subSet = new Set();
    list.forEach(t => {
      if (t.subcategory) subSet.add(t.subcategory);
    });
    return Array.from(subSet).sort();
  }, [allTopics, activeCategory]);

  // When changing category, reset subcategory
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setActiveSubcategory('all');
  };

  // Update a single topic status
  const updateTopicStatus = (topicId, newStatus) => {
    setStatusOverrides(prev => ({
      ...prev,
      [topicId]: newStatus,
    }));
  };

  // Quick toggle completed/not-started
  const toggleTopicCompleted = (topicId) => {
    const currentTopic = allTopics.find(t => t.id === topicId);
    if (!currentTopic) return;
    const nextStatus = currentTopic.status === 'completed' ? 'not-started' : 'completed';
    updateTopicStatus(topicId, nextStatus);
  };

  // Reset all statuses to defaults
  const resetAllStatuses = () => {
    setStatusOverrides({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  // Build Fuse.js search index
  const fuse = useMemo(() => {
    return new Fuse(allTopics, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'summary', weight: 0.2 },
        { name: 'tags', weight: 0.2 },
        { name: 'content', weight: 0.1 },
        { name: 'subcategory', weight: 0.1 },
        { name: 'category', weight: 0.1 },
      ],
      threshold: 0.3,
      includeScore: true,
    });
  }, [allTopics]);

  // Apply all filters
  const filteredTopics = useMemo(() => {
    let results = allTopics;

    // Search filter
    if (searchQuery.trim()) {
      const searchResults = fuse.search(searchQuery);
      results = searchResults.map(r => r.item);
    }

    // Category filter
    if (activeCategory !== 'all') {
      results = results.filter(t => t.category === activeCategory);
    }

    // Subcategory filter
    if (activeSubcategory !== 'all') {
      results = results.filter(t => t.subcategory === activeSubcategory);
    }

    // Difficulty filter
    if (activeDifficulty !== 'all') {
      results = results.filter(t => t.difficulty === activeDifficulty);
    }

    // Status filter
    if (activeStatus !== 'all') {
      results = results.filter(t => t.status === activeStatus);
    }

    // Tags filter
    if (activeTags.length > 0) {
      results = results.filter(t =>
        activeTags.every(tag => t.tags?.includes(tag))
      );
    }

    return results;
  }, [allTopics, searchQuery, activeCategory, activeSubcategory, activeDifficulty, activeStatus, activeTags, fuse]);

  // Group filtered topics by category -> subcategory for the hierarchical view
  const hierarchicalTopics = useMemo(() => {
    const categoryMap = new Map();

    filteredTopics.forEach(topic => {
      if (!categoryMap.has(topic.category)) {
        categoryMap.set(topic.category, new Map());
      }
      const subMap = categoryMap.get(topic.category);
      const subName = topic.subcategory || 'General';
      if (!subMap.has(subName)) {
        subMap.set(subName, []);
      }
      subMap.get(subName).push(topic);
    });

    // Convert map to structured array
    const result = [];
    categoryMap.forEach((subMap, categoryName) => {
      const subcategories = [];
      subMap.forEach((topics, subcategoryName) => {
        subcategories.push({
          name: subcategoryName,
          topics,
        });
      });
      result.push({
        category: categoryName,
        subcategories,
        totalTopics: subcategories.reduce((acc, sub) => acc + sub.topics.length, 0),
      });
    });

    return result;
  }, [filteredTopics]);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set();
    allTopics.forEach(topic => {
      topic.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [allTopics]);

  const toggleTag = (tag) => {
    setActiveTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setActiveCategory('all');
    setActiveSubcategory('all');
    setActiveDifficulty('all');
    setActiveStatus('all');
    setActiveTags([]);
    setSearchQuery('');
  };

  const hasActiveFilters = activeCategory !== 'all' || activeSubcategory !== 'all' ||
    activeDifficulty !== 'all' || activeStatus !== 'all' || activeTags.length > 0 || searchQuery.trim() !== '';

  return {
    allTopics,
    filteredTopics,
    hierarchicalTopics,
    availableSubcategories,
    allTags,
    activeCategory,
    setActiveCategory: handleCategoryChange,
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
    resetAllStatuses,
    viewMode,
    setViewMode,
  };
}
