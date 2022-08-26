import { Container } from '@mui/system';
import { Typography, TextField, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, LinearProgress } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../Config/api';


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
        return asset.filter( (asset) =>
        asset.name.toLowercase().includes(search) || asset.symbol.toLowercase().includes(search)
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
                        </TableBody>
                    </Table>
                )
            }
        </TableContainer>
    </Container>
  )
}

export default AssetTable