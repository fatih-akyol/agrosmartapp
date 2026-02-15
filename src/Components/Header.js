import React from 'react';

const Header = () => (
  <header className="mb-12 border-b border-slate-200 pb-6">
    <div className="flex justify-between items-center max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-black text-green-700 tracking-tighter">AGROSMART</h1>
        <p className="text-slate-500 font-medium">Kurumsal Veri Yönetim Sistemi v1.0</p>
      </div>
      <div className="text-right text-xs text-slate-400 font-mono">
        Sistem Durumu: Çevrimiçi <br /> 
        Operatör: [FATİH AKYOL]
      </div>
    </div>
  </header>
);

export default Header;