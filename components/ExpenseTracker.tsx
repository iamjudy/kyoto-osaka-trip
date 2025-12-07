
import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, Wallet, Users, Banknote, Tag } from 'lucide-react';
import { Expense, Payer, ExpenseCategory } from '../types';
import { expenseService } from '../services/expenseService';
import { PAYER_OPTIONS, CATEGORY_OPTIONS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const CategoryBadge: Record<ExpenseCategory, string> = {
  [ExpenseCategory.TRANSPORT]: 'bg-amber-100 text-amber-700',
  [ExpenseCategory.HOTEL]: 'bg-purple-100 text-purple-700',
  [ExpenseCategory.ENTERTAINMENT]: 'bg-blue-100 text-blue-700',
  [ExpenseCategory.FOOD]: 'bg-emerald-100 text-emerald-700',
  [ExpenseCategory.SHOPPING]: 'bg-pink-100 text-pink-700',
  [ExpenseCategory.OTHER]: 'bg-gray-100 text-gray-700',
};

export const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newItem, setNewItem] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [payer, setPayer] = useState<Payer>(Payer.ME);
  const [category, setCategory] = useState<ExpenseCategory>(ExpenseCategory.FOOD);
  const [showAddForm, setShowAddForm] = useState(false);

  const loadExpenses = useCallback(() => {
    setExpenses(expenseService.getAll());
  }, []);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem || !newAmount) return;

    expenseService.add(newItem, Number(newAmount), payer, category);
    setNewItem('');
    setNewAmount('');
    loadExpenses();
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('確定要刪除這筆花費嗎？')) {
      expenseService.delete(id);
      loadExpenses();
    }
  };

  const totalAmount = expenseService.getTotal();
  const payerSummary = expenseService.getByPayer();

  const chartData = Object.entries(payerSummary).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#f43f5e', '#3b82f6', '#10b981']; // Me (Red), Dad (Blue), Mom (Green)

  return (
    <div className="pb-24 pt-4 px-4 space-y-6 animate-fade-in bg-stone-50 min-h-full">
       <div className="text-center space-y-2 mb-2">
        <h2 className="text-2xl font-bold text-stone-800">記帳小幫手</h2>
        <p className="text-stone-500 text-sm">輕鬆記錄每筆開銷</p>
      </div>

      {/* Summary Card */}
      <div className="bg-stone-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Wallet size={100} />
        </div>
        <p className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-1">Total Expenses</p>
        <h3 className="text-4xl font-bold tracking-tight font-mono">NT$ {totalAmount.toLocaleString()}</h3>
        
        <div className="mt-6 flex gap-6">
           {Object.entries(payerSummary).map(([p, amount], idx) => (
             <div key={p} className="flex flex-col">
               <span className="text-[10px] text-stone-400 mb-1 flex items-center gap-1 uppercase font-bold">
                 <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[idx % COLORS.length]}}></div>
                 {p} Paid
               </span>
               <span className="font-mono font-semibold text-lg">NT${amount.toLocaleString()}</span>
             </div>
           ))}
        </div>
      </div>

      {/* Chart */}
      {totalAmount > 0 && (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 20 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={40} tick={{fontSize: 12, fill: '#78716c'}} axisLine={false} tickLine={false} />
              <Tooltip formatter={(value: number) => `NT$${value.toLocaleString()}`} cursor={{fill: '#f5f5f4'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={16}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Add Button */}
      {!showAddForm ? (
        <button 
          onClick={() => setShowAddForm(true)}
          className="w-full bg-white hover:bg-stone-50 text-stone-800 border-2 border-dashed border-stone-300 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <Plus size={20} className="text-stone-400" />
          <span className="text-stone-500">記一筆新花費</span>
        </button>
      ) : (
        <form onSubmit={handleAdd} className="bg-white p-5 rounded-2xl shadow-lg border border-stone-100 space-y-4 animate-slide-up relative z-10">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-lg text-stone-800">New Expense</h3>
            <button type="button" onClick={() => setShowAddForm(false)} className="text-stone-400 hover:text-stone-600 text-sm font-bold">取消</button>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-stone-400 uppercase mb-1">Item</label>
            <input 
              type="text" 
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="項目名稱..." 
              className="w-full bg-stone-50 border-b-2 border-stone-200 p-2 focus:outline-none focus:border-sakura-400 transition-colors text-lg font-bold text-stone-800 placeholder-stone-300"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-400 uppercase mb-1">Amount</label>
              <input 
                type="number" 
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                placeholder="0" 
                className="w-full bg-stone-50 border-b-2 border-stone-200 p-2 focus:outline-none focus:border-sakura-400 transition-colors font-mono text-lg text-stone-800 placeholder-stone-300"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-400 uppercase mb-1">Who Paid?</label>
              <div className="relative">
                <select 
                  value={payer}
                  onChange={(e) => setPayer(e.target.value as Payer)}
                  className="w-full bg-stone-50 border-b-2 border-stone-200 p-2 appearance-none focus:outline-none focus:border-sakura-400 font-bold text-stone-700"
                >
                  {PAYER_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <div className="absolute right-2 top-3 pointer-events-none text-stone-400">
                  <Users size={16} />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-400 uppercase mb-2">Category</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORY_OPTIONS.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat as ExpenseCategory)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                    category === cat 
                      ? 'bg-stone-800 text-white border-stone-800' 
                      : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full bg-sakura-500 text-white font-bold py-3.5 rounded-xl mt-4 hover:bg-sakura-600 shadow-md shadow-sakura-200">
            Confirm
          </button>
        </form>
      )}

      {/* List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-stone-400 text-xs uppercase tracking-widest">Transaction History</h3>
        </div>
        
        {expenses.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-stone-400 text-sm">No expenses yet.</p>
          </div>
        ) : (
          expenses.map((expense) => (
            <div key={expense.id} className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 flex justify-between items-start group">
              <div className="flex gap-3">
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm mt-0.5
                  ${expense.payer === Payer.ME ? 'bg-sakura-500' : expense.payer === Payer.DAD ? 'bg-blue-500' : 'bg-emerald-500'}
                `}>
                  {expense.payer[0]}
                </div>
                <div>
                  <h4 className="font-bold text-stone-800 text-sm leading-tight mb-1">{expense.item}</h4>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${CategoryBadge[expense.category] || 'bg-gray-100'}`}>
                      {expense.category}
                    </span>
                    <span className="text-[10px] text-stone-400">{new Date(expense.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <span className="font-mono font-bold text-stone-800">NT${expense.amount.toLocaleString()}</span>
                <button 
                  onClick={() => handleDelete(expense.id)}
                  className="text-stone-200 hover:text-red-400 p-1 rounded hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
