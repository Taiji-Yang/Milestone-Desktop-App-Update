import React, { useEffect, useState } from "react";
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const MyToolbar = (props) => {
    const { numSelected, selected, selectedDate, setSelectedDate, clearSelected, updateDataOnTable, DataOnTable, MilestoneData, DateData, updateMilestoneData, updateDateData, DefaultDates, DefaultMilestones, updateDefaultDates, updateDefaultMilestones, updateMilestoneToDate} = props;
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [numSaved, setNumSaved] = useState(0);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setOpenError(false);
    };
    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setOpenError(false);
    };
    const deleteItem = () => {
        console.log(selected, selectedDate);
        updateDataOnTable(DataOnTable.filter(item => (!selected.includes(item["milestone"]))));
        if (selected && selected != '' && selected.length != 0) {
            let intersectionMilestone = DefaultMilestones.filter(value => selected.includes(value))
            let intersectionDate = DefaultDates.filter(value => selectedDate.includes(value))
            console.log(intersectionMilestone, intersectionDate, "*************", selected, selectedDate, DefaultMilestones, DefaultDates)
            if (intersectionMilestone.length > 0) {
                updateMilestoneData([...MilestoneData, ...intersectionMilestone].filter(item => item != ''))
            }
        }
        clearSelected();
    };
    const handleDownload = () => {
        console.log("DataOnTable", DataOnTable)
        fetch('/PostData',
            {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-type': 'application/json' },
                body: JSON.stringify({ DataOnTable: DataOnTable })
            }).then((res) => res.json()).then((data) => {
                console.log(data)
                if(data['status'] == 'ok'){
                    setNumSaved(DataOnTable.length)
                    setOpen(true);
                } else {
                    setOpenError(true)
                }
            })
    }
    const handleUpload = () => {
        fetch('/GetData').then((res) => res.json()).then((data) => {
            console.log(data["Milestones"], data["Dates"]);
            updateMilestoneData(data["Milestones"]);
            updateDateData([]);
            updateDefaultDates(data["Dates"]);
            updateDefaultMilestones(data["Milestones"]);
            let temp = {};
            for(let i=0; i<data["Milestones"].length; i++){
                temp[data["Milestones"][i]] = data["Dates"][i]
            }
            console.log(temp)
            updateMilestoneToDate(temp)
        })
    }
    console.log("???", MilestoneData)

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                display: "flex",
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                })
            }}
        >
            <Box sx={{ Height: "100%", width: "96%", display: "flex", alignItems: "center" }}>
                {numSelected > 0 ? (
                    <Typography
                        sx={{ Height: "100%", width: "11%" }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography
                        sx={{ Height: "100%", width: "22%" }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Recorded Milestone
                    </Typography>
                )}
                {numSelected > 0 ? (
                    <Box
                        sx={{
                            // backgroundColor: "yellow",
                            width: "89%"
                        }}
                    >
                        <input type='file' hidden />
                        <Tooltip title="Upload Data">
                            <IconButton onClick={handleUpload}>
                                <UploadFileOutlinedIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                        <input type='file' hidden />
                        <Tooltip title="Download Data">
                            <IconButton onClick={handleDownload}>
                                <FileDownloadOutlinedIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            // backgroundColor: "yellow",
                            width: "78%"
                        }}
                    >
                        <input type='file' hidden />
                        <Tooltip title="Upload Data">
                            <IconButton onClick={handleUpload}>
                                <UploadFileOutlinedIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                        <input type='file' hidden />
                        <Tooltip title="Download Data">
                            <IconButton onClick={handleDownload}>
                                <FileDownloadOutlinedIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
            </Box>
            
            <Box sx={{ Height: "100%", width: "4%", display: "flex", alignItems: "center" }}>
                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton onClick={deleteItem}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Please select first">
                        <IconButton>
                            <DeleteIcon color="disabled" />
                        </IconButton>
                    </Tooltip>
                )}
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Success! {numSaved} Milestones was saved to my_selected_milestones.xlsx!
                </Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                    Oops! Something is not right. Please check the file name again!
                </Alert>
            </Snackbar>
        </Toolbar>

    );
};

export default MyToolbar