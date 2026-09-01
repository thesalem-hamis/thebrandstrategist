import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  ArrowRight, 
  Loader2, 
  Shield, 
  Sparkles, 
  AlertCircle,
  Eye,
  EyeOff,
  Fingerprint,
  Command,
  KeyRound
} from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function DashboardLogin() {
  const { signIn, session } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  if (session) {
    navigate("/dashboard", { replace: true });
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: err } = await signIn(email, password);
    setLoading(false);
    if (err) {
      setError(err);
    } else {
      navigate("/dashboard", { replace: true });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0706] px-4"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#5D1F17] to-[#8B3D2F] opacity-30 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#2d1a16] to-[#1a0f0d] opacity-40 blur-[120px]"
        />
        
        {/* Mouse-following glow */}
        <motion.div
          animate={{
            x: mousePosition.x - 150,
            y: mousePosition.y - 150,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
          }}
          className="absolute h-[300px] w-[300px] rounded-full bg-[#5D1F17] opacity-10 blur-[80px]"
        />

        {/* Animated grid */}
        <motion.div
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px'
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-md"
      >
        {/* Split Layout Card */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]">
          {/* Top Decorative Bar */}
          <div className="relative h-1.5 bg-gradient-to-r from-transparent via-[#8B3D2F] to-transparent">
            <motion.div
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent"
            />
          </div>

          {/* Header Section */}
          <div className="relative px-8 pt-10 pb-8">
            {/* Animated Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.3 
              }}
              className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center"
            >
              {/* Pulsing rings */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-2xl bg-[#5D1F17]"
              />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5D1F17] to-[#2d1a16] border border-white/20 shadow-2xl">
                <Fingerprint className="h-8 w-8 text-white" />
              </div>
              {/* Decorative dots */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -right-1 -top-1"
              >
                <Sparkles className="h-4 w-4 text-white/60" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
                <Command className="h-3 w-3 text-white/60" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  Secure Access
                </span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-sm text-white/50">
                Sign in to access your admin dashboard
              </p>
            </motion.div>
          </div>

          {/* Form Section */}
          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-white/40">
                  Email Address
                </label>
                <div className="group relative">
                  <motion.div
                    animate={{
                      boxShadow: focusedField === 'email' 
                        ? '0 0 20px rgba(93, 31, 23, 0.4)' 
                        : '0 0 0px rgba(93, 31, 23, 0)'
                    }}
                    className="relative"
                  >
                    <Mail className={`pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-all duration-300 ${
                      focusedField === 'email' ? 'text-white scale-110' : 'text-white/30'
                    }`} />
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="admin@thebrandstrategist.com"
                      className={`w-full rounded-xl border bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/20 outline-none backdrop-blur-sm transition-all duration-300 ${
                        focusedField === 'email' 
                          ? 'border-[#5D1F17] bg-white/[0.08] shadow-lg' 
                          : 'border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
                      }`}
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-white/40">
                  Password
                </label>
                <div className="group relative">
                  <motion.div
                    animate={{
                      boxShadow: focusedField === 'password' 
                        ? '0 0 20px rgba(93, 31, 23, 0.4)' 
                        : '0 0 0px rgba(93, 31, 23, 0)'
                    }}
                    className="relative"
                  >
                    <KeyRound className={`pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-all duration-300 ${
                      focusedField === 'password' ? 'text-white scale-110' : 'text-white/30'
                    }`} />
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Enter your password"
                      className={`w-full rounded-xl border bg-white/[0.03] py-3.5 pl-11 pr-12 text-sm text-white placeholder-white/20 outline-none backdrop-blur-sm transition-all duration-300 ${
                        focusedField === 'password' 
                          ? 'border-[#5D1F17] bg-white/[0.08] shadow-lg' 
                          : 'border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </motion.div>
                </div>
              </motion.div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 backdrop-blur-sm">
                      <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-400" />
                      <span className="text-xs text-red-300">{error}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#5D1F17] to-[#8B3D2F] py-4 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:shadow-[0_10px_30px_-5px_rgba(93,31,23,0.5)] disabled:opacity-50"
              >
                {/* Button shine effect */}
                <motion.div
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
                
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </motion.button>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center justify-between pt-4"
              >
                <Link 
                  to="/forgot-password" 
                  className="text-xs text-white/40 hover:text-white transition-colors"
                >
                  Forgot password?
                </Link>
                <Link 
                  to="/" 
                  className="group inline-flex items-center gap-1 text-xs text-white/40 hover:text-white transition-colors"
                >
                  Back to site
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </form>
          </div>
        </div>

        {/* Bottom Decorative Element */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/30">
            <Shield className="h-3 w-3" />
            Protected by enterprise-grade security
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}