"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Check, Loader2, AlertCircle, Zap } from "lucide-react";

// shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { signIn } from "next-auth/react";

const perks = [
    "Free shipping on your first order",
    "Exclusive early access to new drops",
    "Members-only sale prices",
];

export default function RegisterPage() {
    const router = useRouter();

    // --- States ---
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirm: "",
    });

    // --- Handlers ---
    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (form.password !== form.confirm) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            // 1. Create the user in MongoDB
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: `${form.firstName} ${form.lastName}`.trim(),
                    email: form.email,
                    password: form.password,
                }),
            });

            if (res.ok) {
                // 2. AUTOMATIC LOGIN
                // We use the same credentials the user just typed in
                const result = await signIn("credentials", {
                    email: form.email,
                    password: form.password,
                    redirect: false, // Handle redirect manually
                });

                if (result?.error) {
                    // If auto-login fails for some weird reason, send them to login as backup
                    router.push("/login?error=auto-login-failed");
                } else {
                    // 3. SUCCESS REDIRECT
                    router.push("/"); // Send them straight to the home page
                    router.refresh(); // Update the Navbar session
                }
            } else {
                const data = await res.json();
                setError(data.message || "Registration failed");
                setLoading(false);
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            setLoading(false);
        }
    };

    // --- Password Strength Logic ---
    const passwordStrength = (() => {
        const p = form.password;
        if (!p) return 0;
        let score = 0;
        if (p.length >= 8) score++;
        if (/[A-Z]/.test(p)) score++;
        if (/[0-9]/.test(p)) score++;
        if (/[^A-Za-z0-9]/.test(p)) score++;
        return score;
    })();

    const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][passwordStrength];
    const strengthColor = ["", "bg-destructive", "bg-amber-400", "bg-amber-400", "bg-emerald-500"][passwordStrength];

    return (
        <div className="min-h-[calc(100dvh-64px)] sm:min-h-[calc(100dvh-73px)] flex bg-background">
            {/* --- LEFT SIDE: THE BRANDING & PERKS (Hidden on Mobile) --- */}
            <div className="hidden lg:flex lg:w-[420px] xl:w-1/2 relative overflow-hidden bg-foreground flex-col justify-between p-12 shrink-0">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-25"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=900&q=80')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-foreground/80 via-foreground/60 to-foreground/95" />

                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-2xl font-black text-background tracking-tight">Wearo.</span>
                    </Link>
                </div>

                <div className="relative z-10 space-y-8">
                    <div>
                        <h2 className="text-4xl font-black text-background leading-none tracking-tight">
                            Join the <br /> <span className="text-amber-400">Movement.</span>
                        </h2>
                        <p className="text-background/60 text-sm leading-relaxed mt-4 max-w-xs">
                            Become part of a community that lives and breathes streetwear culture.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {perks.map((perk) => (
                            <div key={perk} className="flex items-center gap-3">
                                <div className="flex-shrink-0 size-5 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center">
                                    <Check className="size-3 text-amber-400" />
                                </div>
                                <span className="text-sm text-background/70">{perk}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 flex items-center gap-3">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="size-8 rounded-full border-2 border-foreground bg-muted overflow-hidden">
                                <img src={`https://i.pravatar.cc/40?img=${i + 15}`} alt="" className="size-full object-cover" />
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-background/60">
                        <span className="text-background font-semibold">2M+ shoppers</span> already joined
                    </p>
                </div>
            </div>

            {/* --- RIGHT SIDE: THE FORM --- */}
            <div className="flex-1 flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-16 bg-background overflow-y-auto">
                <div className="lg:hidden mb-8">
                    <Link href="/" className="text-2xl font-black text-foreground tracking-tight">Wearo.</Link>
                </div>

                <div className="w-full max-w-md mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-foreground tracking-tight">Create account</h1>
                        <p className="text-muted-foreground mt-1.5 text-sm">Start your style journey today</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-3">
                            <AlertCircle className="size-4 shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                                <Label htmlFor="firstName">First name</Label>
                                <Input id="firstName" name="firstName" placeholder="John" value={form.firstName} onChange={handleChange} required className="h-11 bg-muted/30" />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="lastName">Last name</Label>
                                <Input id="lastName" name="lastName" placeholder="Doe" value={form.lastName} onChange={handleChange} required className="h-11 bg-muted/30" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="email">Email address</Label>
                            <Input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required className="h-11 bg-muted/30" />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password" name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Min. 8 characters"
                                    value={form.password} onChange={handleChange} required
                                    className="h-11 bg-muted/30 pr-11"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                </button>
                            </div>
                            {form.password && (
                                <div className="space-y-1.5 pt-1">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= passwordStrength ? strengthColor : "bg-border"}`} />
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Strength: {strengthLabel}</p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="confirm">Confirm password</Label>
                            <div className="relative">
                                <Input
                                    id="confirm" name="confirm"
                                    type={showConfirm ? "text" : "password"}
                                    placeholder="Re-enter password"
                                    value={form.confirm} onChange={handleChange} required
                                    className="h-11 bg-muted/30 pr-11"
                                />
                                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                    {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                </button>
                            </div>
                        </div>

                        {/* <div className="flex items-start gap-2 pt-1">
                            <Checkbox id="terms" checked={agreed} onCheckedChange={(v) => setAgreed(!!v)} className="mt-1" />
                            <Label htmlFor="terms" className="text-sm text-muted-foreground font-normal cursor-pointer leading-snug">
                                I agree to the <Link href="/terms" className="text-foreground font-medium underline">Terms</Link> and <Link href="/privacy" className="text-foreground font-medium underline">Privacy Policy</Link>
                            </Label>
                        </div> */}

                        <Button type="submit" size="lg" disabled={loading} className="w-full h-11 bg-foreground text-background font-semibold gap-2 cursor-pointer">
                            {loading ? <Loader2 className="animate-spin size-4" /> : <>Create account <ArrowRight className="size-4" /></>}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-muted-foreground mt-7">
                        Already have an account? <Link href="/login" className="text-foreground font-semibold hover:underline">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}