'use client'

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";


const Page = () => {

    let router = useRouter()

    const [formData, setFormData] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
          let res = await api.post("/api/auth/login", formData)

          router.push("/home")
        }catch(err){
            console.log("error in login",err)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-center text-3xl">
                        Welcome Back 👋
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                            name='email'
                            onChange={handleChange}
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                            name='password'
                            onChange={handleChange}
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                            />
                        </div>

                        <Button className="w-full">
                            Login
                        </Button>
                    </form>

                    <div className="mt-4 text-right">
                        <Link
                            href="/forgot-password"
                            className="text-sm text-primary hover:underline"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        Do not have an account?{" "}
                        <Link
                            href="/register"
                            className="font-medium text-primary hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;