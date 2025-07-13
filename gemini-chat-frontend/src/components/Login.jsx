import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SplineScene from "./landing/SplineScene.jsx";
import axios from "axios";

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
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

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post("https://thomas-chatbot.onrender.com/authenticate", {
                username: formData.username,
                password: formData.password
            });

            if (response.status === 200 && response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/chatbot');
            } else {
                setErrors({ general: "Login failed. Try again." });
            }
        } catch (err) {
            setErrors({ general: "Invalid credentials" });
        }
    };

    return (
        <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
            {/* 🔲 Dark Background */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#000',
                    zIndex: 0,
                }}
            />

            {/* 🎮 Spline Scene */}
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

            {/* 🧾 Login Form Layer */}
            <div
                className="login-container"
                style={{
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
                }}
            >
                <form
                    className="login-form"
                    onSubmit={handleSubmit}
                    style={{ pointerEvents: 'auto' }}
                >
                    <h2><span className="highlight">Login</span></h2>

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

                    <button type="submit">Login</button>

                    <p className="register-link">
                        Don't have an account? <Link to="/register">Register here</Link>
                    </p>
                </form>
            </div>

            <style>{`
                .login-form {
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

                .login-form h2 {
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

                .login-form label {
                    margin-top: 15px;
                    font-weight: 500;
                    color: #ddd;
                }

                .login-form input {
                    padding: 10px;
                    margin-top: 5px;
                    border: 1px solid #444;
                    border-radius: 6px;
                    background: #111;
                    color: white;
                    font-size: 16px;
                }

                .login-form button {
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

                .login-form button:hover {
                    background-color: #9333ea;
                }

                .error {
                    color: #f87171;
                    font-size: 14px;
                    margin-top: 5px;
                }

                .register-link {
                    margin-top: 20px;
                    text-align: center;
                    font-size: 14px;
                    color: #aaa;
                }

                .register-link a {
                    color: #a855f7;
                    text-decoration: none;
                    font-weight: bold;
                }

                .register-link a:hover {
                    text-decoration: underline;
                }
            `}</style>
        </div>
    );
}
