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
import React, { useState, useEffect ,useRef} from "react";
import InputAdornment from "@mui/material/InputAdornment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { BuyTransaction } from "./BuyTransaction";
import { SellTransaction } from "./SellTransaction";
import { TransactionForm } from "./TransactionForm";
import { addUserPortfolio, getUserPortfolioNames } from "../../users/userApi";
import { useContext } from "react";
import { UserContext } from "../../util/context";


export const AddPortfolioForm = ({closeFn}) => {
    const [portfolioName, setPortfolioName] = useState("");
    const [portfolioCreated,setPortfolioCreated]=useState(false);
    const [addTransactions,setAddTransactions]=useState(false);
    const[nameInputError,setNameInputError]=useState({error:false});
    const {userEmail,portfolios,updatePortfolio}=useContext(UserContext);
    const handleNameChange = (event) => {
        setPortfolioName(event.target.value);
    };
    const checkInput=()=>{
        let pfName = portfolioName.trim();
        if(pfName!==""){
            if (portfolios.some(name=>{
                return name.toLowerCase()===pfName.toLowerCase();
            })){
                setNameInputError({error:true,
                    helperText:"Input a UNIQUE(Non Case-sensitive) portfolio name"  });
                setTimeout(()=>setNameInputError({error:false}),1500)
                return false;
            }
            else{
                
                return true;
            }
        }
        else{            
            setNameInputError({error:true,
            helperText:"Input a valid portfolio name"  });
            setTimeout(()=>setNameInputError({error:false}),1000)
            return false;
        }
    }
    const handleCreateClicked=(e)=>{
        e.preventDefault();
        if(checkInput()){
            let pfName = portfolioName.trim();
            addUserPortfolio(userEmail,pfName).then(
                pf=>{
                    console.log(pf);
                    updatePortfolio([...portfolios,pfName])
                }
            );
            setPortfolioCreated(true);
            closeFn();
        }
    }
    const handleAddTransactionsClicked=(e)=>{
        e.preventDefault();
        if(checkInput()){
            let pfName = portfolioName.trim();
            addUserPortfolio(userEmail,pfName).then(
                pf=>{
                    console.log(pf);
                    updatePortfolio([...portfolios,pfName])
                }
            );
            setAddTransactions(true);
        }
    }
  return (
    <>
    
    {!addTransactions?
    <form onSubmit={handleAddTransactionsClicked}>
        <Container sx={{width:'100%'}}>
        <Box sx={{ margin: "20px 0px 20px 0px"}}> 
      <h5>
        Add Portfolio 
        </h5>
        </Box>
        <TextField
        {...nameInputError}
          fullWidth
          sx={{ marginTop: "10px" }}
          variant="outlined"
          label="Portfolio Name"
          name="PortfolioName"
          value={portfolioName}
          onChange={handleNameChange}
        />
        </Container>
        <Container sx={{marginTop:"10px",marginBottom:'10px'}}>
        <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        sx={{ marginRight: "10px" }}
        onClick={handleCreateClicked}
        >
        Create Portfolio
        </Button>
        <Button
        variant="contained"
        color="primary"
        size="large"
        type="button"
        sx={{ marginRight: "10px" }}
        onClick={handleAddTransactionsClicked}
        >
        Add Transactions
        </Button>
        </Container>
    </form>
    :
    <TransactionForm portfolioName={portfolioName} userEmail={userEmail}/>
}
    </>
    
  );
};
