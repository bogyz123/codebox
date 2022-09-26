import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import RecentPastes from "./RecentPastes";
import "../Styles/Fonts.css";
import "../Styles/Paste.css";



function Paste({ title, author, date, category, body }) {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'row',
            columnGap: '5px', border: '10px solid lime'

        },
        cell: { color: 'crimson', fontFamily: 'Bebas Neue', fontSize: '1.3rem' },
        table: { color: 'red' },
        textarea: {
            maxWidth: '100%',
            minWidth: '100%',
            minHeight: '600px',
            maxHeight: '80%',
            overflow: 'scroll',
            backgroundColor: 'rgb(30,30,30)',
            webkitBoxShadow: '2px 3px 0px 1px rgba(224,101,101,0.98)',
            mozBoxShadow: '2px 3px 0px 1px rgba(224,101,101,0.98)',
            boxShadow: '2px 3px 0px 1px rgba(224,101,101,0.98)',
            color: 'crimson', fontFamily: 'Montserrat', fontSize: '1.2rem',
            padding: '.5rem'

        },
        contentContainer: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '8px'
        }



    }
    
    return (
        <div id='pasteContainer'>
            <div id='recent-pastes'>
                <RecentPastes id='pastes' />
            </div>

            <TableContainer component={Container}>
                <Table >
                    <TableHead >
                        <TableRow >
                            <TableCell style={styles.cell} align="center">Author</TableCell>
                            <TableCell style={styles.cell} align="center">Title</TableCell>
                            <TableCell style={styles.cell} align="center">Content</TableCell>
                            <TableCell style={styles.cell} align="center">Category</TableCell>
                            <TableCell style={styles.cell} align="center">Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell style={styles.cell} component='th' scope='row' align='center'>
                                {author}
                            </TableCell>
                            <TableCell style={styles.cell} component='th' scope='row' align='center'>
                                {title}
                            </TableCell>
                            <TableCell style={styles.cell} component='th' scope='row' align='center'>


                            </TableCell>
                            <TableCell style={styles.cell} component='th' scope='row' align='center'>
                                {category}
                            </TableCell>
                            <TableCell style={styles.cell} component='th' scope='row' align='center'>
                                {date}
                            </TableCell>
                        </TableRow>

                    </TableBody>


                </Table>
                <div style={styles.contentContainer}>
                    <textarea style={styles.textarea} rows='30' columns='40' value={body}></textarea>
                </div>

            </TableContainer>

        </div>

    )
}

export default Paste;