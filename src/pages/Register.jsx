import React, { useState } from 'react';

const CreateAccountForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // State to handle hover effect
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Create Account</h2>
        <div style={styles.formGroup}>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            style={styles.input}
            required
          />
        </div>
        <button
          type="submit"
          style={isHovered ? styles.buttonHover : styles.button}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Create Account
        </button>
        <p style={styles.signInText}>
          Already have an account? <a href="/login" style={styles.link}>Sign in here</a>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
  },
  form: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '450px',
    height: '500px',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '2rem',
    fontSize: '2rem',
    fontWeight: '600',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#e33d3d',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1rem',
    width: '100%',
    fontSize: '1rem',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  buttonHover: {
    backgroundColor: '#ff0000', // Bright red when hovered
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1rem',
    width: '100%',
    fontSize: '1rem',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  signInText: {
    marginTop: '1.5rem',
    fontSize: '0.875rem',
  },
  link: {
    color: '#007BFF',
    textDecoration: 'none',
  },
  linkHover: {
    textDecoration: 'underline',
  }
};

export default CreateAccountForm;
