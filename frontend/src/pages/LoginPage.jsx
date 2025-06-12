import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/authSlice';
import { useDispatch } from 'react-redux';

function LoginPage() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);

            localStorage.setItem('token', res.data.token);

            dispatch(loginUser({
                user: { username: res.data.username },
                token: res.data.token,

            }));

            alert('Login successful');
            navigate('/home');
        } catch (err) {
            alert(err.response?.data?.message || 'Login failed');
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        className="col-span-1 p-2 border rounded"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="col-span-1 p-2 border rounded"
                    />
                    <button
                        type="submit"
                        className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    Don’t have an account?{' '}
                    <button onClick={() => navigate('/signup')} className="text-blue-600 underline cursor-pointer">
                        Create one
                    </button>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
