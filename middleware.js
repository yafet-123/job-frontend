import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  	function middleware(req) {
    	return NextResponse.rewrite(new URL("/Admin", req.url));
  	},
  	{
    	callbacks: {
      		authorized({ token }) {
        		return token?.role === "admin";
      		},
    	},
  	}
);

export const config = { matcher: ["/Admin"] };