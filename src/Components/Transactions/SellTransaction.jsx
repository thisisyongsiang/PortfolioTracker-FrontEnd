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
  Autocomplete,
  CssBaseline,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { deBounce } from "../../util/util";
import { searchAsset } from "../../FinanceRoutes/financeAPI";


export const SellTransaction = () => {
  const [values, setValues] = useState();
  const [errors, setErrors] = useState({});
    const[addRecurring,setAddRecurring]=useState(false);
    const[searchOptions,setSearchOptions]=useState([]);
  // on element change, unwrapped the element into name and value, the set values, while the rest remains the same
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(values);
    console.log(name);
    console.log(value);
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleRecurringPurchaseClicked=(e)=>{
    setAddRecurring(e.target.checked);
  }
  const convertoDefEventPara = (name, value) => ({
    target: [name, value],
  });

  const validate = () => {
    let temp = {};
    temp.price = values.price ? "" : "This field is required.";
    temp.quantity = /^[0-9]*$/.test(values.quantity)
      ? ""
      : "Quantity is not valid.";
    temp.purchase = values.purchase ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = () => {
    if (validate()) window.alert("testing...");
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
  return (
    <form onSubmit={handleSubmit} >
      <Box sx={{ margin: "0px 20px 20px 20px", fontWeight: "bold" }}> Sell Order </Box>
      <Container>
      <Autocomplete
          fullWidth
          disablePortal
          disableCloseOnSelect
          sx={{ marginBottom: "7px" }}
          options={searchOptions}
          filterOptions={(x)=>x}
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
          label="Price Per Unit"
          name="pricePerUnit"
          value={values?.price}
          onChange={handleInputChange}
        />
        <TextField
        required
          sx={{ marginBottom: "7px" }}
          fullWidth
          variant="outlined"
          label="Quantity"
          name="quantity"
          value={values?.quantity}
        />
        <TextField
        required
          sx={{ marginBottom: "7px" }}
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start"> USD </InputAdornment>
            ),
          }}
          label="Fees"
          name="fees"
          value={values?.fees}
        />
        <FormControl sx={{width:"100%", marginBottom:"10px"}}>
        <FormLabel sx={{width:"100%", marginBottom:"10px"}}>
          <Box sx={{ pt: 2, fontWeight: "bold" }}>Date of Sale</Box>
        </FormLabel>
        <LocalizationProvider sx={{width:"100%"}}  dateAdapter={AdapterDayjs}>
          <DatePicker
          sx={{width:"100%"}}
            label="Date"
            value={values?.date}
            name="date"
            onChange={(e) =>
              handleInputChange(
                convertoDefEventPara(e.target.name, e.target.date)
              )
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
