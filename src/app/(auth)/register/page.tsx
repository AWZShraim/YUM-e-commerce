'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    studentNumber: '',
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: ''
  })

  const updateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleNext = () => {
    if (step === 1) {
      if (!formData.studentNumber || !formData.email || !formData.name) {
        setError('Please fill in all required fields')
        return
      }
      if (!formData.email.endsWith('@yorku.ca') && !formData.email.endsWith('@my.yorku.ca')) {
        setError('Must use a York University email address')
        return
      }
    }
    if (step === 2) {
      if (!formData.password || !formData.confirmPassword) {
        setError('Please fill in all required fields')
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        return
      }
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters')
        return
      }
    }
    setError('')
    setStep(step + 1)
  }

  const handleBack = () => {
    setError('')
    setStep(step - 1)
  }

// submission logic
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
  
    // Making sure passwords match before sending request
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }
  
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentNumber: formData.studentNumber,
          email: formData.email,
          name: formData.name,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
        }),
      })
  
      const data = await response.json()
  
      if (!response.ok) {
        throw new Error(data.message)
      }
  
      // Redirecting to login page with success message
      router.push('/login?registered=true')
    } catch (error: any) {
      setError(error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-york-black">
      <div className="w-full max-w-md space-y-8 bg-york-black p-8 rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-bold text-york-red">
            Create YUM Account
          </h2>
          <p className="mt-2 text-center text-gray-300">
            Register with your York University credentials
          </p>
          <div className="flex justify-center space-x-2 mt-4">
            <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-york-red' : 'bg-gray-600'}`} />
            <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-york-red' : 'bg-gray-600'}`} />
            <div className={`w-3 h-3 rounded-full ${step >= 3 ? 'bg-york-red' : 'bg-gray-600'}`} />
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <Input
                name="studentNumber"
                type="text"
                required
                placeholder="Student/Employee Number"
                className="w-full bg-white text-york-black"
                value={formData.studentNumber}
                onChange={updateFormData}
              />
              <Input
                name="email"
                type="email"
                required
                placeholder="York University Email"
                className="w-full bg-white text-york-black"
                value={formData.email}
                onChange={updateFormData}
              />
              <Input
                name="name"
                type="text"
                required
                placeholder="Full Name"
                className="w-full bg-white text-york-black"
                value={formData.name}
                onChange={updateFormData}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Input
                name="password"
                type="password"
                required
                placeholder="Password"
                className="w-full bg-white text-york-black"
                value={formData.password}
                onChange={updateFormData}
                minLength={8}
              />
              <Input
                name="confirmPassword"
                type="password"
                required
                placeholder="Confirm Password"
                className="w-full bg-white text-york-black"
                value={formData.confirmPassword}
                onChange={updateFormData}
                minLength={8}
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <Input
                name="phoneNumber"
                type="tel"
                placeholder="Phone Number"
                className="w-full bg-white text-york-black"
                value={formData.phoneNumber}
                onChange={updateFormData}
              />
              <Input
                name="address"
                type="text"
                placeholder="Street Address"
                className="w-full bg-white text-york-black"
                value={formData.address}
                onChange={updateFormData}
              />
            </div>
          )}

          {error && (
            <p className="text-york-red text-sm text-center">{error}</p>
          )}

          <div className="flex space-x-4">
            {step > 1 && (
              <Button
                type="button"
                onClick={handleBack}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white"
              >
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="flex-1 bg-york-red hover:bg-york-red/80 text-white"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                className="flex-1 bg-york-red hover:bg-york-red/80 text-white"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            )}
          </div>
        </form>

        <p className="text-center text-sm text-gray-300">
          Already have an account?{' '}
          <a href="/login" className="text-york-red hover:text-york-red/80">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  )
}