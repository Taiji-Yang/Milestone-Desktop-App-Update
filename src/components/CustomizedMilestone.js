import * as React from 'react';
import { useRef, useCallback, useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';



const CustomizedMilestone = (props) => {
    const { MilestoneData, DateData, updateMilestoneData, updateDateData, DataOnTable, updateDataOnTable, MilestoneToDate} = props;
    const [open, setOpen] = useState(false);
    const [milestone, setMilestone] = useState('');
    const [date, setdate] = useState('');
    const [defaultDate, setdefaultDate] = useState('');
    const [defaultDateShow, setdefaultDateShow] = useState(false);
    const [newDateShow, setnewDateShow] = useState(false);
    if (date) {
        console.log(date)
    }

    const handleChangeDate = (event) => {
        setnewDateShow(true)
        setdefaultDate(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleOK = (event, reason) => {
        let temp = []
        DataOnTable.map((row, index) => {
            let temprow = {"milestone":row["milestone"], "date":row["date"]}
            if(row["date"] == ''){
                if(defaultDate!=""){
                    temprow["date"] = defaultDate
                } else {
                    temprow["date"] = date
                }
            }
            temp.push(temprow)
        });
        updateDataOnTable(temp)
        updateDateData([])
        setMilestone('')
        setdate('')
        setnewDateShow(false)
        setnewDateShow(false)
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    const handleCancel = (event, reason) => {
        setMilestone('')
        setdate('')
        setnewDateShow(false)
        setnewDateShow(false)
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    const StringDateToNumber = {
        'Jan': "01",
        'Feb': "02",
        'Mar': "03",
        'Apr': "04",
        'May': "05",
        'Jun': "06",
        'Jul': "07",
        'Aug': "08",
        'Sep': "09",
        'Oct': "10",
        'Nov': "11",
        'Dec': "12",
    };
    return (
        <div>
            <Button sx={{ width: "18vw", height: "5vw", fontSize: "1.1vw" }} variant="outlined" onClick={handleClickOpen}>Add Date</Button>
            <Dialog disableEscapeKeyDown open={open}>
                <DialogTitle>Please select</DialogTitle>
                <DialogContent sx={{ width: "27vw"}}>
                    <Box component="form"
                        sx={{
                            display: "flex",
                            alignItem: "center",
                            gap: "2vw"
                        }}
                    >
                        <Box sx={{ width: "27vw", height: "15vh", display: "flex", gap: "2%", alignItems: "center", justifyContent: "center" }}>
                            <FormControl sx={{ width: "42%", marginTop: "3vh", marginBottom: "3vh" }}>
                                <InputLabel>Date</InputLabel>
                                <Select
                                    value={defaultDate}
                                    disabled={defaultDateShow}
                                    onChange={handleChangeDate}
                                    input={<OutlinedInput label="Date" />}
                                >
                                    {DateData
                                        .map((date2, index) => {
                                            console.log(date2)
                                            return (
                                                <MenuItem key={date2} value={date2}>{date2}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                            OR
                            <Box
                                sx={{
                                    width: "42%",
                                    marginTop: "3vh", 
                                    marginBottom: "3vh"
                                }}>
                                {/* <DatePicker

                                    label="Date"
                                    openTo="year"
                                    views={['year', 'month', 'day']}
                                    value={date}
                                    onChange={(newValue) => {
                                        let dateArray = newValue.toString().split(" ")
                                        if(dateArray.length >= 4){
                                            setdate(dateArray[3] + "-" + StringDateToNumber[dateArray[1]]+"-"+dateArray[2]);
                                        }
                                    }}
                                    renderInput={(params) => <TextField {...params}/>}

                                /> */}
                                <TextField
                                    label="Date"
                                    type="date"
                                    disabled={newDateShow}
                                    onChange={(newValue) => {
                                        console.log(newValue.target.value)
                                        setdate(newValue.target.value);
                                        setdefaultDateShow(true)
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{
                                        width: "100%",
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleOK}>Ok</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CustomizedMilestone