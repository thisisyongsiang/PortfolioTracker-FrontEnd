import React, { useContext, useState } from 'react'
import { Paper,
    Container,
    Box, 
    Dialog,
    DialogContent,
    Button,
    TextField} from '@mui/material';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../../util/context';
import CancelIcon from '@mui/icons-material/Cancel';
import { editUserPortfolioName } from "../../users/userApi"


export const EditPortfolioForm = ({open,closeFn,portfolioId,pfNameChanged}) => {
  const {userEmail,portfolios,updatePortfolio}=useContext(UserContext); 
  const [newName,setNewName]=useState('');
  const [editPfName,setEditPfName]=useState(null);
  const[nameInputError,setNameInputError]=useState({error:false});
  const navigate=useNavigate();
  let ht="200px";
  const checkInput=()=>{
    let pfName = newName.trim();
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

  const handleClose=()=>{
    closeFn();
  }

  const handleChange=(event)=>{
    setNewName(event.target.value);
  }
  const handleUpdateClicked=(event)=>{
    event.preventDefault();
    if(checkInput()){
        let pfName = newName.trim();
        editUserPortfolioName(userEmail,portfolioId,pfName).then(
            d=>{
                if(d){
                    let index= portfolios.findIndex(pf=>pf===portfolioId);
                    if(index!==-1){
                        portfolios[index]=pfName;
                        updatePortfolio(portfolios);
                        navigate(`/portfolio/${portfolios[index]}`,{replace:true});
                        closeFn();
                    }
                }
            })
            .catch(e=>{
                console.error(e);
            })
    };

    
  }
  return (
    <Dialog open={open} onClose={handleClose}>
    <DialogContent>
    <Paper id="transactionPaper" sx={{minHeight:ht}}>
        <form onSubmit={handleUpdateClicked}>
        <Container sx={{width:'100%'}}>
        <Box sx={{ margin: "20px 0px 20px 0px"}}> 
        <h5>
        Edit {portfolioId} Name
        </h5>
        </Box>
        <TextField
        {...nameInputError}
        fullWidth
        variant="outlined"
        sx={{ marginTop: "10px",marginBottom: "10px"  }}
        label="New Portfolio Name"
        name="newName"
        value={newName}
        onChange={handleChange}
        />

        </Container>
        <Container sx={{marginTop:"10px",marginBottom:'10px', width:'100%'}}>
        <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        sx={{ marginRight: "10px" }}
        onClick={handleUpdateClicked}
        >
        Update Portfolio Name
        </Button>
        </Container>
        </form>
    </Paper>
        </DialogContent>
        <Button id="transactionCloseButton" onClick={handleClose} startIcon={<CancelIcon />}> </Button>
</Dialog>

  )
}
