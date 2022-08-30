import { Container } from '@mui/system';
import { Button, TextField, RadioGroup, FormControl, FormLabel, MenuItem, InputLabel, FormControlLabel, Radio, Select} from '@mui/material' ;
import React, { useState, useEffect } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const initialFieldValues = {
    id : 0,
    price: 0,
    quantity: 0, 
    transactionDate: new Date(),
    fees: 0,
    frequency: "monthly",
    purchase: "recurring",
    type: "buy",
}

// const getFrequency = () => ([
//     { id:'1', title: 'Monthly'},
//     { id:'2', title: 'Quarterly'},
//     { id:'3', title: 'Half-Yearly'},
//     { id:'4', title: 'Yearly'},
// ])

export const TransactionForm = () => {

    const [values, setValues] = useState();

    // on element change, unwrapped the element into name and value, the set values, while the rest remains the same
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]:value 
        })
    }
    return (
    <form>
        Add Transaction
        <Container style={{display:"flex", gap:15, }}>
            <TextField variant = "outlined" InputProps={{
                    startAdornment: (<InputAdornment position="start"> USD </InputAdornment>),}} label = "Price Per Unit" name = "pricePerUnit" value = {values?.price} 
                    onChange = {handleInputChange}/>
            <TextField variant = "outlined" label = "Quantity" name = "quantity" value = {values?.quantity} />
            <TextField variant = "outlined" InputProps={{
                    startAdornment: (<InputAdornment position="start"> USD </InputAdornment>),}} label = "Fees" name = "fees" value = {values?.fees} />
        </Container>
        <Container>
            <FormControl>
                <FormLabel>Recurring Purchase</FormLabel>
                <RadioGroup row
                name = "purchase"
                value = {values?.purchase}
                onChange = {handleInputChange}>
                <FormControlLabel value = "recurring" control={<Radio />}  label="Add Recurring Purchase"/>
                <FormControlLabel value = "onceOff" control={<Radio />}  label="Once-Off Purchase"/>
                </RadioGroup>
            </FormControl>
            </Container>
        <Container>
            <FormControl>
                <InputLabel>Frequency</InputLabel>
                <Select name = "frequency" value = {values?.frequency} onChange = {handleInputChange}>
                    <MenuItem value="monthly"> Monthly </MenuItem>
                    <MenuItem value="quarterly"> Quarterly </MenuItem>
                    <MenuItem value="halfYearly"> Half-Yearly </MenuItem>
                    <MenuItem value="yearly"> Yearly </MenuItem>
                    {/* getFrequency.map(
                        item => (<MenuItem value={item.id}> {item.title} </MenuItem>)) */}
                </Select>
            </FormControl>
        </Container>
        <Container>
           <LocalizationProvider dateAdapter={AdapterDayjs}>
           <DatePicker
                label="Date"
                value="date"
                onChange={handleInputChange}
                renderInput={(params) => <TextField {...params} />}/>
            </LocalizationProvider>
        </Container>

        <Container>
            <Button variant = "contained" color = "primary" size = "large" type="submit" > Submit </Button>
            <Button variant = "outlined" color = "primary" size = "large" > Reset </Button>
        </Container>

    </form>
        
  )
}
