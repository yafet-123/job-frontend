import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // `/admin` requires admin role
      if (req.nextUrl.pathname === "/Admin") {
        return token?.role === "admin"
      }
      // `/me` only requires the user to be logged in
      return !!token
    },
  },
})


export const config = { matcher: [] };