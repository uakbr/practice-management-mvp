// Context for managing invoice data
import React, { createContext, useState } from 'react';

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);

  const addInvoice = (invoice) => {
    setInvoices([...invoices, invoice]);
  };

  const updateInvoice = (updatedInvoice) => {
    setInvoices((prevInvoices) =>
      prevInvoices.map((inv) =>
        inv._id === updatedInvoice._id ? updatedInvoice : inv
      )
    );
  };

  const removeInvoice = (invoiceId) => {
    setInvoices((prevInvoices) =>
      prevInvoices.filter((inv) => inv._id !== invoiceId)
    );
  };

  return (
    <InvoiceContext.Provider
      value={{
        invoices,
        setInvoices,
        addInvoice,
        updateInvoice,
        removeInvoice,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};