import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock, Calendar } from "lucide-react";
import { getBlogs } from "@/lib/api";

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="space-y-4 mb-16 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] bg-[var(--card)]">
            Articles & Insights
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--foreground)]">
            Design Engineering Journal
          </h1>
          <p className="text-base sm:text-lg text-[var(--muted-foreground)]">
            Thoughts, technical deep dives, and reflections on design systems, full-stack architecture with Next.js & Laravel, and modern web performance.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <article
              key={post.id}
              className="group rounded-3xl border border-[var(--border)] bg-[var(--card)] overflow-hidden transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-600 hover:shadow-xl flex flex-col"
            >
              {/* Cover Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 border-b border-[var(--border)]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/75 dark:bg-zinc-900/90 text-white backdrop-blur-md border border-white/10">
                    {(post as any).category || "Design & Tech"}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)] mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {(post as any).date || post.published_date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.read_time}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[var(--foreground)] group-hover:underline inline-flex items-center gap-1">
                    Read Article
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-xs text-[var(--muted-foreground)] font-mono">
                    Article #{post.id}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
