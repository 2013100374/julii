import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import FacebookProvider from "next-auth/providers/facebook";

export const handler = (req, res) => {
    const providers = [];

    if (process.env.GOOGLE_ID && process.env.GOOGLE_SECRET) {
        providers.push(
            GoogleProvider({
                clientId: process.env.GOOGLE_ID,
                clientSecret: process.env.GOOGLE_SECRET,
                authorization: {
                    params: {
                        prompt: "consent",
                        access_type: "offline",
                        response_type: "code"
                    }
                }
            })
        )
    }

    if(process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET) {
        providers.push(
            LinkedInProvider({
                clientId: process.env.LINKEDIN_CLIENT_ID,
                clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
                client: { token_endpoint_auth_method: "client_secret_post" },
                scope: "r_liteprofile r_emailaddress",
                issuer: "https://www.linkedin.com",
                userinfo: {
                    url: "https://api.linkedin.com/v2/userinfo",
                },
                tokenUri: "https://www.linkedin.com/oauth/v2/accessToken",
                wellKnown: "https://www.linkedin.com/oauth/.well-known/openid-configuration",
                authorization: {
                    url: "https://www.linkedin.com/oauth/v2/authorization",
                    params: {
                        scope: "profile email openid",
                        prompt: "consent",
                        access_type: "offline",
                        response_type: "code",
                    },
                },
                token: {
                    url: "https://www.linkedin.com/oauth/v2/accessToken",
                },
                jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
                async profile(profile) {
                    return {
                        id: profile.sub,
                        name: profile.name,
                        firstname: profile.given_name,
                        lastname: profile.family_name,
                        email: profile.email,
                    };
                },
            })
        );
    }

    if (process.env?.FACEBOOK_CLIENT_ID && process.env?.FACEBOOK_CLIENT_SECRET) {
        providers.push(
            FacebookProvider({
                clientId: process.env.FACEBOOK_CLIENT_ID,
                clientSecret: process.env.FACEBOOK_CLIENT_SECRET
            })
        );
    }

    return NextAuth(req, res, {
        providers,
        pages: {
            signIn: '/login'
        },
        jwt: {
            maxAge: 60 * 60 * 24 * 30,
        },
        session: {
            strategy: 'jwt',
            maxAge: 30 * 24 * 60 * 60,
        },
        secret: process.env.NEXTAUTH_SECRET || "token22",
        callbacks: {
            async redirect({ url, baseUrl }) {
                return baseUrl  + process.env.NEXT_PUBLIC_AUTH_PREFIX + "/validate";
            },

            session: async ({ session, token }) => {
                session.accessToken = token.accessToken;
                return session;
            },

            async signIn({ account, profile }) {
                return true;
            },

            jwt: async ({ token, user, account }) => {
                if (account && account.access_token) {
                    // set need things for backend validation
                    token.provider = account.provider;
                    token.accessToken = account.access_token;
                }
                return token
            },
        },
    })
};
export { handler as GET, handler as POST };