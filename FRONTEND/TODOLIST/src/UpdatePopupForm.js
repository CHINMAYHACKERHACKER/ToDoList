import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";


const UpdatePopupForm = ({ open, onClose, id, usertitle, Data }) => {
    const [title, setTitle] = useState('');
    const [userData, setUserData] = useState('');
    const [WARNING, setWARNING] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [showmessage, setshowmessage] = useState(false);


    const handleSubmit = (id) => {
        if (title == "" && userData == "") {
            setShowWarning(true);
        }
        else {
            axios.put(`http://localhost:3001/USERUPDATE/${id}`, {
                Title: title,
                UserData: userData
            })
        }
        setshowmessage(true);
    };

    const handleClose = () => {
        setShowWarning(false);
    };

    const   Close = () => {
        setshowmessage(false);
    };

    return <>
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                Update Form
                <IconButton
                    edge="end"
                    color="inherit"
                    onClick={onClose}
                    aria-label="close"
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <form>
                    <TextField
                        label="Title"
                        fullWidth
                        defaultValue={usertitle}
                        onChange={(e) => setTitle(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="User Data"
                        fullWidth
                        defaultValue={Data}
                        onChange={(e) => setUserData(e.target.value)}
                        margin="normal"
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleSubmit(id)} variant="contained" color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
        {showWarning && (
            <Dialog open={showWarning} maxWidth="sm">
                <DialogContent>
                    Pls Fill Title and Description
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        )}

        {showmessage && (
            <Dialog open={showmessage} maxWidth="sm">
                <DialogContent>
                    Data got Updated
                </DialogContent>
                <DialogActions>
                    <Button onClick={Close} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        )}
    </>
}

export default UpdatePopupForm;
