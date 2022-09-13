import { Container } from "@mui/system";
import {
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import React from "react";
import { BuyTransaction } from "./BuyTransaction";
import { SellTransaction } from "./SellTransaction";


export const TransactionForm = ({portfolioName,closeFn,asset}) => {
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
        <BuyTransaction closeFn={closeFn} portfolioName={portfolioName}  asset={asset} />
}        {value===1&&
        <SellTransaction closeFn={closeFn} portfolioName={portfolioName} asset={asset}/>
}
    </Container>
  );
};
