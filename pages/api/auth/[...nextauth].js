import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export default NextAuth({
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'my-project',
            credentials: {},
            async authorize(credentials, req) {
                const payload = {
                    username: credentials.username,
                    password: credentials.password,
                };
                let user
                const res = await axios.post(`http://localhost:3000/api/login`,{
                    "username": payload.username,
                    "password": payload.password
                }).then(function (response) {
                    user = response.data
                    
                }).catch(function (error) {
                    throw new Error('Invalid Credentials')
                });

                return user
            },
        }),
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/auth/signin',
    },
    
});