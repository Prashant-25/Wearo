"use client";

import React, { useState } from "react";
import { User, Mail, MapPin, Shield, Bell, CreditCard, Save, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
   const [isEditing, setIsEditing] = useState(false);
   const [isSaving, setIsSaving] = useState(false);
   const { data: session } = useSession();

   const handleSave = () => {
      setIsSaving(true);
      setTimeout(() => {
         setIsSaving(false);
         setIsEditing(false);
      }, 1500);
   };

   return (
      <div className="max-w-[1000px] mx-auto px-4 py-10 md:py-16">
         <div className="mb-10 flex items-end justify-between">
            <div>
               <h1 className="text-3xl font-bold tracking-tight mb-2">Account Settings</h1>
               <p className="text-zinc-500">Manage your profile information and preferences</p>
            </div>
            {!isEditing ? (
               <Button variant="outline" className="rounded-full px-6" onClick={() => setIsEditing(true)}>
                  Edit Profile
               </Button>
            ) : (
               <div className="flex gap-3">
                  <Button variant="ghost" className="rounded-full px-6" onClick={() => setIsEditing(false)}>
                     Cancel
                  </Button>
                  <Button className="rounded-full px-6 gap-2" onClick={handleSave} disabled={isSaving}>
                     {isSaving ? "Saving..." : <><Save size={16} /> Save Changes</>}
                  </Button>
               </div>
            )}
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar Nav (Desktop only for now) */}
            <aside className="lg:col-span-3 hidden lg:block">
               <nav className="space-y-1">
                  {[
                     { label: "Personal Info", icon: User, active: true },
                     { label: "Shipping Addresses", icon: MapPin },
                     { label: "Payments", icon: CreditCard },
                     { label: "Security", icon: Shield },
                     { label: "Notifications", icon: Bell },
                  ].map((item) => (
                     <button
                        key={item.label}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${item.active
                           ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white"
                           : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:text-zinc-900 dark:hover:text-white"
                           }`}
                     >
                        <item.icon size={18} />
                        {item.label}
                     </button>
                  ))}
               </nav>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-9 space-y-10">

               {/* Section: Profile Identity */}
               <section className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
                  <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
                     <div className="relative group">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-black shadow-lg">
                           {session?.user?.name?.charAt(0)}
                        </div>
                        <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-zinc-800 rounded-full shadow-md border border-zinc-100 dark:border-zinc-700 hover:scale-110 transition-transform">
                           <Camera size={14} />
                        </button>
                     </div>
                     <div className="text-center sm:text-left">
                        <h2 className="text-xl font-bold mb-1">{session?.user?.name}</h2>
                        <p className="text-sm text-zinc-500 mb-2">Member since March 2024</p>
                        <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                           Gold Member
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-zinc-50 dark:border-zinc-800/50">
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Full Name</label>
                        <div className="relative">
                           <Input
                              defaultValue={session?.user?.name}
                              readOnly={!isEditing}
                              className={`h-12 pl-10 rounded-xl transition-all ${!isEditing ? "bg-zinc-50/50 border-transparent dark:bg-zinc-800/30" : "border-zinc-200"}`}
                           />
                           <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Email Address</label>
                        <div className="relative">
                           <Input
                              defaultValue={session?.user?.email}
                              readOnly={!isEditing}
                              className={`h-12 pl-10 rounded-xl transition-all ${!isEditing ? "bg-zinc-50/50 border-transparent dark:bg-zinc-800/30" : "border-zinc-200"}`}
                           />
                           <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        </div>
                     </div>
                  </div>
               </section>

               {/* Section: Default Address */}
               <section className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                     <h3 className="text-lg font-bold">Default Shipping Address</h3>
                     <MapPin size={20} className="text-indigo-500" />
                  </div>

                  <div className="space-y-4">
                     <Input
                        defaultValue="123 Premium St"
                        readOnly={!isEditing}
                        placeholder="Street Address"
                        className={`h-12 rounded-xl transition-all ${!isEditing ? "bg-zinc-50/50 border-transparent dark:bg-zinc-800/30" : "border-zinc-200"}`}
                     />
                     <div className="grid grid-cols-2 gap-4">
                        <Input
                           defaultValue="Manhattan, NY"
                           readOnly={!isEditing}
                           placeholder="City, State"
                           className={`h-12 rounded-xl transition-all ${!isEditing ? "bg-zinc-50/50 border-transparent dark:bg-zinc-800/30" : "border-zinc-200"}`}
                        />
                        <Input
                           defaultValue="10001"
                           readOnly={!isEditing}
                           placeholder="ZIP Code"
                           className={`h-12 rounded-xl transition-all ${!isEditing ? "bg-zinc-50/50 border-transparent dark:bg-zinc-800/30" : "border-zinc-200"}`}
                        />
                     </div>
                  </div>
               </section>

               {/* Section: Subscription / Preferences Mock */}
               <div className="p-8 bg-black dark:bg-zinc-800 rounded-[2rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                  <div className="z-10 text-center md:text-left">
                     <h3 className="text-xl font-bold mb-2">Wearo Insider Beta</h3>
                     <p className="text-zinc-400 text-sm">Join the exclusive beta program for early access to minimalist essentials.</p>
                  </div>
                  <Button className="bg-white text-black hover:bg-zinc-200 rounded-full px-8 font-bold z-10 shrink-0">
                     Join Beta
                  </Button>

                  {/* Decorative circle */}
                  <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]" />
               </div>

            </div>
         </div>
      </div>
   );
}
