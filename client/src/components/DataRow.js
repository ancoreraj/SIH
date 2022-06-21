import { Collapse, IconButton, TableCell, TableRow, Tooltip, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react'

const Row = ({ job }) => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <TableRow hover>
                <TableCell>{job.date}</TableCell>
                <TableCell>{job.name}</TableCell>
                <TableCell><a style={{ textDecoration: 'none' }} href={job.link}>Apply Here</a></TableCell>
                <TableCell>
                    <Tooltip title="Read more">
                        <IconButton size='small' onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                    <Collapse in={open} timeout="auto" unmountOnExit sx={{ py: 2 }}>
                        <Typography variant="h6">
                            Description
                        </Typography>
                        <Typography variant="caption" gutterBottom component="p" sx={{ color: '#424242' }}>
                            {job.description}
                        </Typography>
                    </ Collapse>
                </TableCell>
            </TableRow>
        </>

    )
}

export default Row