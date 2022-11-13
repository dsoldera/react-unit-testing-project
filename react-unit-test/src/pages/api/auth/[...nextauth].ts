import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { fauna } from '../../../services/fauna';
import { query as Q } from 'faunadb';

export default NextAuth({  
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: { params: { scope: 'read:user' } }
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      //console.log(user, account, email, credentials )
      const { email } = user;
      //console.log('email', email);

      try {
        // await fauna.query(
        //   Q.Create(
        //     Q.Collection('users'),
        //     { data: {email}}
        //   )
        // )
        await fauna.query(
          Q.If(
            Q.Not(
              Q.Exists(
                Q.Match(
                  Q.Index('user_by_email'),
                  Q.Casefold(user.email)
                )
              )
            ),
            Q.Create(
              Q.Collection('users'), 
              { data: { email } }),
            Q.Get(
              Q.Match(
                Q.Index('user_by_email'),
                Q.Casefold(user.email)
              )
            )
          )
        );
        console.log('it work!!!', user.email);
        return true
      } catch (e) {
        console.log('error', e);
        return false;
      }

    },
  }
});