import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './root.module.css';

const Root = () => {
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navMenu}>
          <Link to="/" className={styles.navItem}>Home</Link>
          <Link to="/all-recipes" className={styles.navItem}>All Recipes</Link>
          <Link to="/create-update-recipe" className={styles.navItem}>Create A Recipe</Link>
        </div>
      </nav>
      {/* Outlet will render the current route's component here */}
      <Outlet />
    </>
  );
};

export default Root;
