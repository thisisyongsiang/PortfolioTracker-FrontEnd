import { Container } from "@mui/system";
import {
  Box,
  Button,
  TextField,
  RadioGroup,
  FormControl,
  FormLabel,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Radio,
  Select,
  Tabs,
  Tab,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { BuyTransaction } from "./BuyTransaction";
import { SellTransaction } from "./SellTransaction";
import { UserContext } from "../../util/context";


export const TransactionForm = ({portfolioName,closeFn}) => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <Container sx={{width:"100%"}}>
      <Box sx={{ margin: "20px 0px 20px 0px"}}> 
      <h5>
        Add Transaction to {portfolioName} 
        </h5>
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Buy"  id={`tab`} />
        <Tab label="Sell"  id={`tab`}/>
        {/* <Tab label="Transfer"  id={`tab`}/> */}
    </Tabs>
    </Box>
        {value===0&&
        <BuyTransaction closeFn={closeFn} portfolioName={portfolioName}/>
}        {value===1&&
        <SellTransaction closeFn={closeFn} portfolioName={portfolioName}/>
}
    </Container>
  );
};
