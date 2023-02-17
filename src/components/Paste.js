import { Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import "../styles/Paste.css";

export default function Paste({title, author, content})
{
    return (
        <TableContainer>
           <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Author</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Content</TableCell>
                </TableRow>
            </TableHead>
           </Table>
        </TableContainer>
    )
}