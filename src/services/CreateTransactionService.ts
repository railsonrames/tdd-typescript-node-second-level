import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransationDto {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransationDto): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Type of opperation is invalid.');
    }

    const { total } = this.transactionsRepository.getBalance();
    if (type === 'outcome' && value > total) {
      throw new Error('Insufficient funds.');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
