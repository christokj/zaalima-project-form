import React from 'react'

import { useSelector } from 'react-redux';

function HomePage() {

    const user = useSelector((state) => state.auth.user?.username);


    return (
        <div className="p-8 text-center">
            <h1 className="text-3xl font-bold text-blue-700 mb-4">
                Welcome to Zaalima Web Development
            </h1>
            {user && (
                <p className="text-lg text-gray-700">
                    Hello, <span className="font-semibold">{user}</span>! You are successfully logged in.
                </p>
            )}
        </div>
    );
}

export default HomePage