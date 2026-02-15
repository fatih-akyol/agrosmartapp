import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Header from './Components/Header';
import ReportForm from './Components/ReportForm';
import Dashboard from './Pages/Dashboard';
import { AGRO_DATA_STORE } from './Interfaces/PlantReport';

function AppTemp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reports, setReports] = useState(AGRO_DATA_STORE);
  const [activeTab, setActiveTab] = useState('dashboard'); // Sayfa kontrolü
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [stock, setStock] = useState(74);
  const [darkMode, setDarkMode] = useState(false);

  // Grafik Verileri
  const chartData = [
    { name: 'Aktif', value: reports.filter(r => r.status === 'Analiz Ediliyor').length },
    { name: 'Kapalı', value: reports.filter(r => r.status === 'Kapatıldı').length },
  ];
  const COLORS = ['#22c55e', '#3b82f6'];

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.username === 'admin' && loginData.password === 'agro123') {
      setIsLoggedIn(true);
      const msg = new SpeechSynthesisUtterance("Agro Smart Sistemine Giriş Yapıldı.");
      window.speechSynthesis.speak(msg);
    } else {
      alert('Hatalı Giriş!');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden relative font-sans">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-green-500 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500 rounded-full blur-[100px] animate-pulse delay-700"></div>
        </div>
        
        <div className="max-w-md w-full bg-white/5 backdrop-blur-xl rounded-[3rem] shadow-2xl p-12 border border-white/10 z-10 transition-all hover:border-green-500/30">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 tracking-tighter italic">AGRO</h1>
            <p className="text-white/40 text-[10px] uppercase tracking-[0.5em] mt-4 font-bold">Smart Management v4.0</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="text" placeholder="Kullanıcı" 
              className="w-full p-5 bg-white/5 border border-white/10 rounded-[1.5rem] text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all text-sm"
              onChange={(e) => setLoginData({...loginData, username: e.target.value})}
            />
            <input 
              type="password" placeholder="Şifre" 
              className="w-full p-5 bg-white/5 border border-white/10 rounded-[1.5rem] text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all text-sm"
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
            />
            <button className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white font-black py-5 rounded-[1.5rem] shadow-xl active:scale-95 transition-all uppercase text-sm tracking-widest">
              Sistemi Başlat
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-[#f8fafc]'} transition-colors duration-500 flex`}>
      
      {/* SOL MENÜ (NAVİGASYON) */}
      <aside className="w-20 lg:w-64 bg-white border-r border-slate-200 p-6 flex flex-col items-center lg:items-start sticky top-0 h-screen">
        <h2 className="text-2xl font-black text-green-700 mb-12 hidden lg:block tracking-tighter italic underline decoration-blue-500">AGRO SMART</h2>
        <nav className="space-y-4 w-full">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${activeTab === 'dashboard' ? 'bg-green-600 text-white shadow-lg scale-105' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <span className="text-xl">📊</span> <span className="hidden lg:block text-sm">Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('takvim')} 
            className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${activeTab === 'takvim' ? 'bg-green-600 text-white shadow-lg scale-105' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <span className="text-xl">📅</span> <span className="hidden lg:block text-sm">Takvim</span>
          </button>
          <button 
            onClick={() => setActiveTab('stoklar')} 
            className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${activeTab === 'stoklar' ? 'bg-green-600 text-white shadow-lg scale-105' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <span className="text-xl">📦</span> <span className="hidden lg:block text-sm">Stoklar</span>
          </button>
          <div className="mt-auto pt-10">
             <button onClick={() => setDarkMode(!darkMode)} className="p-4 bg-slate-100 rounded-2xl w-full text-lg border border-slate-200">
                {darkMode ? '☀️' : '🌙'}
             </button>
          </div>
        </nav>
      </aside>

      {/* ANA İÇERİK ALANI */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        
        {/* ÜST BAR */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Kurumsal Panel</h1>
            <p className="text-slate-400 text-xs font-bold uppercase mt-1">CEO: Doğukan Tunca</p>
          </div>
          <div className="flex gap-4">
             <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-center">
                <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Genel İlaç Stoğu</p>
                <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-green-500 transition-all duration-700" style={{width: `${stock}%`}}></div>
                </div>
             </div>
          </div>
        </div>

        {/* 1. SAYFA: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 animate-in fade-in duration-500">
            <div className="xl:col-span-2 space-y-10">
              <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-white">
                <h3 className="text-xl font-black text-slate-800 mb-8 border-l-8 border-green-500 pl-4 italic">Analiz Veri Girişi</h3>
                <ReportForm onAdd={(d) => {
                   setReports([{id: Date.now(), ...d, status: 'Analiz Ediliyor'}, ...reports]);
                   setStock(prev => Math.max(0, prev - 4));
                }} />
              </div>
              <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
                <Dashboard reports={reports} onDelete={(id) => setReports(reports.filter(r => r.id !== id))} onUpdate={(id) => setReports(reports.map(r => r.id === id ? {...r, status: 'Kapatıldı'} : r))} />
              </div>
            </div>

            <div className="space-y-10">
               <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-200">
                  <h3 className="text-xs font-black text-slate-400 uppercase mb-6 italic">Canlı Saha Takibi</h3>
                  <div className="space-y-4">
                     {['Sedanur G.', 'İrem A.', 'Zeynep A.'].map((name, i) => (
                        <div key={i} className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl hover:bg-slate-100 transition">
                           <span className="text-xs font-bold text-slate-700">{name}</span>
                           <span className="flex h-3 w-3 rounded-full bg-green-500 animate-ping"></span>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-[3rem] text-white shadow-xl">
                  <p className="text-[10px] font-bold opacity-60 uppercase mb-2">Yaklaşan Hasat</p>
                  <h4 className="text-2xl font-black underline italic">12 ŞUBAT 2026</h4>
                  <p className="text-[10px] mt-4 font-bold bg-white/20 p-2 rounded-xl text-center">SÖKE OVASI - PAMUK HASADI</p>
               </div>
            </div>
          </div>
        )}

        {/* 2. SAYFA: TAKVİM */}
        {activeTab === 'takvim' && (
          <div className="animate-in slide-in-from-bottom-5 duration-500 bg-white p-12 rounded-[3rem] shadow-xl border">
            <h2 className="text-3xl font-black text-slate-800 mb-8">📅 Operasyonel Takvim</h2>
            <div className="grid grid-cols-1 gap-6">
               <div className="p-8 bg-green-50 rounded-[2.5rem] border-l-8 border-green-500">
                  <p className="text-green-700 font-black text-2xl underline mb-2">12 ŞUBAT 2026</p>
                  <p className="font-bold text-slate-700 uppercase tracking-[0.2em] text-sm">🌾 Söke Ovası - Büyük Hasat Günü</p>
                  <p className="text-slate-500 text-xs mt-4 leading-relaxed italic">CEO Doğukan Tunca liderliğinde tüm ekipler sahada olacaktır.</p>
               </div>
               <div className="p-8 bg-slate-50 rounded-[2.5rem] border-l-8 border-slate-200 opacity-50 font-medium italic text-slate-400">
                  <p>20 Şubat 2026 - Bölgesel Gübreleme Planlaması (Taslak)</p>
               </div>
            </div>
          </div>
        )}

        {/* 3. SAYFA: STOKLAR */}
        {activeTab === 'stoklar' && (
          <div className="animate-in slide-in-from-right-10 duration-500">
            <h2 className="text-3xl font-black text-slate-800 mb-8">📦 Ambar & Kaynak Yönetimi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
                  <p className="text-xs font-black text-slate-400 uppercase mb-6">Mevcut İlaç Rezervi</p>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-6xl font-black text-green-600">%{stock}</span>
                    <span className="text-slate-400 font-bold uppercase text-xs">Aktif Stok</span>
                  </div>
                  <div className="w-full h-6 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div className="h-full bg-green-500 transition-all duration-1000 shadow-[0_0_20px_rgba(34,197,94,0.5)]" style={{width: `${stock}%`}}></div>
                  </div>
               </div>
               <div className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col justify-center shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
                  <p className="text-green-400 text-xs font-bold uppercase mb-4 tracking-widest italic">Kritik Stok Uyarısı</p>
                  <p className="text-sm leading-relaxed opacity-80">Stok seviyesi düştüğünde sistem otomatik olarak Satın Alım Sorumlusu <span className="text-green-400 font-bold underline">İrem Akıcı</span>'ya sipariş emri gönderir.</p>
               </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default AppTemp;