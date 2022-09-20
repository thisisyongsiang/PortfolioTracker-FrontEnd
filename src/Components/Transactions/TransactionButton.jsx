import { Button, Typography, TextField, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, LinearProgress } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Transaction } from './Transaction';
import CancelIcon from '@mui/icons-material/Cancel';

export const TransactionButton=({buttonText,asset})=>{
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
    <>
    <Button
    style={{
        padding: "10px",
        marginRight: "10px",
        height: "50%",
        justifyContent: "right",
        backgroundImage:
            "linear-gradient(to bottom right, #2858FE, #7B1DFF)",
        borderRadius: "10px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }} 
        variant="contained"
    startIcon={<AddCircleOutlineIcon />} onClick={handleClickOpen}>{buttonText}</Button>
    <Dialog open={open} onClose={handleClose}>
        <DialogContent> <Transaction  asset={asset}
          closeFn={handleClose}/> </DialogContent>
            <Button id="transactionCloseButton" onClick={handleClose} startIcon={<CancelIcon />}> </Button>
    </Dialog>
    </>
    )
}