import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'my-project',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: 'username',
          type: 'text',
          placeholder: '',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const payload = {
          username: credentials.username,
          password: credentials.password,
        };

        console.log(payload.password)
        const res = await axios.post(`http://localhost:3000/api/login`,{
            "username": payload.username,
            "password": payload.password
        }).then(function (response) {
            return response.data
        }).catch(function (error) {
            throw new Error('Invalid Credentials')
        });
      },
    }),
    // ...add more providers here
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
          accessToken: user.data.token,
          refreshToken: user.data.refreshToken,
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