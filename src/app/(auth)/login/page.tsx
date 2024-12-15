'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const searchParams = useSearchParams()
  const registered = searchParams.get('registered')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    
    try {
      const res = await signIn('credentials', {
        studentNumber: formData.get('studentNumber'),
        password: formData.get('password'),
        redirect: false,
      })

      if (res?.error) {
        setError('Invalid credentials')
      } else {
        router.push('/')
        router.refresh()
      }
    } catch (error) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-york-black">
      <div className="w-full max-w-md space-y-8 bg-york-black p-8 rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-bold text-york-red">
            Welcome to YUM
          </h2>
          <p className="mt-2 text-center text-gray-300">
            Sign in with your York University credentials
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Input
                id="studentNumber"
                name="studentNumber"
                type="text"
                required
                placeholder="Student Number"
                className="w-full bg-white text-york-black"
              />
            </div>
            <div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                className="w-full bg-white text-york-black"
              />
            </div>
          </div>

          {error && (
            <p className="text-york-red text-sm text-center">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-york-red hover:bg-york-red/80 text-white"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        
          <p className="text-center text-sm text-gray-300">
            Don't have an account?{' '}
            <a href="/register" className="text-york-red hover:text-york-red/80">
              Register here
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}