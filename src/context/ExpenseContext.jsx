import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { transactions as initialTransactions, financialOverview } from '../data/mockData';

const ExpenseContext = createContext(null);

const STORAGE_KEY = 'fintrack_transactions';

function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialTransactions;
  } catch {
    return initialTransactions;
  }
}

function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch { /* ignore */ }
}

export function ExpenseProvider({ children }) {
  const [transactions, setTransactions] = useState(loadFromStorage);
  const [searchQuery, setSearchQuery] = useState('');

  // Persist every change
  useEffect(() => {
    saveToStorage(transactions);
  }, [transactions]);

  const addTransaction = useCallback((txn) => {
    const newTxn = {
      ...txn,
      id: Date.now(),
      status: 'completed',
    };
    setTransactions(prev => [newTxn, ...prev]);
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  const resetToDefaults = useCallback(() => {
    setTransactions(initialTransactions);
  }, []);

  // Derived analytics (auto-update when transactions change)
  const computed = (() => {
    const totalIncome = transactions
      .filter(t => t.type === 'credit')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'debit')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const savings = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? ((savings / totalIncome) * 100).toFixed(1) : 0;

    return {
      totalIncome,
      totalExpenses,
      savings,
      savingsRate: parseFloat(savingsRate),
      totalBalance: financialOverview.totalBalance + savings - financialOverview.savings,
    };
  })();

  const filteredTransactions = searchQuery
    ? transactions.filter(t =>
        t.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : transactions;

  return (
    <ExpenseContext.Provider value={{
      transactions,
      filteredTransactions,
      computed,
      searchQuery,
      setSearchQuery,
      addTransaction,
      deleteTransaction,
      resetToDefaults,
    }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const ctx = useContext(ExpenseContext);
  if (!ctx) throw new Error('useExpenses must be used inside ExpenseProvider');
  return ctx;
}
