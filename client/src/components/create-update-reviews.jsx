import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './create-update-reviews.module.scss';

const ReviewForm = ({ recipeId, setReviews, isEditing, setIsEditing, editReview }) => {
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [user, setUser] = useState(''); // New state for the user

  useEffect(() => {
    if (isEditing && editReview) {
      // If editing, pre-fill the form with the existing review data
      setDescription(editReview.description);
      setRating(editReview.rating);
      setUser(editReview.user);
    }
  }, [isEditing, editReview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const reviewData = {
      description: formData.get('description'),
      rating: Number(formData.get('rating')),
      user: formData.get('user')
    };

    try {
      let response;
      if (isEditing && editReview) {
        // If we are editing, send a PUT request
        response = await axios.put(`/api/recipes/${recipeId}/reviews/${editReview._id}`, reviewData);
      } else {
        // If we are creating a new review, send a POST request
        response = await axios.post(`/api/recipes/${recipeId}/reviews`, reviewData);
      }
  
      // Call setReviews function with the updated data
      if (response.status === 200 || response.status === 201) {
        if (isEditing) {
          // Call setReviews from the props, which should update the state in the parent component
          setReviews(prevReviews => prevReviews.map(r => r._id === editReview._id ? response.data : r));
        } else {
          setReviews(prevReviews => [...prevReviews, response.data]);
        }
        if(isEditing) {
          setIsEditing(false);
        }
        alert('Review saved successfully!');
        e.target.reset(); // Reset form fields
      } else {
        throw new Error(`Server responded with ${response.status}`);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert(`An error occurred: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.reviewForm}>
      <h3 className={styles.reviewFormTitle}>Add a Review</h3>
      <label htmlFor="user" className={styles.reviewLabel}>User:</label>
      <input
        name="user"
        id="user"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        required
        className={styles.reviewInput}
      />

      <label htmlFor="description" className={styles.reviewLabel}>Review Description:</label>
      <textarea
        name="description"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className={styles.reviewTextarea}
      />

      <label htmlFor="rating" className={styles.reviewLabel}>Rating:</label>
      <input
        name="rating"
        type="number"
        id="rating"
        value={rating}
        min="1"
        max="5"
        onChange={(e) => setRating(e.target.value)}
        required
        className={styles.reviewInput}
      />

      <button type="submit" className={styles.submitButton}>Submit Review</button>
    </form>
  );
};

export default ReviewForm;

