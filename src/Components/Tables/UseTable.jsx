import { Table, TableBody, TableCell, TableRow, TableHead } from '@mui/material'
import React from 'react'

const UseTable = ({data, header}) => {
    return (
        <>
        <Table>
            <TableHead>
                <TableRow>
                {header?.map((head) => (
                    <TableCell key={head}> {head} </TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data?.map((data) => (
                    <TableRow>
                        <TableCell>{data.name}</TableCell>
                        <TableCell>{data.value}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </>
    );
}

export default UseTable;