import React from 'react';
import { Item } from '../types';
import { motion } from 'motion/react';
import { Settings, MapPin, Package, Star, LogOut } from 'lucide-react';

interface ProfileProps {
  myItems: Item[];
}

export function Profile({ myItems }: ProfileProps) {
  return (
    <div className="pb-24 pt-8 md:pt-24 px-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full md:w-1/3 bg-white rounded-[40px] p-8 card-shadow text-center"
        >
          <div className="w-32 h-32 rounded-full bg-brand-olive/10 flex items-center justify-center text-5xl font-bold text-brand-olive mx-auto mb-6">
            L
          </div>
          <h2 className="text-3xl font-serif font-bold mb-1">Lasarus Anjur</h2>
          <p className="text-brand-ink/40 text-sm mb-6">Bergabung sejak Maret 2024</p>
          
          <div className="flex justify-center gap-4 mb-8">
            <div className="text-center">
              <p className="font-bold text-xl">{myItems.length}</p>
              <p className="text-[10px] uppercase tracking-widest text-brand-ink/40">Barang</p>
            </div>
            <div className="w-px h-8 bg-black/5 self-center" />
            <div className="text-center">
              <p className="font-bold text-xl">12</p>
              <p className="text-[10px] uppercase tracking-widest text-brand-ink/40">Berhasil</p>
            </div>
            <div className="w-px h-8 bg-black/5 self-center" />
            <div className="text-center">
              <p className="font-bold text-xl">4.9</p>
              <p className="text-[10px] uppercase tracking-widest text-brand-ink/40">Rating</p>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full py-3 bg-brand-cream text-brand-ink rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-brand-olive/5 transition-all">
              <Settings size={18} />
              Pengaturan Profil
            </button>
            <button className="w-full py-3 text-rose-500 font-bold text-sm flex items-center justify-center gap-2 hover:bg-rose-50 rounded-2xl transition-all">
              <LogOut size={18} />
              Keluar
            </button>
          </div>
        </motion.div>

        <div className="flex-1 w-full">
          <h3 className="text-2xl font-serif font-bold mb-6">Barang Saya</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {myItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl overflow-hidden card-shadow flex"
              >
                <img src={item.image} className="w-24 h-full object-cover" />
                <div className="p-4 flex-1">
                  <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                  <p className="text-[10px] text-brand-ink/40 mb-2">{item.category}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-[10px] font-bold text-brand-terracotta uppercase">Ingin: {item.desiredExchange}</span>
                    <button className="text-[10px] font-bold text-brand-olive underline">Edit</button>
                  </div>
                </div>
              </motion.div>
            ))}
            {myItems.length === 0 && (
              <div className="col-span-full py-12 bg-white rounded-3xl text-center border-2 border-dashed border-brand-olive/10">
                <p className="text-brand-ink/40 italic">Kamu belum mendaftarkan barang.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
