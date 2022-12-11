import NextAuth, { NextAuthOptions } from "next-auth"
import jwt from "jsonwebtoken"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
    session:{
        strategy:"jwt",
    },
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                
            },
            authorize(credentials, req) {
                const {username, password} = credentials
                console.log(credentials)
                // const data = await axios.post(`/api/login`,{
                //     "username": username,
                //     "password": password
                // }).then(function (response) {
                //     console.log(response.data)
                // }).catch(function (error) {
                //     throw new Error('Invalid Credentials')
                // });

                if (username !== "yafet" || password !== "1234"){
                    throw new Error('Invalid Credentials')
                }

                return{
                    id:"1234",
                    name:"yafet",

                };
            },
        }),
    ],
    pages:{
        signIn: "/auth/signin",
    }
})
