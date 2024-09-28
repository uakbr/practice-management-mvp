// Displays outstanding and paid invoices
import React, { useEffect, useContext } from 'react';
import { getInvoices } from '../services/invoiceService';
import { InvoiceContext } from '../state/invoiceContext';
import { AuthContext } from '../state/authContext';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const InvoiceList = () => {
  const { invoices, setInvoices } = useContext(InvoiceContext);
  const { getToken } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = getToken();
        const response = await getInvoices(token);
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };
    fetchInvoices();
  }, [getToken, setInvoices]);

  const handlePay = (invoiceId) => {
    history.push(`/invoices/${invoiceId}/pay`);
  };

  return (
    <div>
      <Typography variant="h4">My Invoices</Typography>
      <List>
        {invoices.map((invoice) => (
          <ListItem key={invoice._id}>
            <ListItemText
              primary={`Invoice Date: ${new Date(invoice.invoiceDate).toLocaleDateString()}`}
              secondary={`Amount Due: $${invoice.amountDue.toFixed(2)} - Status: ${invoice.status}`}
            />
            {invoice.status === 'unpaid' && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => handlePay(invoice._id)}
              >
                Pay Now
              </Button>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default InvoiceList;