
import React from 'react';
import { motion } from 'framer-motion';
import { BLOG_POSTS } from '../constants';

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <header className="mb-24">
          <h1 className="text-5xl md:text-7xl font-black mb-6">Perspectives.</h1>
          <p className="text-xl text-zinc-500 max-w-2xl">
            Our thoughts on motion design, animation trends, and the future of storytelling.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
           {/* Featured Post (Full Width placeholder style) */}
           <motion.div 
             className="md:col-span-2 lg:col-span-3 group cursor-pointer"
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
              <div className="aspect-[21/9] overflow-hidden rounded-[2.5rem] mb-8 border border-white/5">
                <img src="https://picsum.photos/seed/insight/1600/800" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <span className="text-blue-500 font-bold uppercase tracking-widest text-xs mb-4 block">Case Study Insight</span>
              <h2 className="text-4xl font-bold mb-4 group-hover:text-blue-400 transition-colors">How Motion Design Improved Conversion Rates for FinTech by 60%</h2>
              <p className="text-zinc-500 text-lg max-w-3xl">An in-depth look at behavioral psychology and animated user experiences in the modern finance world.</p>
           </motion.div>

           {BLOG_POSTS.map((post, idx) => (
             <motion.div 
               key={post.id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               viewport={{ once: true }}
               className="group cursor-pointer"
             >
                <div className="aspect-video overflow-hidden rounded-3xl mb-6 border border-white/5">
                  <img src={post.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-zinc-600">{post.date}</span>
                  <span className="text-[10px] font-bold text-zinc-700 border border-zinc-800 px-2 py-0.5 rounded">ARTICLE</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{post.title}</h3>
                <p className="text-zinc-500 text-sm line-clamp-3 leading-relaxed">{post.excerpt}</p>
             </motion.div>
           ))}
        </div>

        {/* Newsletter */}
        <section className="mt-40 glass p-12 md:p-20 rounded-[3rem] text-center max-w-5xl mx-auto">
           <h2 className="text-3xl md:text-5xl font-bold mb-6">Stay in motion.</h2>
           <p className="text-zinc-500 mb-10 text-lg">Subscribe to our monthly digest of animation trends and studio updates.</p>
           <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
              <input type="email" placeholder="Email address" className="flex-grow bg-white/5 border border-white/10 rounded-full px-6 py-4 focus:outline-none focus:ring-1 focus:ring-blue-500" />
              <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all">Subscribe</button>
           </div>
        </section>
      </div>
    </div>
  );
};

export default Blog;
