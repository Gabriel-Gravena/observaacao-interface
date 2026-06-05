import React from "react";

export default function AuthCard({
  children,
  title,
  description,
}: {
  children: React.ReactNode
  title: string
  description: string
}) {
  return (
    <section className="w-full max-w-md rounded-lg border bg-card/95 p-6 shadow-xl shadow-slate-950/8 backdrop-blur dark:shadow-black/30 sm:p-8">
      <div className="mb-7">
        <p className="eyebrow mb-3 lg:hidden">ObservaAção</p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  )
}
