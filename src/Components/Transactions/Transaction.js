import React, { useState } from 'react'
import { TransactionForm } from './TransactionForm'
import { Paper } from '@mui/material';
export const Transaction = () => {

  return (
    <>
    <Paper style={{margin:10, padding:3}}>
        <TransactionForm />
    </Paper>
    </>
  )
}
