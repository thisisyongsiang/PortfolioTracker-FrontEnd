import { Container } from "@mui/system";
import {
  Box,
  Button,
  TextField,
  FormControl,
  FormLabel,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Select,
  Autocomplete,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useContext } from "react";
import { UserContext } from "../../util/context";
import { addUserPortfolioTransaction, getUserPortfolioAssets } from "../../users/userApi";


export const SellTransaction = ({closeFn,portfolioName,asset}) => {  

  const [values, setValues] = useState({
      price:"",
      ticker:asset?asset: "",
      fees:"",
      quantity:0,
      date:new Date()});
  const [errors, setErrors] = useState({});
  const[pfAssets,setPfAssets]=useState([]);
  const {userEmail,portfolios,updatePortfolio,setTransactionTrigger,transactionTrigger}=useContext(UserContext);
  // on element change, unwrapped the element into name and value, the set values, while the rest remains the same
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  
  const validate = () => {
    let temp = {};
    temp.price = /^[0-9]+\.?[0-9]*$/.test(values.price)
    ? ""
    : "Price is not valid.";
    temp.quantity = /^[0-9]+\.?[0-9]*$/.test(values.quantity)
      ? ""
      : "Quantity is not valid.";
    // temp.quantity=values.quantity<=pfAssets.quantity
    //   ?temp.quantity
    //   : "Quantity more than available"
    temp.fees = /^[0-9]+\.?[0-9]*$/.test(values.fees)
      ? ""
      : "Fees is not valid.";
    temp.date=values.date instanceof Date && !isNaN(values.date)
      ?""
      :"Date is not valid";

    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  useEffect(()=>{
    getUserPortfolioAssets(userEmail,portfolioName).then(d=>{
      setPfAssets(d.map(f=>{return `${f.symbol},${f.shortName}`}));
    })
  },[userEmail,portfolioName]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      let transaction={
        price:values.price,
        ticker:values.ticker,
        fees:values.fees,
        value:values.price*values.quantity,
        quantity:values.quantity,
        date:`${values.date.getUTCFullYear()}-${values.date.getUTCMonth()+1}-${values.date.getUTCDate()}`,
        currency:"usd",
        fxRate:"1"
      }     
      addUserPortfolioTransaction(userEmail,portfolioName,"sell",transaction).then(success=>{
        if (success){
          let trigger=!transactionTrigger;
          setTransactionTrigger(trigger);
          closeFn();
        }
      }); 
    }
  };

  const handleTicker=(e)=>{
    if(!e.target.value)return;
    let ticker=e.target.value.split(',')[0];
    setValues({
      ...values,
      ticker:ticker,
    });
  }
  return (
    <form onSubmit={handleSubmit} >
      <Box sx={{ margin: "0px 20px 20px 20px", fontWeight: "bold" }}> Sell Order </Box>
      <Container>
      <Autocomplete
          defaultValue={values.ticker}
          fullWidth
          disablePortal
          disableCloseOnSelect
          sx={{ marginBottom: "7px" }}
          options={pfAssets}
          onClose={handleTicker}
          renderInput={(params)=>{
            return <TextField {...params}
            required
            variant="outlined" label="Symbol" />
          }}
        />
        <TextField
        
        required
          fullWidth
          sx={{ marginBottom: "7px" }}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start"> USD </InputAdornment>
            ),
          }}
          error={!!errors.price}
          helperText={errors?.price}
          label="Price Per Unit"
          name="price"
          value={values?.price}
          onChange={handleInputChange}
        />
        <TextField
        required
          sx={{ marginBottom: "7px" }}
          fullWidth
          error={!!errors.quantity}
          helperText={errors?.quantity}
          variant="outlined"
          label="Quantity"
          name="quantity"
          value={values?.quantity}
          onChange={handleInputChange}
        />
        <TextField
        required
          sx={{ marginBottom: "7px" }}
          fullWidth
          error={!!errors.fees}
          helperText={errors?.fees}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start"> USD </InputAdornment>
            ),
          }}
          label="Fees"
          name="fees"
          value={values?.fees}
          onChange={handleInputChange}
        />
        <FormControl sx={{width:"100%", marginBottom:"10px"}}>
        <FormLabel sx={{width:"100%", marginBottom:"10px"}}>
          <Box sx={{ pt: 2, fontWeight: "bold" }}>Date of Sale</Box>
        </FormLabel>
        <LocalizationProvider sx={{width:"100%"}}  dateAdapter={AdapterDayjs}>
          <DatePicker
          required
          sx={{width:"100%"}}
          label="Date"
          value={values?.date}
          error={!!errors.date}
          helperText={errors?.date}
          name="date"
            onChange={(e) =>
              {
                let val=new Date(e['$d']);
                handleInputChange({
                target:{name:"date", value:val}
              })}
            }
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        </FormControl>
      </Container>
      <Container sx={{marginTop:"10px",marginBottom:'10px'}}>

        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          sx={{ marginRight: "10px" }}
        >
          {" "}
          Submit{" "}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          sx={{ marginRight: "10px" }}
        >
          {" "}
          Reset{" "}
        </Button>

        
      </Container>
    </form>
  );
};
