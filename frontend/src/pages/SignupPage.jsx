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

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
        } else if (!/^[a-zA-Z0-9]{4,}$/.test(formData.username)) {
            newErrors.username = "Min 4 chars, only letters and numbers";
        }

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (!/^[a-zA-Z\s]{3,}$/.test(formData.name)) {
            newErrors.name = "Only letters, min 3 characters";
        }

        const age = Number(formData.age);
        if (!age || age < 10 || age > 100) {
            newErrors.age = "Age must be between 10 and 100";
        }

        if (!/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = "Mobile must be 10 digits";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (!/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(formData.password)) {
            newErrors.password = "Min 6 chars, must include letter & number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

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
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                    </div>

                    <div>
                        <input
                            name="name"
                            placeholder="Full Name"
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div>
                        <input
                            name="age"
                            type="number"
                            placeholder="Age"
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                        {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
                    </div>

                    <div>
                        <input
                            name="mobile"
                            placeholder="Mobile"
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                        {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                    </div>

                    <div>
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                    >
                        Signup
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;
