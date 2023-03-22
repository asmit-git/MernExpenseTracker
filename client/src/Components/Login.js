import axios from 'axios';
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useAuth } from '../Context/Auth';

const Login = () => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
                email,
                password,
            });
            if (res.data && res.data.success) {
                toast.success(res.data && res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate('/')
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }
    return (
        <>
            <div className="m-auto xl:container px-12 sm:px-0 mx-auto">
                <div className="mx-auto h-full sm:w-max my-20">
                    <div className="m-auto py-12">
                        <div className="mt-12 rounded-3xl border bg-gray-50 dark:border-gray-700 dark:bg-gray-800 -mx-6 sm:-mx-10 p-8 sm:p-10">
                            <h3 className="text-2xl font-semibold text-gray-700 dark:text-white">Login to your account</h3>
                            <form onSubmit={handleSubmit} className="mt-10 space-y-8 dark:text-white">
                                <div>
                                    <div className="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-purple-400 dark:before:bg-purple-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                                        <input
                                            type="email"
                                            placeholder="Your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition" />
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-purple-400 dark:before:bg-purple-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Your password"
                                            className="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition" />
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" className="w-full rounded-full bg-purple-500 dark:bg-purple-400 h-11 flex items-center justify-center px-6 py-3 transition hover:bg-purple-600 focus:bg-purple-600 active:bg-purple-800">
                                        <span className="text-base font-semibold text-white dark:text-gray-900">Login</span>
                                    </button>
                                    <NavLink to="/register" type="reset" className="-ml-3 w-max p-3">
                                        <span className="text-sm tracking-wide text-fuchsia-600 dark:text-fuchsia-400">Don't have and account ? Signup</span>
                                    </NavLink>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login