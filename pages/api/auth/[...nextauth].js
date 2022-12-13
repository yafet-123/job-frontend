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
                console.log(payload.username)
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
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                return {
                    ...token,
                    accessToken: user.token,
                    refreshToken: user.refreshToken,
                };
            }
            return token;
        },

        async session({ session, token }) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.accessTokenExpires = token.accessTokenExpires;
            return session;
        },
    },
    theme: {
        colorScheme: 'auto', // "auto" | "dark" | "light"
        brandColor: '', // Hex color code #33FF5D
        logo: '/logo.png', // Absolute URL to image
    },
  // Enable debug messages in the console if you are having problems
    debug: process.env.NODE_ENV === 'development',
});