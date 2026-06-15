import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Shield, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { AppBrand } from "@/components/brand/AppBrand";
import { GoogleLogo } from "@/components/icons/GoogleLogo";
import { getPublicAuthRedirectPath } from "@/lib/auth-session";
import { z } from "zod";
import { GuidedStatusCard } from "@/components/ui/guided-status-card";
import { getAIGuidance } from "@/lib/ai-error-guidance";
import type { GuidedStatusContent } from "@/lib/workflow-guidance";

const signUpSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["user", "admin"], { required_error: "Please select a role" }),
});

const GoogleIcon = () => <GoogleLogo size="md" />;
const GitHubIcon = () => (
  <img src="/integrations-logos/Github.svg" alt="GitHub" className="h-5 w-5 object-contain" />
);
const FacebookIcon = () => (
  <img src="/integrations-logos/facebook.svg" alt="Facebook" className="h-5 w-5 object-contain" />
);

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [role, setRole] = useState<"user" | "admin">("user");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [authGuidance, setAuthGuidance] = useState<GuidedStatusContent | null>(null);

  const {
    user,
    session,
    loading: authLoading,
    signUp,
    confirmSignUp,
    resendSignUpCode,
    signIn,
    signInWithGoogle,
    signInWithGitHub,
    signInWithFacebook,
  } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const redirectPath = getPublicAuthRedirectPath({ loading: authLoading, session });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }
    const result = signUpSchema.safeParse({ fullName, email, password, role });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password, fullName, role);
    setLoading(false);
    if (error) {
      getAIGuidance(
        { code: error.message.includes("already registered") ? 'ACCOUNT_EXISTS' : 'SIGNUP_FAILED', message: error.message, operation: 'sign_up' } as any
      ).then(setAuthGuidance);
      return;
    }
    setPendingVerification(true);
    toast({ title: "Check your email", description: "Enter the 6-digit verification code to finish sign up." });
  };

  const handleConfirmCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthGuidance(null);
    if (!email || !verificationCode.trim()) {
      getAIGuidance({ code: 'CODE_REQUIRED', message: 'Enter the verification code from your email', operation: 'sign_up' } as any).then(setAuthGuidance);
      return;
    }
    setLoading(true);
    const { error } = await confirmSignUp(email, verificationCode.trim());
    if (error) {
      setLoading(false);
      getAIGuidance({ code: 'VERIFICATION_FAILED', message: error.message, operation: 'sign_up' } as any).then(setAuthGuidance);
      return;
    }
    const signInResult = await signIn(email, password);
    setLoading(false);
    if (signInResult.error) {
      toast({ title: "Email verified", description: "Your account is verified. Please sign in." });
      navigate("/signin");
      return;
    }
    toast({ title: "Welcome!", description: "Your email has been verified." });
    navigate(role === "admin" ? "/admin/dashboard" : "/dashboard");
  };

  const handleResendCode = async () => {
    if (!email) return;
    const { error } = await resendSignUpCode(email);
    if (error) {
      getAIGuidance({ code: 'RESEND_FAILED', message: error.message, operation: 'sign_up' } as any).then(setAuthGuidance);
    } else {
      toast({ title: "Code sent", description: "Check your inbox for a fresh verification code." });
    }
  };

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    setAuthGuidance(null);
    try {
      const { error } = await signInWithGoogle();
      if (error) { setGoogleLoading(false); getAIGuidance({ code: 'OAUTH_FAILED', message: error.message, operation: 'sign_up' } as any, { provider: 'google' }).then(setAuthGuidance); }
    } catch { setGoogleLoading(false); getAIGuidance({ code: 'OAUTH_FAILED', message: 'Failed to sign up with Google', operation: 'sign_up' } as any, { provider: 'google' }).then(setAuthGuidance); }
  };

  const handleGitHubSignUp = async () => {
    setGithubLoading(true);
    setAuthGuidance(null);
    try {
      const { error } = await signInWithGitHub();
      if (error) { setGithubLoading(false); getAIGuidance({ code: 'OAUTH_FAILED', message: error.message, operation: 'sign_up' } as any, { provider: 'github' }).then(setAuthGuidance); }
    } catch { setGithubLoading(false); getAIGuidance({ code: 'OAUTH_FAILED', message: 'Failed to sign up with GitHub', operation: 'sign_up' } as any, { provider: 'github' }).then(setAuthGuidance); }
  };

  const handleFacebookSignUp = async () => {
    setFacebookLoading(true);
    setAuthGuidance(null);
    try {
      const { error } = await signInWithFacebook();
      if (error) { setFacebookLoading(false); getAIGuidance({ code: 'OAUTH_FAILED', message: error.message, operation: 'sign_up' } as any, { provider: 'facebook' }).then(setAuthGuidance); }
    } catch { setFacebookLoading(false); getAIGuidance({ code: 'OAUTH_FAILED', message: 'Failed to sign up with Facebook', operation: 'sign_up' } as any, { provider: 'facebook' }).then(setAuthGuidance); }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-sm text-center space-y-4">
          <div className="flex justify-center">
            <AppBrand context="marketing" className="justify-center" />
          </div>
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Checking your session...</p>
        </div>
      </div>
    );
  }

  if (redirectPath || user) {
    return <Navigate to={redirectPath || "/dashboard"} replace />;
  }

  return (
    <div className="min-h-screen flex">
      {/* Left — Sign Up */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-6"
        >
          <div className="text-center">
            <div className="flex justify-center">
              <AppBrand context="marketing" className="justify-center" />
            </div>
            <h1 className="mt-5 text-3xl font-bold tracking-tight">Create your account</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Join thousands of teams automating their workflows with AI
            </p>
          </div>

          {pendingVerification ? (
            <form onSubmit={handleConfirmCode} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="verificationCode">Verification Code</Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="verificationCode"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="123456"
                    className="pl-10"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full gradient-primary text-primary-foreground font-semibold" disabled={loading}>
                {loading ? "Verifying..." : "Verify Email"}
              </Button>
              <Button type="button" variant="ghost" className="w-full" onClick={handleResendCode}>
                Resend code
              </Button>
            </form>
          ) : (

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="fullName" placeholder="John Doe" className="pl-10" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
              {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="confirmPassword" type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
              {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
            </div>
            <div className="space-y-2">
              <Label>Account Type <span className="text-destructive">*</span></Label>
              <RadioGroup value={role} onValueChange={(v) => setRole(v as "user" | "admin")} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="user" id="role-user" />
                  <Label htmlFor="role-user" className="font-normal cursor-pointer flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" /> User
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="role-admin" />
                  <Label htmlFor="role-admin" className="font-normal cursor-pointer flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5" /> Admin
                  </Label>
                </div>
              </RadioGroup>
              {errors.role && <p className="text-xs text-destructive">{errors.role}</p>}
            </div>
            <Button type="submit" className="w-full gradient-primary text-primary-foreground font-semibold" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </Button>

            {/* Social sign-up — below main CTA */}
            <div className="space-y-2 pt-1">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  disabled={googleLoading || loading}
                  aria-label="Sign up with Google"
                  className="flex flex-1 items-center justify-center rounded-lg border border-border bg-background py-2.5 transition-colors hover:bg-muted disabled:opacity-50"
                >
                  {googleLoading ? <span className="h-5 w-5 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" /> : <GoogleIcon />}
                </button>
                <button
                  type="button"
                  onClick={handleGitHubSignUp}
                  disabled={githubLoading || loading}
                  aria-label="Sign up with GitHub"
                  className="flex flex-1 items-center justify-center rounded-lg border border-border bg-background py-2.5 transition-colors hover:bg-muted disabled:opacity-50"
                >
                  {githubLoading ? <span className="h-5 w-5 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" /> : <GitHubIcon />}
                </button>
                <button
                  type="button"
                  onClick={handleFacebookSignUp}
                  disabled={facebookLoading || loading}
                  aria-label="Sign up with Facebook"
                  className="flex flex-1 items-center justify-center rounded-lg border border-border bg-background py-2.5 transition-colors hover:bg-muted disabled:opacity-50"
                >
                  {facebookLoading ? <span className="h-5 w-5 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" /> : <FacebookIcon />}
                </button>
              </div>
              <p className="text-center text-xs text-muted-foreground">Or sign up with Google, GitHub or Facebook</p>
            </div>
          </form>
          )}

          {authGuidance && (
            <GuidedStatusCard
              title={authGuidance.title}
              description={authGuidance.description}
              resolution={authGuidance.resolution}
              nextSteps={authGuidance.nextSteps}
              tone={authGuidance.tone}
              onDismiss={() => setAuthGuidance(null)}
            />
          )}

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/signin" className="font-semibold text-primary hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>

      {/* Right — Decorative */}
      <div className="hidden lg:flex lg:flex-1 gradient-primary items-center justify-center p-12">
        <div className="max-w-md text-center text-white">
          <h2 className="text-3xl font-bold leading-tight">Build workflows that work while you sleep</h2>
          <p className="mt-4 text-white/80 leading-relaxed">Connect your tools, define your logic, and let AI handle the rest. No code required.</p>
        </div>
      </div>
    </div>
  );
}
