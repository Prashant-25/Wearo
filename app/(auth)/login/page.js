"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, ArrowRight, Zap, Loader2, AlertCircle } from "lucide-react";

// shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
    // --- Functional Logic States ---
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    // --- Handlers ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false, // Essential to handle errors on this page
            });

            if (res?.error) {
                // Handle specific error messages if needed
                setError("Invalid email or password. Please try again.");
                setIsLoading(false);
            } else {
                // Success: Clear state and move to home
                router.push("/");
                router.refresh(); // Forces the Navbar to update with the new session
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100dvh-64px)] sm:min-h-[calc(100dvh-73px)] flex bg-background">
            {/* --- LEFT SIDE: THE EDITORIAL BRANDING (Hidden on Mobile) --- */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-foreground flex-col justify-between p-12">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/90" />

                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-2xl font-black text-background tracking-tight">
                            Wearo.
                        </span>
                    </Link>
                </div>

                <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 bg-background/10 border border-background/20 rounded-full px-4 py-1.5 backdrop-blur-sm">
                        <Zap className="size-3 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-semibold text-background/80 uppercase tracking-widest">
                            Streetwear 2026
                        </span>
                    </div>

                    <h2 className="text-5xl font-black text-background leading-none tracking-tight">
                        Dress Without
                        <br />
                        <span className="text-amber-400">Limits.</span>
                    </h2>

                    <p className="text-background/60 text-base leading-relaxed max-w-xs">
                        Discover luxury fashion and iconic designer brands. Redefining
                        comfort with architectural silhouettes.
                    </p>
                </div>

                <div className="relative z-10 flex items-center gap-6">
                    <div className="text-center">
                        <div className="text-2xl font-black text-background">500+</div>
                        <div className="text-xs text-background/50 uppercase tracking-wider mt-0.5">Styles</div>
                    </div>
                    <Separator orientation="vertical" className="h-10 bg-background/20" />
                    <div className="text-center">
                        <div className="text-2xl font-black text-background">50%</div>
                        <div className="text-xs text-background/50 uppercase tracking-wider mt-0.5">Off Sale</div>
                    </div>
                    <Separator orientation="vertical" className="h-10 bg-background/20" />
                    <div className="text-center">
                        <div className="text-2xl font-black text-background">2M+</div>
                        <div className="text-xs text-background/50 uppercase tracking-wider mt-0.5">Shoppers</div>
                    </div>
                </div>
            </div>

            {/* --- RIGHT SIDE: THE LOGIN FORM --- */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 bg-background">
                <div className="lg:hidden mb-10">
                    <Link href="/" className="text-2xl font-black text-foreground tracking-tight">
                        Wearo.
                    </Link>
                </div>

                <div className="w-full max-w-md mx-auto">
                    <div className="mb-10 text-center lg:text-left">
                        <h1 className="text-3xl font-black text-foreground tracking-tight">
                            Welcome back
                        </h1>
                        <p className="text-muted-foreground mt-2 text-sm">
                            Sign in to your account to continue shopping
                        </p>
                    </div>

                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-3">
                            <AlertCircle className="size-4 shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1.5">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-11 bg-muted/30"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href="/forgot-password"
                                    className="text-xs text-muted-foreground hover:text-foreground font-medium"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-11 bg-muted/30 pr-11"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                </button>
                            </div>
                        </div>

                        {/* <div className="flex items-center gap-2">
                            <Checkbox
                                id="remember"
                                checked={rememberMe}
                                onCheckedChange={(v) => setRememberMe(!!v)}
                            />
                            <Label htmlFor="remember" className="text-sm text-muted-foreground font-normal cursor-pointer">
                                Remember me for 30 days
                            </Label>
                        </div> */}

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-11 bg-foreground text-background hover:bg-foreground/90 font-semibold gap-2"
                        >
                            {isLoading ? (
                                <Loader2 className="size-4 animate-spin" />
                            ) : (
                                <>
                                    Sign in <ArrowRight className="size-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="my-7 flex items-center gap-4">
                        <Separator className="flex-1" />
                        <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">or</span>
                        <Separator className="flex-1" />
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        className="w-full h-11 gap-2 cursor-pointer"
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                    >
                        <svg className="size-4" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </Button>

                    <p className="text-center text-sm text-muted-foreground mt-8">
                        Don't have an account?{" "}
                        <Link href="/register" className="text-foreground font-semibold hover:underline underline-offset-4">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}