import styled from "@emotion/styled";
import { Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";

export default function PasteTable({ title, author, pasteId }) {
    const TableCellSTYLED = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: 'rgb(18,18,18)',
            color:'#fff',
            fontFamily: "Kanit, sans-serif", 
            fontSize:'1rem',
            textOverflow: 'ellipsis'
           
        },
        [`&.${tableCellClasses.body}`]: {
            backgroundColor:'rgb(28,28,28)',
            color:'#fff',borderRadius:'0px',
            fontFamily: "Kanit, sans-serif", 
            fontSize:'1.1rem',
            textOverflow: 'ellipsis'
        }
    }))
    
    return (

        <TableContainer component={Paper} sx={{borderRadius:'0'}}>
            <Table sx={{ minWidth: 500 }} size="small"> 
                <TableHead>
                    <TableRow>
                        <TableCellSTYLED>Paste Information</TableCellSTYLED>
                        <TableCellSTYLED align="right">Title</TableCellSTYLED>
                        <TableCellSTYLED align="right">Author</TableCellSTYLED>
                       
                    </TableRow>
                </TableHead>
                <TableBody>

                    <TableRow

                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCellSTYLED component="th" scope="row">
                            {pasteId}
                        </TableCellSTYLED>
                        <TableCellSTYLED align="right">{title}</TableCellSTYLED>
                        <TableCellSTYLED align="right">{author}</TableCellSTYLED>
                      

                    </TableRow>

                </TableBody>
            </Table>
        </TableContainer>
    )
}