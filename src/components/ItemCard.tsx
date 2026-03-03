import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRightLeft, Star } from 'lucide-react';
import { Item } from '../types';
import { motion } from 'motion/react';

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-3xl overflow-hidden card-shadow group"
    >
      <Link to={`/item/${item.id}`}>
        <div className="aspect-[4/5] relative overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-olive">
              {item.category}
            </span>
            <span className="bg-brand-terracotta text-white px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
              <Star size={10} fill="currentColor" />
              {item.rating.toFixed(1)}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-xl font-serif font-semibold mb-1 group-hover:text-brand-terracotta transition-colors">
            {item.title}
          </h3>
          <div className="flex items-center gap-1 text-xs text-brand-ink/60 mb-3">
            <MapPin size={12} />
            <span>{item.location}</span>
          </div>
          <div className="pt-3 border-t border-black/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-brand-olive/10 flex items-center justify-center text-[10px] font-bold text-brand-olive">
                {item.ownerName.charAt(0)}
              </div>
              <span className="text-[11px] font-medium">{item.ownerName}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-brand-terracotta uppercase tracking-tighter">
              <ArrowRightLeft size={12} />
              <span>Ingin: {item.desiredExchange}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
