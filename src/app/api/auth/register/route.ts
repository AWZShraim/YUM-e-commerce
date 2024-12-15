import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { studentNumber, email, name, password, phoneNumber, address } = body

    // Validating email domain
    if (!email.endsWith('@yorku.ca') && !email.endsWith('@my.yorku.ca')) {
      return NextResponse.json(
        { message: 'Must use a York University email address' },
        { status: 400 }
      )
    }

    // Checking if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { studentNumber },
          { email }
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'Student number or email already registered' },
        { status: 400 }
      )
    }

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Creating user
    const user = await prisma.user.create({
      data: {
        studentNumber,
        email,
        name,
        password: hashedPassword,
        phoneNumber: phoneNumber || null,
        address: address || null,
      },
    })

    return NextResponse.json(
      { message: 'Account created successfully' },
      { status: 201 }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    )
  }
}