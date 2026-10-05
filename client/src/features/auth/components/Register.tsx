import { useState } from "react";
import { useForm } from "react-hook-form";
import type { IRegisterData } from "../types/auth.types";
import { useUserRegisterMutation } from "../hooks/useUserRegister";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  UserPlus,
  RotateCcw,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

export default function Register() {
  const { registerMutation, registerPending, registerIsError, registerError } =
    useUserRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegisterData>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: IRegisterData) => {
    registerMutation(data);
  };

  const errorMessage =
    (registerError as any)?.response?.data?.message || registerError?.message;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 selection:bg-indigo-500 selection:text-white">
      {/* Ambient background blur circles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-950/50">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-4 transition-transform hover:scale-105">
            <UserPlus className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Create an Account
          </h2>
          <p className="text-sm text-slate-400 mt-1.5">
            Enter your details below to register
          </p>
        </div>

        {/* Error Alert */}
        {registerIsError && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="text-sm font-medium">
              {errorMessage || "Registration failed. Please check your inputs."}
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name fields row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 ml-1">
                First Name
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  {...register("firstName")}
                  placeholder="First Name"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                />
              </div>
              {errors.firstName && (
                <p className="text-xs text-red-400 mt-1 ml-1">{errors.firstName.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 ml-1">
                Last Name
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  {...register("lastName")}
                  placeholder="Last Name"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                />
              </div>
              {errors.lastName && (
                <p className="text-xs text-red-400 mt-1 ml-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 ml-1">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 w-4 h-4 text-slate-500" />
              <input
                type="email"
                {...register("email")}
                placeholder="Email"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-400 mt-1 ml-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 ml-1">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-4 h-4 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Password"
                className="w-full pl-10 pr-10 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-400 mt-1 ml-1">{errors.password.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <div className="flex justify-between items-center mb-1.5 ml-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Phone
              </label>
              <span className="text-[10px] text-slate-500 font-medium">Optional</span>
            </div>
            <div className="relative flex items-center">
              <Phone className="absolute left-3.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                {...register("phone")}
                placeholder="Phone"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <div className="flex justify-between items-center mb-1.5 ml-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Address
              </label>
              <span className="text-[10px] text-slate-500 font-medium">Optional</span>
            </div>
            <div className="relative flex items-center">
              <MapPin className="absolute left-3.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                {...register("address")}
                placeholder="Address"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 flex gap-3">
            <button
              type="submit"
              disabled={registerPending}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.99] text-white font-medium rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-150 flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {registerPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => reset()}
              disabled={registerPending}
              className="py-3 px-4 bg-slate-800/80 hover:bg-slate-800 active:scale-[0.99] text-slate-300 hover:text-white font-medium rounded-xl border border-slate-700/50 transition-all duration-150 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}