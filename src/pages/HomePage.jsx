import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ThreadsList from '../components/ThreadList';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import CategoryFilter from '../components/CategoryFilter';

function HomePage() {
  const threads = useSelector((states) => states.threads || []);
  const users = useSelector((states) => states.users || []);
  const authUser = useSelector((states) => states.authUser);
  const [selectedCategory, setSelectedCategory] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const categories = [...new Set(threads.map((thread) => thread.category))];

  const onSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const filteredThreads = threads.filter((thread) => {
    if (selectedCategory === '') {
      return true;
    }
    return thread.category === selectedCategory;
  });

  const threadList = filteredThreads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  return (
    <div className="home-page">
      <div className="home-container">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />
        <div className="threads-section">
          <ThreadsList threads={threadList} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
