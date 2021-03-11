import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from "styled-components";
import {
    saveRequest, selectRequestType, setRequestTypeErrorSlice,
} from './formSlice';
import styles from './Form.module.css';
import SelectBox from "../selectbox/SelectBox";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";
import blue from "@material-ui/core/colors/blue";
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';


const Content = styled.div`
  width: 500px;
`;

const MAX_LENGTH_OF_REQUEST = 500;

export function Form() {
    const dispatch = useDispatch();

    let requestType = useSelector(selectRequestType);
    const [policyNumber, setPolicyNumber] = React.useState('');
    const [name, setName] = React.useState('');
    const [surname, setSurname] = React.useState('');
    const [request, setRequest] = React.useState('');

    const [policyNumberError, setPolicyNumberError] = React.useState(false);
    const [nameError, setNameError] = React.useState(false);
    const [surnameError, setSurnameError] = React.useState(false);

    const theme = React.useMemo(() => {
        return createMuiTheme({
            palette: {
                primary: {
                    main: blue[500],
                    contrastText: '#fff',
                },
            },
        });
    });

    function sendRequest() {
        if (!requestType) {
            dispatch(setRequestTypeErrorSlice(true));
            return;
        }

        if (policyNumberError || nameError || surnameError) {
            return;
        }

        dispatch(saveRequest(requestType, policyNumber, name, surname, request));
    }

    function validatePolicyNumber(policyNumber) {
        return /^[a-z0-9]+$/i.test(policyNumber.trim());
    }

    function validateNameOrSurname(pureCharacters) {
        return /^[a-z]+$/i.test(pureCharacters.trim());
    }

    function requestChange(event) {
        setRequest(event.target.value);
    }

    function nameChanged(event) {
        let name = event.target.value;
        setName(name);

        if (validateNameOrSurname(name)) {
            setNameError(false);
        } else {
            setNameError(true);
        }
    }

    function surnameChanged(event) {
        let surname = event.target.value;
        setSurname(surname);

        if (validateNameOrSurname(surname)) {
            setSurnameError(false);
        } else {
            setSurnameError(true);
        }
    }

    function policyNumberCallback(event) {
        let policyNumber = event.target.value;
        setPolicyNumber(policyNumber);

        if (validatePolicyNumber(policyNumber)) {
            setPolicyNumberError(false);
        } else {
            setPolicyNumberError(true);
        }
    }

    return (
        <Content>
            <div className={styles.header}>
                <h2>
                    Contact us
                </h2>
            </div>

            <div className={styles.label}>
                Kind of Request
            </div>

            <div className={styles.editfield}>
                <SelectBox/>
            </div>

            <div className={styles.label}>
                Policy Number
            </div>

            <div className={styles.editfield} style={{"width": "100%"}}>
                <TextField
                    error={policyNumberError}
                    id="outlined-error"
                    variant="outlined"
                    onChange={policyNumberCallback}
                    helperText={policyNumberError && "Incorrect entry."}
                    style={{"width": "100%"}}
                />
            </div>

            <div className={styles.label}>
                Name
            </div>

            <div className={styles.editfield} style={{"width": "100%"}}>
                <TextField
                    error={nameError}
                    id="outlined-error"
                    variant="outlined"
                    onChange={nameChanged}
                    helperText={nameError && "Incorrect entry."}
                    style={{"width": "100%"}}
                />
            </div>

            <div className={styles.label}>
                Surname
            </div>

            <div className={styles.editfield} style={{"width": "100%"}}>
                <TextField
                    error={surnameError}
                    id="outlined-error"
                    variant="outlined"
                    onChange={surnameChanged}
                    helperText={surnameError && "Incorrect entry."}
                    style={{"width": "100%"}}
                />
            </div>

            <div className={styles.label}>
                Your request
            </div>

            <div className={styles.editfield} style={{"width": "100%"}}>
                <TextField
                    multiline={true}
                    rows={5}
                    inputProps={{
                        maxLength: MAX_LENGTH_OF_REQUEST
                    }}
                    value={request}
                    helperText={`${request.length}/${MAX_LENGTH_OF_REQUEST}`}
                    onChange={requestChange}
                    margin="normal"
                    variant="outlined"
                    style={{"width": "100%"}}
                />
            </div>

            <div className={styles.sendrequestbutton}>
                <ThemeProvider theme={theme}>
                    <Button onClick={sendRequest} variant="contained" color="primary">
                        Send Request
                    </Button>
                </ThemeProvider>
            </div>
        </Content>
    );
}
