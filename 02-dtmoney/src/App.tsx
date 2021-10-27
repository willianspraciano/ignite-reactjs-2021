import { useState } from 'react';
import Modal from 'react-modal';
import { GlobalStyle } from './styles/global';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTransactionsModal } from './components/NewTransactionsModal';
import { TransactionsContext } from './TransactionContext';

Modal.setAppElement('#root');

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionsContext.Provider value={[]}>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionsModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
      <GlobalStyle />
    </TransactionsContext.Provider>
  );
}
