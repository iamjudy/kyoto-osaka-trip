import { Expense, Payer, ExpenseCategory } from '../types';

const STORAGE_KEY = 'kyoto_trip_expenses_v2';

const INITIAL_DATA: Expense[] = [
  {
    id: 'init-1',
    item: '來回機票',
    amount: 35253,
    payer: Payer.ME,
    date: new Date('2025-12-07').toISOString(),
    category: ExpenseCategory.TRANSPORT
  },
  {
    id: 'init-2',
    item: '奈良一日遊',
    amount: 3813,
    payer: Payer.DAD,
    date: new Date('2025-12-07').toISOString(),
    category: ExpenseCategory.ENTERTAINMENT
  },
  {
    id: 'init-3',
    item: '三井花園飯店 京都四條',
    amount: 7068,
    payer: Payer.DAD,
    date: new Date('2025-12-07').toISOString(),
    category: ExpenseCategory.HOTEL
  },
  {
    id: 'init-4',
    item: 'JR 關西機場特快 HARUKA 車票',
    amount: 1335,
    payer: Payer.DAD,
    date: new Date('2025-12-07').toISOString(),
    category: ExpenseCategory.TRANSPORT
  }
];

export const expenseService = {
  getAll: (): Expense[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        // Seed initial data if empty
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
        return INITIAL_DATA;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error("Error loading expenses", e);
      return [];
    }
  },

  add: (item: string, amount: number, payer: Payer, category: ExpenseCategory): Expense => {
    const newExpense: Expense = {
      id: Date.now().toString(),
      item,
      amount,
      payer,
      date: new Date().toISOString(),
      category
    };
    
    const expenses = expenseService.getAll();
    expenses.unshift(newExpense); // Add to top
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    return newExpense;
  },

  delete: (id: string): Expense[] => {
    const expenses = expenseService.getAll();
    const newExpenses = expenses.filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newExpenses));
    return newExpenses;
  },

  getTotal: (): number => {
    const expenses = expenseService.getAll();
    return expenses.reduce((acc, curr) => acc + curr.amount, 0);
  },
  
  getByPayer: (): Record<Payer, number> => {
      const expenses = expenseService.getAll();
      const initial: Record<Payer, number> = {
          [Payer.ME]: 0,
          [Payer.DAD]: 0,
          [Payer.MOM]: 0
      };
      
      return expenses.reduce((acc, curr) => {
          if (acc[curr.payer] !== undefined) {
              acc[curr.payer] += curr.amount;
          }
          return acc;
      }, initial);
  }
};