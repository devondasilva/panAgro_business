"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Permet de contrôler le bouton retour physique d'Android
import { 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Info 
} from 'lucide-react';

const DepotPage: React.FC = () => {
  const [amount, setAmount] = useState<string>('50000');
  const [selectedMethod, setSelectedMethod] = useState<string>('mtn');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const paymentMethods = [
    { id: 'mtn', name: 'MTN MoMo', logo: '🟡', desc: 'Push OTP' },
    { id: 'moov', name: 'Moov Money', logo: '🔵', desc: 'Code USSD / SIM' },
    { id: 'wave', name: 'Wave Bénin', logo: '💙', desc: 'Frais 1%' },
    { id: 'card', name: 'Carte Bancaire', logo: '💳', desc: 'Visa / MasterCard' },
  ];

  const amountNum = parseFloat(amount) || 0;
  const fees = selectedMethod === 'wave' ? amountNum * 0.01 : amountNum * 0.012; 
  const totalToPay = amountNum + fees;


    return (
      <div className="min-h-screen bg-[#F8FAF5] flex items-center justify-center p-4 md:p-6 font-sans text-[#1A2F15]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-xl border border-gray-100 max-w-md w-full text-center space-y-6"
        >
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-500">
            <CheckCircle2 size={36} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">Dépôt Réussi !</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">Transaction validée avec succès</p>
          </div>
          <div className="bg-[#F8FAF5] p-5 rounded-xl border border-gray-100 text-left space-y-3 font-bold text-xs md:text-sm">
            <div className="flex justify-between text-gray-500"><span>Montant crédité</span><span className="text-[#1A2F15] font-black">{amountNum.toLocaleString()} FCFA</span></div>
            <div className="flex justify-between text-gray-500"><span>Opérateur</span><span className="uppercase text-xs">{selectedMethod}</span></div>
            <div className="flex justify-between text-gray-500"><span>Destination</span><span className="text-xs">Portefeuille PANAGRO</span></div>
          </div>
          <button 
            onClick={() => { setIsSuccess(false); setAmount('50000'); setPhoneNumber(''); }}
            className="w-full py-4 bg-[#1A2F15] text-white font-black uppercase tracking-widest text-[10px] rounded-xl active:bg-[#8DC63F] active:text-[#1A2F15] transition-all"
          >
            Retour au portefeuille
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 mx-auto space-y-6 bg-[#F8FAF5] min-h-screen font-sans text-[#1A2F15] w-full">
      
      {/* EN-TÊTE SÉCURISÉ */}
      <div className="flex items-center gap-3 border-b border-gray-100/70 pb-4">
        <button 
          disabled={isProcessing}
          className="p-3 bg-white rounded-xl border border-gray-100 text-gray-400 active:text-[#1A2F15] transition-colors shadow-sm disabled:opacity-30"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight uppercase">Approvisionner</h1>
          <p className="text-[9px] md:text-xs text-gray-400 font-bold uppercase tracking-wider mt-0.5">Créditez votre compte PANAGRO</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* --- FORMULAIRE DE FLUX DE DÉPÔT --- */}
        <form onSubmit={handlePaymentSubmit} className="lg:col-span-7 bg-white p-5 md:p-8 rounded-[2rem] md:rounded-[3rem] shadow-sm border border-gray-100 space-y-6">
          
          {/* Étape 1 : Le Montant */}
          <div className="space-y-2">
            <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 block">1. Saisir le montant (FCFA)</label>
            <div className="relative flex items-center bg-[#F8FAF5] rounded-xl border-2 border-transparent focus-within:border-[#8DC63F] overflow-hidden transition-all">
              <input 
                type="number" 
                inputMode="numeric" // <-- OPTIMISATION MOBILE : Force le clavier purement numérique sur iOS/Android
                min="5000"
                step="1000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isProcessing}
                className="w-full p-4 md:p-5 bg-transparent font-black text-xl md:text-2xl outline-none text-[#1A2F15]"
                placeholder="Ex: 50 000"
                required
              />
              <span className="px-4 md:px-6 font-black text-[10px] md:text-xs uppercase tracking-widest text-gray-400 border-l border-gray-200/60">FCFA</span>
            </div>
            <p className="text-[9px] text-gray-400 font-bold italic">Minimum de dépôt requis : 5 000 FCFA</p>
          </div>

          {/* Étape 2 : Le Choix de la Méthode */}
          <div className="space-y-3">
            <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 block">2. Mode de paiement</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {paymentMethods.map((method) => (
                <div 
                  key={method.id}
                  onClick={() => !isProcessing && setSelectedMethod(method.id)}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3.5 ${
                    selectedMethod === method.id 
                      ? 'border-[#8DC63F] bg-[#8DC63F]/5' 
                      : 'border-gray-100 bg-[#F8FAF5] active:border-gray-200'
                  }`}
                >
                  <span className="text-xl md:text-2xl">{method.logo}</span>
                  <div className="min-w-0">
                    <h4 className="text-[11px] md:text-xs font-black uppercase tracking-tight text-[#1A2F15] truncate">{method.name}</h4>
                    <p className="text-[9px] md:text-[10px] text-gray-400 font-medium truncate">{method.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Étape 3 : Saisie du numéro Mobile Money */}
          {selectedMethod !== 'card' && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 block">3. Numéro Mobile Money (+229)</label>
              <div className="flex items-center bg-[#F8FAF5] rounded-xl border-2 border-transparent focus-within:border-[#8DC63F] overflow-hidden transition-all">
                <span className="pl-4 pr-1 font-black text-xs md:text-sm text-gray-400">+229</span>
                <input 
                  type="tel" 
                  inputMode="tel" // <-- OPTIMISATION MOBILE : Force l'affichage du clavier téléphonique avec la touche # et *
                  pattern="[0-9]{8}" // Les numéros au Bénin font 8 chiffres après l'identifiant opérateur/pays historique
                  placeholder="Ex: 61XXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={isProcessing}
                  className="w-full p-3.5 bg-transparent font-bold outline-none text-xs md:text-sm tracking-widest"
                  required
                />
              </div>
            </motion.div>
          )}

          {/* Bouton Soumettre avec Loader Tactile */}
          <button 
            type="submit"
            disabled={isProcessing || amountNum < 5000}
            className="w-full py-4 md:py-5 bg-[#1A2F15] text-white font-black uppercase tracking-[0.15em] text-[10px] rounded-xl active:bg-[#8DC63F] active:text-[#1A2F15] transition-all disabled:opacity-40 flex items-center justify-center gap-2 shadow-md"
          >
            {isProcessing ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Traitement mobile sécurisé...
              </>
            ) : (
              `Confirmer et payer ${amountNum.toLocaleString()} F`
            )}
          </button>
        </form>

        {/* --- PANNEAU RÉCAPITULATIF FACTURATION --- */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#1A2F15] text-white p-6 md:p-8 rounded-[2rem] shadow-xl flex flex-col justify-between overflow-hidden">
            <h3 className="text-[10px] font-black uppercase tracking-wider text-[#8DC63F] mb-4 flex items-center gap-1">
              <Info size={12} /> Facturation Passerelle
            </h3>
            
            <div className="space-y-3 font-bold text-[11px] border-b border-white/5 pb-4">
              <div className="flex justify-between text-gray-400"><span>Montant initial</span><span className="text-white">{amountNum.toLocaleString()} FCFA</span></div>
              <div className="flex justify-between text-gray-400"><span>Frais réseau ({selectedMethod === 'wave' ? '1%' : '1.2%'})</span><span className="text-white">+{fees.toLocaleString()} FCFA</span></div>
            </div>

            <div className="pt-4 flex justify-between items-baseline">
              <span className="text-[9px] uppercase tracking-widest text-gray-400 font-black">Total débité :</span>
              <span className="text-2xl font-black text-[#8DC63F]">{totalToPay.toLocaleString()} <span className="text-[10px] font-bold text-white">FCFA</span></span>
            </div>
          </div>

          {/* SÉCURITÉ MOBILE */}
          <div className="bg-white border border-gray-100 p-5 rounded-xl shadow-sm flex gap-3">
            <ShieldCheck size={28} className="text-[#8DC63F] shrink-0 mt-0.5" />
            <div>
              <h5 className="font-black text-[10px] uppercase tracking-wider mb-0.5">Autorisation Push OTP</h5>
              <p className="text-[10px] text-gray-400 leading-relaxed font-medium">
                Un code ou une invite de validation automatique va s'ouvrir sur votre carte SIM. Ne quittez pas l'application PANAGRO pendant le chargement.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DepotPage;
