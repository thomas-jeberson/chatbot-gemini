import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react'; // Still using icon here

export default function RegistrationSuccess() {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate('/login');
    };

    return (
        <div className="success-container">
            <div className="success-box">
                <CheckCircle size={64} color="#22c55e" className="success-icon" />
                <h2 className="success-title">Registration Successful</h2>
                <p className="success-message">Your account has been created successfully.</p>

                <button className="login-button" onClick={handleLoginRedirect}>
                    Go to Login
                </button>
            </div>

            {/* Inline CSS */}
            <style>{`
                .success-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background: linear-gradient(to right, #8e2de2, #4a00e0);
                    padding: 20px;
                }

                .success-box {
                    background: white;
                    padding: 40px 30px;
                    border-radius: 12px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                    max-width: 400px;
                    text-align: center;
                    width: 100%;
                }

                .success-icon {
                    margin: 0 auto 20px auto;
                }

                .success-title {
                    font-size: 24px;
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 10px;
                }

                .success-message {
                    color: #555;
                    font-size: 16px;
                    margin-bottom: 20px;
                }

                .login-button {
                    width: 100%;
                    padding: 12px;
                    background-color: #4a00e0;
                    color: white;
                    font-size: 16px;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                }

                .login-button:hover {
                    background-color: #3a00b8;
                }
            `}</style>
        </div>
    );
}
