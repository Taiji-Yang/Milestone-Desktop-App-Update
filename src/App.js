import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import AddMilestone from "./components/AddMilestone"
import AddDate from "./components/AddDate"
import MyToolbar from "./components/MyToolbar"
import MilestoneTableHead from "./components/MilestoneTableHead"

export default function App() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = useState([]);
    const [selectedDate, setSelectedDate] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [MilestoneData, updateMilestoneData] = useState([]);
    const [DateData, updateDateData] = useState([]);
    const [DataOnTable, updateDataOnTable] = useState([{ "milestone": "Example Milestone", "date": "2030-01-01" }]);
    const [DefaultDates, updateDefaultDates] = useState([]);
    const [DefaultMilestones, updateDefaultMilestones] = useState([]);
    const [MilestoneToDate, updateMilestoneToDate] = useState([]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = DataOnTable.map((n) => n["milestone"]);
            const newselectedDate = DataOnTable.map((n) => n["date"]);
            setSelected(newSelecteds);
            setSelectedDate(newselectedDate);
            return;
        }
        setSelected([]);
        setSelectedDate([]);
    };

    const handleClick = (event, name, date) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        let newselectedDate = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
            newselectedDate = newselectedDate.concat(selectedDate, date);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
            newselectedDate = newselectedDate.concat(selectedDate.slice(1))
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
            newselectedDate = newselectedDate.concat(selectedDate.slice(0, -1))
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
            newselectedDate = newselectedDate.concat(
                newselectedDate.slice(0, selectedIndex),
                newselectedDate.slice(selectedIndex + 1),
            )
        }

        setSelected(newSelected);
        setSelectedDate(newselectedDate);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const clearSelected = () => {
        setSelected([])
        setSelectedDate([])
    }
    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - DataOnTable.length) : 0;

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <Box
                sx={{
                    width: '90%',
                    height: '90%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4vh'
                    // borderRadius: "0.25em",
                    // border: "1px solid lightgrey"
                }}>
                <p style={{ fontSize: "3.5vw", margin: "0px", fontFamily: "Verdana" }}>Milestones Board</p>
                <Paper
                    sx={{
                        width: '80%',
                    }}
                    elevation={5}
                >
                    <MyToolbar
                        numSelected={selected.length}
                        selected={selected}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        clearSelected={clearSelected}
                        updateDataOnTable={updateDataOnTable}
                        DataOnTable={DataOnTable}
                        MilestoneData={MilestoneData}
                        DateData={DateData}
                        updateMilestoneData={updateMilestoneData}
                        updateDateData={updateDateData}
                        DefaultDates={DefaultDates}
                        DefaultMilestones={DefaultMilestones}
                        updateDefaultDates={updateDefaultDates}
                        updateDefaultMilestones={updateDefaultMilestones}
                        updateMilestoneToDate={updateMilestoneToDate}
                    />
                    <TableContainer>
                        <Table
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <MilestoneTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={DataOnTable.length}
                            />
                            <TableBody>
                                {DataOnTable
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        console.log("DataOnTable!!: ",DataOnTable);
                                        const isItemSelected = isSelected(row["milestone"]);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row["milestone"], row["date"])}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row["milestone"]}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>

                                                <TableCell align="center">{row["milestone"]}</TableCell>
                                                <TableCell align="center">{row["date"]}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 53 * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={2} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5]}
                        component="div"
                        count={DataOnTable.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                <Box
                    sx={{
                        width: '80%',
                        height: '9%',
                        // borderRadius: "0.25em",
                        // border: "1px solid lightgrey",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Box
                        sx={{
                            width: '50%',
                            height: '100%',
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "10%",
                        }}
                    >
                        <AddMilestone
                            MilestoneData={MilestoneData}
                            DateData={DateData}
                            updateMilestoneData={updateMilestoneData}
                            updateDateData={updateDateData}
                            DataOnTable={DataOnTable}
                            updateDataOnTable={updateDataOnTable}
                            MilestoneToDate={MilestoneToDate}
                        >
                        </AddMilestone>
                        <AddDate
                            MilestoneData={MilestoneData}
                            DateData={DateData}
                            updateMilestoneData={updateMilestoneData}
                            updateDateData={updateDateData}
                            DataOnTable={DataOnTable}
                            updateDataOnTable={updateDataOnTable}
                            MilestoneToDate={MilestoneToDate}
                        >
                        </AddDate>
                    </Box>
                </Box>
            </Box>
        </Box >
    );
}

