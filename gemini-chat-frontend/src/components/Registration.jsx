import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SplineScene from './landing/SplineScene.jsx';
import axios from "axios";

export default function Registration() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.username.trim()) newErrors.username = "Username is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post("https://thomas-chatbot.onrender.com/register", {
                username: formData.username,
                password: formData.password,
            });

            if (response.status === 200 || response.status === 201) {
                navigate('/registrationSuccess');
            } else {
                setErrors({ general: "Registration failed. Try again." });
            }
        } catch (err) {
            setErrors({ general: "An error occurred. Please try again later." });
        }
    };

    return (
        <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
            {/* 🔲 Solid Dark Background */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#000',
                    zIndex: 0
                }}
            />

            {/* 🎮 Spline Background */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    pointerEvents: 'auto',
                }}
            >
                <SplineScene
                    style={{
                        width: '100%',
                        height: '100%',
                        transform: 'scale(1.3)',
                    }}
                />
            </div>

            {/* 🧾 Form Layer */}
            <div className="registration-container" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 2,
                pointerEvents: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px'
            }}>
                <form className="registration-form" onSubmit={handleSubmit} style={{ pointerEvents: 'auto' }}>
                    <h2><span className="highlight">Register</span></h2>

                    {errors.general && <p className="error">{errors.general}</p>}

                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                    />
                    {errors.username && <p className="error">{errors.username}</p>}

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />
                    {errors.password && <p className="error">{errors.password}</p>}

                    <label>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

                    <button type="submit">Sign Up</button>

                    <p className="login-link">
                        Already have an account? <Link to="/login">Login here</Link>
                    </p>
                </form>
            </div>

            <style>{`
                .registration-form {
                    background: rgba(0, 0, 0, 0.65);
                    color: white;
                    padding: 40px 30px;
                    border-radius: 12px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.5);
                    width: 100%;
                    max-width: 420px;
                    display: flex;
                    flex-direction: column;
                    backdrop-filter: blur(6px);
                }

                .registration-form h2 {
                    text-align: center;
                    margin-bottom: 25px;
                    font-size: 28px;
                    font-weight: bold;
                    color: #fff;
                    letter-spacing: 1px;
                }

                .highlight {
                    color: #a855f7;
                    font-size: 32px;
                }

                .registration-form label {
                    margin-top: 15px;
                    font-weight: 500;
                    color: #ddd;
                }

                .registration-form input {
                    padding: 10px;
                    margin-top: 5px;
                    border: 1px solid #444;
                    border-radius: 6px;
                    background: #111;
                    color: white;
                    font-size: 16px;
                }

                .registration-form button {
                    margin-top: 25px;
                    padding: 12px;
                    background-color: #a855f7;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                }

                .registration-form button:hover {
                    background-color: #9333ea;
                }

                .error {
                    color: #f87171;
                    font-size: 14px;
                    margin-top: 5px;
                }

                .login-link {
                    margin-top: 20px;
                    text-align: center;
                    font-size: 14px;
                    color: #aaa;
                }

                .login-link a {
                    color: #a855f7;
                    text-decoration: none;
                    font-weight: bold;
                }

                .login-link a:hover {
                    text-decoration: underline;
                }
            `}</style>
        </div>
    );
}
