import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import SnackbarContent from '@mui/material/SnackbarContent';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from "react";
import axios from "axios";
import UpdatePopupForm from './UpdatePopupForm';

const HOME = () => {
    const [DATA, setDATA] = useState("");
    const [TITLE, setTITLE] = useState("");
    const [LOADER, setLOADER] = useState(false);
    const [WARNING, setWARNING] = useState(false);
    const [SCUCESS, setSCUCESS] = useState(false);
    const [USERDATA, setUSERDATA] = useState([]);
    const [SEARCH, setSEARCH] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [Userstatus, setUserstatus] = useState([]);

    const handleUpdateClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const METHOD = () => {
        if (DATA === "") {
            setWARNING(true);
        } else {
            axios.post("http://localhost:3001/USERDATA", {
                DATA: DATA,
                TITLE: TITLE
            });
            setLOADER(true);
            setSCUCESS(true);
        }
    };

    const DELETEFUNCTION = (id) => {
        axios.delete(`http://localhost:3001/USERDELETE/${id}`);
    };

    const STATUS = (id) => {
        axios.put(`http://localhost:3001/status/${id}`);
    };

    useEffect(() => {
        axios.get("http://localhost:3001/GETUSERDATA")
            .then((RES) => {
                console.log(RES);
                setUSERDATA(RES.data.data);
            });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3001/userstatus")
            .then((RES) => {
                console.log("userstatus", RES);
                setUserstatus(RES.data.data);
            });
    }, []);

    setTimeout(() => {
        setLOADER(false);
        setWARNING(false);
        setSCUCESS(false);
    }, 3000);

    return (
        <>
            <br />
            <div className="input-group input-group-sm mb-1 rounded-pill" style={{ maxWidth: '500px', marginLeft: "33%" }}>
                <input type="text" className="form-control rounded-start" placeholder="Search" aria-label="Search" aria-describedby="search-button" onChange={(e) => setSEARCH(e.target.value)} />
            </div>
            {WARNING && (
                <Alert variant="filled" severity="warning" style={{ marginLeft: "35%", width: "30%" }}>Pls Fill Field!</Alert>
            )}
            {SCUCESS && (
                <Alert variant="filled" severity="success" style={{ marginLeft: "35%", width: "30%" }}>Submitted Successfully</Alert>
            )}

            <br />

            <TextField id="filled-basic" label="Title" variant="filled" style={{ marginLeft: "25%", width: "50%" }} onChange={(e) => setDATA(e.target.value)} /><br />
            <TextField id="filled-basic" label="Description" variant="filled" style={{ marginLeft: "25%", width: "50%" }} onChange={(e) => setTITLE(e.target.value)} /><br /><br />
            <Button variant="contained" style={{ marginLeft: "25%", width: "50%" }} onClick={METHOD}>
                Add
                {LOADER ? (
                    <CircularProgress style={{ color: "white", marginLeft: "-5%" }} />
                ) : null}
            </Button>
            <br /><br />

            {USERDATA.filter((value) => {
                if (SEARCH === '') {
                    return value;
                } else if (value.Title.toLowerCase().includes(SEARCH.toLowerCase()) || value.UserData.toLowerCase().includes(SEARCH.toLowerCase())) {
                    return value;
                }
            }).map((value, i) => {
                // Now, map through the uniqueStatuses array to create action elements
                const actionElements = Userstatus.map((Value) => {
                    if (Value.StatusID === value._id) {
                        return (
                            <React.Fragment key={value._id}>
                                <Checkbox color="success" defaultChecked />
                                <IconButton color="inherit" onClick={() => DELETEFUNCTION(value._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </React.Fragment>
                        );
                    } else  if (Value._id=== value._id){
                        return (
                            <React.Fragment key={Value.StatusID}>
                                <Checkbox color="success"  onClick={() => STATUS(value._id)} />
                                <IconButton color="inherit" onClick={() => DELETEFUNCTION(Value.StatusID)}>
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton color="inherit" onClick={handleUpdateClick}>
                                    <UpdateIcon />
                                </IconButton>
                            </React.Fragment>
                        );
                    }
                });


                return (
                    <React.Fragment key={i}>
                        <br />
                        <SnackbarContent
                            message={
                                <React.Fragment>
                                    <div style={{ color: "cyan" }}>{value.UserData}</div>
                                    <div>{value.Title}</div>
                                </React.Fragment>
                            }
                            action={actionElements}
                            style={{ width: "50%", marginLeft: "25%" }}
                        />
                        {showPopup && (
                            <UpdatePopupForm
                                open={showPopup}
                                onClose={handleClosePopup}
                                id={value._id}
                                usertitle={value.UserData}
                                Data={value.Title}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </>
    );
};

export default HOME;
