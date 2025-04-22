
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, Facebook } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [userType, setUserType] = React.useState<'student' | 'organisation' | 'speaker'>('student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Supabase signup logic will be implemented here
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side with gradient background */}
      <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-purple-700 via-purple-600 to-pink-600">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Sign Up</h1>
          <h2 className="text-2xl md:text-3xl text-white/90">Student Login</h2>
        </div>
      </div>

      {/* Right side with form */}
      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
          {/* User Type Selection */}
          <div className="flex gap-2 mb-6">
            {['student', 'organisation', 'speaker'].map((type) => (
              <Button
                key={type}
                variant={userType === type ? 'default' : 'outline'}
                onClick={() => setUserType(type as 'student' | 'organisation' | 'speaker')}
                className="flex-1 capitalize"
              >
                {type}
              </Button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="Enter your full name" required />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="example@gmail.com" required />
              </div>

              <div>
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="johnkevin4362" required />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-600"
                >
                  By creating an account you agree to the terms of use and our privacy policy.
                </label>
              </div>

              <div className="space-y-4">
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                  Create account
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" type="button" className="w-full">
                    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                      <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" type="button" className="w-full">
                    <Facebook className="mr-2 h-4 w-4" />
                    Facebook
                  </Button>
                </div>
              </div>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-purple-600 hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;

