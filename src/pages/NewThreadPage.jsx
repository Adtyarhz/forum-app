import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { asyncAddThread } from '../states/threads/action';

function NewThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  const onAddThread = async (event) => {
    event.preventDefault();
    const success = await dispatch(asyncAddThread({ title, category, body }));
    if (success) {
      navigate('/');
    }
  };

  return (
    <section className="new-thread-form">
      <div className="form-card">
        <h2 className="form-title">Create New Thread</h2>
        <form onSubmit={onAddThread} className="form-content">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={onTitleChange}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={onCategoryChange}
            className="input-field"
          />
          <textarea
            placeholder="What's on your mind?"
            value={body}
            onChange={onBodyChange}
            className="input-field textarea-field"
          />
          <button
            type="submit"
            className="btn-primary"
          >
            Create
          </button>
        </form>
      </div>
    </section>
  );
}

export default NewThreadPage;
