import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ThreadDetail from '../components/ThreadDetail';
import CommentInput from '../components/CommentInput';
import CommentsList from '../components/CommentList';
import { asyncReceiveThreadDetail, asyncAddComment } from '../states/threadDetail/action';
import '../styles/DetailPage.css';

function DetailPage() {
  const { id } = useParams();
  const { threadDetail = null } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onAddComment = (content) => {
    dispatch(asyncAddComment({ threadId: id, content }));
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <section className="detail-page">
      <div className="container">
        <div className="detail-content">
          <ThreadDetail {...threadDetail} />
          <div className="comments-section">
            <CommentInput addComment={onAddComment} />
            <CommentsList comments={threadDetail.comments} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailPage;
