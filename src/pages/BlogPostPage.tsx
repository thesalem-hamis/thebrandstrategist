import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowUpLeft, 
  ArrowUpRight, 
  Loader2, 
  Calendar,
  Clock,
  Feather,
  Share2,
  Bookmark,
  ChevronRight
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { BlogPost } from "@/lib/types";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (!slug) return;
    
    supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle()
      .then(({ data }) => {
        setPost((data ?? null) as BlogPost | null);
        setLoading(false);
        
        if (data) {
          supabase
            .from("blog_posts")
            .select("*")
            .eq("published", true)
            .neq("id", data.id)
            .order("created_at", { ascending: false })
            .limit(2)
            .then(({ data: relatedData }) => {
              setRelatedPosts((relatedData ?? []) as BlogPost[]);
            });
        }
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-40 flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-5 w-5 animate-spin text-neutral-400" />
        <p className="text-xs text-neutral-500">Loading article…</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="w-full bg-white text-neutral-900 font-sans min-h-screen py-32 px-6 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-neutral-100">
            <Feather className="h-5 w-5 text-neutral-400" />
          </div>
          <h1 className="text-xl sm:text-3xl font-semibold sm:font-light tracking-tight uppercase mb-2">
            Article Not Found
          </h1>
          <p className="text-xs text-neutral-500 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#5D1F17] bg-white text-[#5D1F17] hover:border-neutral-900 hover:text-neutral-900 text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow hover:shadow-md group/btn"
          >
            <ArrowUpLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            <span>BACK TO JOURNAL</span>
          </Link>
        </div>
      </div>
    );
  }

  const readingTime = Math.max(1, Math.ceil((post.content?.length || 0) / 1200));

  return (
    <div className="w-full bg-white text-neutral-900 font-sans pt-20 sm:pt-24 lg:pt-28 pb-20 sm:pb-24 px-6 sm:px-12 lg:px-20 border-b border-neutral-200">
      <div className="mx-auto max-w-3xl">
        
        {/* Top Navigation */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 text-neutral-600 hover:border-[#5D1F17] hover:text-[#5D1F17] text-[11px] font-semibold tracking-wider uppercase transition-all duration-200 group/btn"
          >
            <ArrowUpLeft className="w-3 h-3 transition-transform duration-300 group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            <span>Back to Journal</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <button className="grid h-8 w-8 place-items-center rounded-full border border-neutral-200 text-neutral-500 hover:border-[#5D1F17] hover:text-[#5D1F17] transition-all duration-300">
              <Share2 className="h-3 w-3" />
            </button>
            <button className="grid h-8 w-8 place-items-center rounded-full border border-neutral-200 text-neutral-500 hover:border-[#5D1F17] hover:text-[#5D1F17] transition-all duration-300">
              <Bookmark className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#5D1F17]">
              <Feather className="w-3 h-3" />
              The Journal
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight uppercase leading-tight text-neutral-900 mb-4">
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p className="text-sm text-neutral-600 leading-relaxed mb-6">
              {post.excerpt}
            </p>
          )}
          
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-neutral-100">
            <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-neutral-500">
              <Calendar className="w-3 h-3" />
              {new Date(post.created_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="w-1 h-1 rounded-full bg-neutral-300" />
            <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-neutral-500">
              <Clock className="w-3 h-3" />
              {readingTime} min read
            </span>
          </div>
        </motion.div>

        {/* Cover Image - Smaller and contained */}
        {post.cover_image_url && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10 overflow-hidden border border-neutral-200 rounded-xl"
          >
            <div className="aspect-[16/9] max-h-[400px] overflow-hidden">
              <img
                src={post.cover_image_url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-sm leading-relaxed text-neutral-700 whitespace-pre-line"
        >
          {post.content}
        </motion.article>

        {/* Divider */}
        <div className="my-12 border-t border-neutral-100" />

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 sm:p-8 text-center">
            <h2 className="text-lg sm:text-xl font-light tracking-tight uppercase text-neutral-900 mb-2">
              Ready to Build Your Brand?
            </h2>
            <p className="text-xs text-neutral-600 mb-5 max-w-sm mx-auto">
              Book a private 1-on-1 strategy session with Bimpe Mohammed and get expert guidance tailored to your goals.
            </p>
            <Link
              to="/book-a-session"
              className="inline-flex items-center gap-2 rounded-full bg-[#5D1F17] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white hover:bg-[#4A1812] transition-all duration-300 hover:shadow-md group"
            >
              Book a Session 
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </motion.div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12"
          >
            <div className="mb-5 flex items-center gap-3">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                Continue Reading
              </h2>
              <div className="flex-1 h-px bg-neutral-200" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="group flex items-center gap-3 border border-neutral-200 rounded-xl overflow-hidden hover:border-neutral-300 transition-all duration-300 bg-white p-3"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                    {relatedPost.cover_image_url ? (
                      <img
                        src={relatedPost.cover_image_url}
                        alt={relatedPost.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-[#5D1F17]/20 to-neutral-300 flex items-center justify-center">
                        <Feather className="w-5 h-5 text-neutral-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-semibold tracking-tight uppercase text-neutral-900 leading-tight mb-1 group-hover:text-[#5D1F17] transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <span className="text-[10px] font-mono uppercase text-neutral-400">
                      {new Date(relatedPost.created_at).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <ChevronRight className="w-3.5 h-3.5 shrink-0 text-neutral-400 group-hover:text-[#5D1F17] transition-colors" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}