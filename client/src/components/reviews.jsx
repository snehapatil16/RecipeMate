import React from 'react';
import axios from 'axios';
import styles from './reviews.module.scss';

const Review = ({ review, setReviews, setIsEditing, setEditReview }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await axios.delete(`/api/recipes/${review.recipeId}/reviews/${review._id}`);
        setReviews(prev => prev.filter(r => r._id !== review._id));
      } catch (error) {
        console.error('Error deleting review', error);
      }
    }
  };

  const handleEdit = () => {
    // Set the editing state to true and provide the current review to be edited
    setIsEditing(true);
    setEditReview(review);
  };

  return (
    <div className={styles.review}>
      <p className={styles.reviewUser}>Reviewed by: {review.user}</p>
      <p className={styles.reviewDescription}>{review.description}</p>
      <p className={styles.reviewRating}>Rating: {review.rating}</p>
      <p className={styles.reviewDate}>Date: {new Date(review.createdAt).toLocaleDateString()}</p>
      <button onClick={() => handleEdit(review)} className={styles.reviewEditButton}>Edit Review</button>
      <button onClick={handleDelete} className={styles.reviewDeleteButton}>Delete Review</button>
    </div>
  );
};

export default Review;