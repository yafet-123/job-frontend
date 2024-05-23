import { useState, useEffect } from 'react';
import { signIn, getCsrfToken } from 'next-auth/react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import { MainHeader } from '../../components/common/MainHeader';
import React from 'react'
import Link from 'next/link'
import { getSession } from "next-auth/react";


export default function SignIn({ csrfToken }) {
    const router = useRouter();
    const [error, setError] = useState(null);
    const { status, data } = useSession();

        return (
            <React.Fragment>
                <MainHeader title="Login" />
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={Yup.object({
                        username: Yup.string().required('Please enter your username'),
                        password: Yup.string().required('Please enter your password'),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        const res = await signIn('credentials', {
                            username: values.username,
                            password: values.password,
                            callbackUrl: "/Admin"
                        });
                        console.log(res)
                        if (res?.error) {
                            setError(res.error);
                        } else {
                            setError(null);
                        }
                        if (res.url) router.push(res.url);
                        setSubmitting(false);
                    }}
                >
                    {(formik) => (
                      <form onSubmit={formik.handleSubmit}>
                        <div className="bg-gray-900 flex items-center justify-center min-h-screen">
                            <div className="bg-gray-800 text-white py-10 px-20 rounded-3xl shadow-2xl animate-bg text-center">
                                <input name="csrfToken" type="hidden" defaultValue={csrfToken}/>
                                <div className="text-red-400 text-md text-center rounded p-2">
                                    {error}
                                </div>
                                <h1 class="text-2xl mb-6">Login</h1>
                                <div className="mb-4">
                                    <label htmlFor="username" className="uppercase text-sm text-white font-bold">
                                        User Name
                                        <Field
                                            name="username"
                                            aria-label="enter your username"
                                            aria-required="true"
                                            type="text"
                                            className="block text-black w-full mx-auto my-2 p-3 border-4 border-blue-500 rounded-full focus:outline-none focus:w-full focus:border-cyan-300 transition-all duration-300"
                                        />
                                    </label>

                                    <div className="text-red-600 text-sm">
                                        <ErrorMessage name="username" />
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="password" className="uppercase text-sm text-white font-bold">
                                        password
                                        <Field
                                            name="password"
                                            aria-label="enter your password"
                                            aria-required="true"
                                            type="password"
                                            className="block text-black w-full mx-auto my-2 p-3 border-4 border-blue-500 rounded-full focus:outline-none focus:w-full focus:border-cyan-300 transition-all duration-300"
                                        />
                                    </label>

                                    <div className="text-red-600 text-sm">
                                        <ErrorMessage name="password" />
                                    </div>
                                </div>

                                <Link href="/Teacher/Forgotpassword" >
                                    <a
                                        className="font-bold flex justify-end text-lg lg:text-xl text-red-600 mb-5"
                                    >
                                        forgot password?
                                    </a>
                                </Link>

                                <div className="flex items-center justify-center">
                                    <button
                                        type="submit"
                                        className={formik.isSubmitting ? 'bg-green-200 text-gray-100 p-3 rounded-lg w-full' : 'block w-3/4 mx-auto my-4 p-3 bg-transparent border-4 border-green-500 rounded-full text-white cursor-pointer hover:bg-green-500 transition-all duration-300'} 
                                    >
                                        {formik.isSubmitting ? 'Please wait...' : 'Sign In'}
                                    </button>
                                </div>
                            </div>
                        </div>
                      </form>
                    )}
                </Formik>
            </React.Fragment>
        );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const userRole = await session?.user?.role
    if (userRole == 'admin') {
        return {
            redirect: {
                destination: '/Admin', // Redirect to the error page for unauthorized access
                permanent: false,
            },
        };
    }
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    };
}