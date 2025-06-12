import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        age: '',
        mobile: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
            alert(res.data.message);
            navigate('/login-page');
        } catch (err) {
            alert(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-center">Create Account</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input name="username" placeholder="Username" required onChange={handleChange} className="w-full p-2 border rounded" />
                    <input name="name" placeholder="Full Name" required onChange={handleChange} className="w-full p-2 border rounded" />
                    <input name="age" type="number" placeholder="Age" required onChange={handleChange} className="w-full p-2 border rounded" />
                    <input name="mobile" placeholder="Mobile" required onChange={handleChange} className="w-full p-2 border rounded" />
                    <input name="password" type="password" placeholder="Password" required onChange={handleChange} className="w-full p-2 border rounded" />
                    <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 cursor-pointer">
                        Signup
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;
