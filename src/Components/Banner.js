import { Typography } from '@mui/material'
import React from 'react'

const Banner = () => {
  return (
    <div>
        <Typography variant="h2" style = {{
            fontWeight: "bold",
            marginBottom: 15,
            fontFamily: "Montserrat",
            }} > 
            FinDash 
            </Typography>
        <Typography variant="subtitle2" style = {{
            color: "darkgrey",
            textTransform: "capitalize",
            fontFamily: "Montserrat",
            }} > 
            Your one-stop, value-added portfolio tracker 
            </Typography>
    </div>
  )
}

export default Banner