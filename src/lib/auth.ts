// src/lib/auth.ts
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"
import bcrypt from "bcrypt"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),  
  providers: [
    CredentialsProvider({  
      name: "credentials",
      credentials: {
        studentNumber: { label: "Student Number", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {

        if (!credentials?.studentNumber || !credentials?.password) {
          throw new Error("Missing required fields")
        }

        const user = await prisma.user.findUnique({
          where: {
            studentNumber: credentials.studentNumber
          }
        })

        if (!user) {
          throw new Error("No user found with this student number")
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password, 
          user.password
        )

        if (!passwordMatch) {
          throw new Error("Incorrect password")
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          studentNumber: user.studentNumber
        }
      }
    })
  ],
  pages: {
    signIn: "/login",  
  },
  session: {
    strategy: "jwt"    
  }
}