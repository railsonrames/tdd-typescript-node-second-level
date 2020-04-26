import TransactionRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Resume {
  transactions: Transaction[];
  balance: {
    income: number;
    outcome: number;
    total: number;
  };
}

class GetBankSatatement {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public execute(): Resume {
    const transactions = this.transactionRepository.all();
    const balance = this.transactionRepository.getBalance();

    return { transactions, balance };
  }
}

export default GetBankSatatement;
