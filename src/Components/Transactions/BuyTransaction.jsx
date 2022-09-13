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
import { deBounce } from "../../util/util";
import { searchAsset } from "../../FinanceRoutes/financeAPI";
import { useContext } from "react";
import { UserContext } from "../../util/context";
import { addUserPortfolioTransaction } from "../../users/userApi";
import { useParams } from "react-router-dom";


export const BuyTransaction = ({closeFn,portfolioName}) => {  
  const routeParam=useParams();
  const [values, setValues] = useState({
    price:"",
    ticker:routeParam.assetId?routeParam.assetId: "",
    fees:"",
    quantity:0,
    date:new Date()});
  const [errors, setErrors] = useState({});
  const[addRecurring,setAddRecurring]=useState(false);
  const[searchOptions,setSearchOptions]=useState([routeParam.assetId?routeParam.assetId: null]);
  const {userEmail,portfolios,updatePortfolio,setTransactionTrigger,transactionTrigger}=useContext(UserContext);
  // on element change, unwrapped the element into name and value, the set values, while the rest remains the same
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleRecurringPurchaseClicked=(e)=>{
    setAddRecurring(e.target.checked);
  }

  const validate = () => {
    let temp = {};
    temp.price = /^[0-9]+\.?[0-9]*$/.test(values.price)
    ? ""
    : "Price is not valid.";
    temp.quantity = /^[0-9]+\.?[0-9]*$/.test(values.quantity)
      ? ""
      : "Quantity is not valid.";
    temp.fees = /^[0-9]+\.?[0-9]*$/.test(values.fees)
      ? ""
      : "Fees is not valid.";
    temp.date=values.date instanceof Date && !isNaN(values.date)
      ?""
      :"Date is not valid";
    if(addRecurring){
      temp.frequency=values.frequency
      ?""
      :"No Frequency Input";
    }
    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

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
      addUserPortfolioTransaction(userEmail,portfolioName,"buy",transaction).then(success=>{
        if (success){
          let trigger=!transactionTrigger;
          setTransactionTrigger(trigger);
          closeFn();
        }
      }); 
    }
  };
  const handleSearch=deBounce((query)=>{
    query=query.trim();
    if (query===''){
      setSearchOptions([]);
      return;
    }
    searchAsset(query).then(d=>{
      setSearchOptions(d.map(f=>{return `${f.symbol},${f.shortname}`}));
    });
  },300);
  const handleSearchChange=(e)=>{
    handleSearch(e.target.value);
  }
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
      <Box sx={{ margin: "0px 20px 20px 20px", fontWeight: "bold" }}> Buy Order </Box>
      <Container>
      <Autocomplete
          defaultValue={values.ticker}
          fullWidth
          disablePortal
          disableCloseOnSelect
          sx={{ marginBottom: "7px" }}
          options={searchOptions}
          onClose={handleTicker}
          filterOptions={(x)=>x}
          getOptionLabel={(x)=>x?x:""}
          renderInput={(params)=>{
            return <TextField {...params}
            required
            onChange={handleSearchChange}
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
          value={values.price}
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
          value={values.quantity}
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
          value={values.fees}
          onChange={handleInputChange}
        />
        <FormControl sx={{width:"100%", marginBottom:"10px"}}>
        <FormLabel sx={{width:"100%", marginBottom:"10px"}}>
          <Box sx={{ pt: 2, fontWeight: "bold" }}>Date of Purchase</Box>
        </FormLabel>
        <LocalizationProvider sx={{width:"100%"}}  dateAdapter={AdapterDayjs}>
          <DatePicker
          required
          sx={{width:"100%"}}
          label="Date"
          value={values.date}
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
        {/* <FormControl>
          <FormLabel>
            <Box sx={{ pt: 2, fontWeight: "bold" }}> Recurring Purchase </Box>{" "}
          </FormLabel>
            <FormControlLabel
                value="recurring"
                control={<Checkbox />}
                label="Add Recurring Purchase"
                onChange={handleRecurringPurchaseClicked}
            />
        </FormControl> */}
        
        {
        // addRecurring&&
        // <>
        // <FormControl sx={{width:"100%"}}>
        //   <FormLabel sx={{width:"100%", marginBottom:"10px"}}>
        //     <Box sx={{ pt: 2, fontWeight: "bold" }}>Frequency</Box>
        //   </FormLabel>
        //   <Select 
        //   sx={{width:"100%"}}
        //     error={!!errors.frequency}
        //     helperText={errors?.frequency}
        //     name="frequency"
        //     value={values.frequency}
        //     onChange={handleInputChange}
        //   >
        //     <MenuItem value="monthly"> Monthly </MenuItem>
        //     <MenuItem value="quarterly"> Quarterly </MenuItem>
        //     <MenuItem value="halfYearly"> Half-Yearly </MenuItem>
        //     <MenuItem value="yearly"> Yearly </MenuItem>
        //     {/* getFrequency.map(
        //                 item => (<MenuItem value={item.id}> {item.title} </MenuItem>)) */}
        //   </Select>
        // </FormControl >
        // </>
        }
        
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
