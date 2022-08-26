import { AppBar, Container, Toolbar, Typography, Select, MenuItem, createTheme, ThemeProvider } from '@mui/material';
import React from 'react';

const Header = () => {

    // const darkTheme = createTheme({
    //     palette: {
    //         primary: {
    //             main: "#fff",
    //         },
    //         type: "dark",
    //     },
    // });

    return (
        // <ThemeProvider theme = {darkTheme}>
        <AppBar color="primary" position="static">
            <Container>
                <Toolbar>
                    <Typography>
                        Crypto Punks
                    </Typography>

                    <Select variant="outlined" style={{width:100, height:40, marginLeft: 15,}}>
                        <MenuItem>USD</MenuItem>
                        <MenuItem>SGD</MenuItem>
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
        // </ThemeProvider>
    )
}

export default Header 
