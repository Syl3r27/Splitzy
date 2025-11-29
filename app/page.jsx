"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { FEATURES,STEPS, TESTIMONIALS } from "@/lib/landing";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react";
import { motion } from "motion/react"


export default function Home() {
  return (
    <div className="flex flex-col pt-16">
      <section className="relative overflow-hidden bg-gradient-to-b from-green-50/70 via-white to-white pt-24 pb-16">
  {/* soft glows */}
  <div className="pointer-events-none absolute -top-24 -left-10 h-64 w-64 rounded-full bg-green-200/60 blur-3xl" />
  <div className="pointer-events-none absolute -bottom-32 right-0 h-72 w-72 rounded-full bg-emerald-200/60 blur-3xl" />

  <div className="container mx-auto max-w-6xl px-5 md:px-6">
    <div className="grid items-center gap-12 lg:grid-cols-2">
      {/* LEFT: text */}
      <div className="space-y-6 text-center lg:text-left">
        <Badge variant="outline" className="bg-green-100 text-green-700">
          Split smart. Settle fast. Stay unbothered.
        </Badge>

        <h1 className="gradient-title mx-auto max-w-4xl text-4xl font-bold md:text-6xl lg:text-7xl">
          The easiest way to settle expenses with your gang.
        </h1>

        <p className="mx-auto max-w-[540px] text-gray-500 md:text-xl/relaxed">
          Log expenses, split instantly, and pay back in seconds. Zero confusion, zero awkwardness.
        </p>

        <div className="flex flex-col items-center justify-start gap-4 sm:flex-row lg:justify-start">
          <Button
            asChild
            size="lg"
            className="bg-green-600 px-7 text-base font-semibold hover:bg-green-700"
          >
            <Link href="/dashboard">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-green-600 px-7 text-base font-semibold text-green-600 hover:bg-green-50"
          >
            <Link href="#how-it-works">
              See How it Works
            </Link>
          </Button>
        </div>

        {/* Trusted by row */}
        <div className="mt-4 flex flex-col items-center gap-2 text-sm text-gray-500 sm:flex-row sm:gap-3">
          <div className="flex -space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-700">
              AK
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-700">
              RS
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-700">
              NP
            </div>
          </div>
          <p className="sm:text-left">
            Trusted by <span className="font-semibold text-gray-700">2,000+ groups</span> for trips, rent, and more.
          </p>
        </div>
      </div>

      {/* RIGHT: hero image */}
      <div className="relative">
        <div className="gradient rounded-3xl p-[2px] shadow-[0_18px_60px_rgba(0,0,0,0.12)] animate-[float_6s_ease-in-out_infinite]">
          <div className="overflow-hidden rounded-3xl bg-green-900/5">
            <Image
              src="/hero.png"
              width={1280}
              height={720}
              alt="Splitzy hero banner"
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>

        <div className="pointer-events-none absolute -right-6 -bottom-6 hidden h-32 w-32 rounded-full bg-green-400/40 blur-3xl lg:block" />
      </div>
    </div>
  </div>
</section>
      
<section id="features" className="bg-gray-50 py-20">
  <div className="container mx-auto px-4 md:px-6 text-center">

    <Badge variant="outline" className="bg-green-100 text-green-700">
      Features
    </Badge>

    <h2 className="gradient-title mt-2 text-3xl md:text-4xl">
      Everything You need to split expenses
    </h2>

    <p className="mx-auto mt-3 max-w-[700px] text-gray-500 md:text-xl/relaxed">
      The complete toolkit for managing shared expenses effortlessly.
    </p>

    {/* Animation wrapper */}
    <motion.div
      className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } },
      }}
    >
      {FEATURES.map(({ title, Icon, bg, color, description }) => (
        <motion.div
          key={title}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Card
            className="flex  h-full flex-col items-center space-y-4 p-6 text-center 
                       transition-transform duration-200 hover:-translate-y-2 hover:shadow-lg"
          >
            <div className={`rounded-full p-3 ${bg}`}>
              <Icon className={`h-6 w-6 ${color}`} />
            </div>

            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-gray-500">{description}</p>
          </Card>
        </motion.div>
      ))}
    </motion.div>

  </div>
</section>


      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Badge variant="outline" className="bg-green-100 text-green-700">
            How It Works
          </Badge>

          <h2 className="gradient-title mt-2 text-3xl md:text-4xl">
            Splitting expenses has never been easier
          </h2>

          <p className="mx-auto mt-3 max-w-[700px] text-gray-500 md:text-xl/relaxed">
            Follow these simple steps to start tracking and splitting expenses with friends
          </p>

          {/* Animation wrapper */}
          <motion.div
            className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {STEPS.map(({ description, label, title }) => (
              <motion.div
                key={title}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center space-y-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-600">
                  {label}
                </div>

                <h3 className="text-xl font-bold">{title}</h3>

                <p className="text-gray-500 text-center">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


<section className="bg-gray-50 py-20">
  <div className="container mx-auto px-4 md:px-6 text-center">

    <Badge variant="outline" className="bg-green-100 text-green-700">
      Testimonials
    </Badge>

    <h2 className="gradient-title mt-2 text-3xl md:text-4xl">
      What Our Users Say About Us.
    </h2>

    {/* Animation Wrapper */}
    <motion.div
      className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } }
      }}
    >
      {TESTIMONIALS.map(({ quote, name, role, image }, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Card className=" h-full transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="space-y-5 p-6">
              
              {/* ⭐⭐⭐⭐⭐ */}
              <div className="flex items-center gap-1 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-500">{quote}</p>

              {/* User Info */}
              <div className="flex items-center space-x-5">
                <Avatar>
                  <AvatarImage src={image} alt={name} />
                  <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="text-left">
                  <p className="text-sm font-medium">{name}</p>
                  <p className="text-sm text-muted-foreground">{role}</p>
                </div>
              </div>

            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>

  </div>
</section>
      
      <section className="py-20 gradient" >
          <div className="container mx-auto px-4 md:px-6 text-center space-y-6">
              <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl text-white">
                Ready to simplify expense sharing??
              </h2>

              <p className="mx-auto max-w-[600px] text-green-100 md:text-xl/relaxed">
                Join Thousands of users who made splitting expenses stress-free
              </p>

              <Button asChild size="lg" className="bg-green-800 hover:opacity-90">
                <Link href="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4"/>
                </Link>
              </Button>
          </div>
      </section>

      <footer className="border-t bg-gray-50 py-12 text-center text-lg text-muted-foreground">
      Made with ❤️ by SYL3R
      </footer>

    </div>
  );
}
