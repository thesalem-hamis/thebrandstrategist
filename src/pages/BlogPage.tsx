import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowUpLeft, 
  ArrowUpRight, 
  Loader2, 
  Calendar,
  Feather,
  Sparkles,
  BookOpen,
  Clock
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { BlogPost } from "@/lib/types";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setPosts((data ?? []) as BlogPost[]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full bg-white text-neutral-900 font-sans pt-20 sm:pt-28 lg:pt-36 pb-24 sm:pb-32 px-6 sm:px-12 lg:px-20 border-b border-neutral-200">
      <div className="mx-auto max-w-7xl">
        
        {/* Top Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#5D1F17] bg-white text-[#5D1F17] hover:border-neutral-900 hover:text-neutral-900 text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow hover:shadow-md group/btn"
          >
            <ArrowUpLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            <span>GO BACK</span>
          </Link>
          
          <div className="flex items-center gap-2 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            {posts.length} {posts.length === 1 ? 'Article' : 'Articles'}
          </div>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#5D1F17] bg-[#5D1F17]/10 px-3 py-1.5 rounded-full border border-[#5D1F17]/20">
              <Feather className="w-3.5 h-3.5" />
              The Journal
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-semibold sm:font-light uppercase tracking-tight leading-none text-neutral-900">
            THE <span className="font-serif italic text-[#5D1F17]">JOURNAL</span>
          </h1>
          <p className="mt-4 max-w-xl text-xs sm:text-sm leading-relaxed text-neutral-700 font-normal">
            Essays, frameworks and case studies on building brands with clarity, intention, and long-term authority.
          </p>
        </motion.div>

        {/* Content */}
        {loading ? (
          <div className="py-20 flex flex-col items-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
            <p className="text-xs text-neutral-500">Loading articles…</p>
          </div>
        ) : posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border border-dashed border-zinc-300 rounded-2xl py-20 text-center"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-neutral-100">
                <Sparkles className="h-5 w-5 text-neutral-400" />
              </div>
              <p className="text-xs text-neutral-400">No articles published yet. Check back soon.</p>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* First Row - 2 posts side by side */}
            {posts.slice(0, 2).map((post, index) => (
              <HorizontalCard key={post.id} post={post} index={index} />
            ))}
            
            {/* Remaining posts in pairs */}
            {posts.length > 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {posts.slice(2).map((post, index) => (
                  <CompactCard key={post.id} post={post} index={index} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function HorizontalCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group flex flex-col sm:flex-row border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
      >
        {/* Image */}
        <div className="sm:w-1/2 lg:w-2/5 aspect-[16/9] sm:aspect-auto overflow-hidden bg-neutral-100 relative shrink-0">
          {post.cover_image_url ? (
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[#5D1F17]/20 to-neutral-300 flex items-center justify-center">
              <Feather className="w-12 h-12 text-neutral-400" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Content */}
        <div className="p-6 sm:p-8 flex flex-col justify-center flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#5D1F17]">
              {index === 0 ? 'Latest' : 'Featured'}
            </span>
            <span className="w-1 h-1 rounded-full bg-neutral-300" />
            <span className="text-[10px] font-mono uppercase text-neutral-400 flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              {new Date(post.created_at).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
          
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight uppercase text-neutral-900 leading-tight mb-3 group-hover:text-[#5D1F17] transition-colors duration-300">
            {post.title}
          </h2>
          
          {post.excerpt && (
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed line-clamp-2 mb-4">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-neutral-400">
              <Clock className="w-3 h-3" />
              5 min read
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#5D1F17] group-hover:gap-2.5 transition-all duration-300">
              Read Article
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function CompactCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group flex items-center gap-4 border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 bg-white p-4"
      >
        {/* Thumbnail */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 overflow-hidden rounded-xl bg-neutral-100 relative">
          {post.cover_image_url ? (
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.1]"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[#5D1F17]/20 to-neutral-300 flex items-center justify-center">
              <Feather className="w-8 h-8 text-neutral-400" />
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-semibold tracking-tight uppercase text-neutral-900 leading-tight mb-1.5 group-hover:text-[#5D1F17] transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-neutral-400 mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(post.created_at).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
          
          {post.excerpt && (
            <p className="text-[11px] text-neutral-500 leading-relaxed line-clamp-1">
              {post.excerpt}
            </p>
          )}
        </div>
        
        {/* Arrow */}
        <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full border border-neutral-200 text-[#5D1F17] group-hover:bg-[#5D1F17] group-hover:text-white group-hover:border-[#5D1F17] transition-all duration-300">
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </Link>
    </motion.div>
  );
}