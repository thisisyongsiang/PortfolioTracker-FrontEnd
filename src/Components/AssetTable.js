import { Container } from '@mui/system';
import { Typography, TextField, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, LinearProgress } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../Config/api';

function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const AssetTable = () => {
    const [asset, setAsset] = useState ([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState([]);

    const fetchAsset = async () => {
        setLoading(true);

        const {data} = await axios.get(CoinList("USD"));
        
        setAsset(data);
        setLoading(false);
    };

    console.log(asset);

    useEffect(() => {
        fetchAsset();
    },[]);

    const handleSearch = () => {
        return asset.filter( (item) =>
        item.name.includes(search) || 
        item.symbol.includes(search)
        )
    }
  return (
    <Container>
        <Typography variant="h4" style={{margin: 18, fontFamily: "Montserrat"}}>
            Portfolio Holdings
        </Typography>

        <TextField label="Search for your asset" variant="outlined" style={{ marginBottom:20, width: "100%"}}
        onChange={(input) => setSearch(input.target.value)} />

        <TableContainer>
            {
                loading ? (<LinearProgress style={{backgroundColor: "gold"}}/>)
                : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                    <TableCell key={head}>
                                        {head}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody> 
                            
                            {handleSearch().map((item) => {
                            const profit = item.price_change_percentage_24h > 0;

                            return (
                                <TableRow>
                                    <TableCell component="th" scope="row" style={{display:"flex", gap:15, }} >
                                        <img src={item?.img} alt={item.name} height="50" style ={{ marginBottom: 10 }} />
                                        <div style={{display:"flex", flexDirection:"column"}}>
                                            <span style={{textTransform:"uppercase", fontSize: 22}}> { item.symbol } </span>
                                            <span style={{color:"darkgrey"}}> { item.name } </span>
                                        </div>
                                    </TableCell>
                                    <TableCell align="right">
                                        {numberWithCommas(item.current_price.toFixed(2))}
                                    </TableCell>
                                    <TableCell align="right" style={{color: profit > 0 ? "rgb(14, 203, 129)" : "red", fontWeight: 500,}}>
                                        {profit && "+"}
                                        {item.price_change_percentage_24h.toFixed(2) + "%"}
                                    </TableCell>
                                    <TableCell align="right">
                                        {numberWithCommas(item.market_cap.toString().slice(0,-6)) + "M"}
                                    </TableCell>
                                </TableRow>
                            )

                        })}
                        </TableBody>
                    </Table>
                )
            }
        </TableContainer>
    </Container>
  )
}

export default AssetTable