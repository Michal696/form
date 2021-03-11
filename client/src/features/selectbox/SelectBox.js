import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import {
    fetchRequestTypes, selectRequestTypeError,
    selectRequestTypes,
    setRequestType, setRequestTypeErrorSlice,
} from "../form/formSlice";
import {useDispatch, useSelector} from "react-redux";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

let errorRequestType = false;

const useStyles = makeStyles(() => ({}));

export default function CustomizedSelects() {
    const classes = useStyles();
    const dispatch = useDispatch();

    let requestTypes = useSelector(selectRequestTypes);

    errorRequestType = useSelector(selectRequestTypeError);

    const [requestType, setChosenRequestType] = React.useState('');

    const handleChange = (event) => {
        setChosenRequestType(event.target.value);
        dispatch(setRequestType(event.target.value));
        if (event.target.value.length) {
            dispatch(setRequestTypeErrorSlice(false));
        } else {
            dispatch(setRequestTypeErrorSlice(true));
        }
    };

    useEffect(() => {
        dispatch(fetchRequestTypes());
    }, []);

    return (
        <div style={{"width": "100%"}}>
            <FormControl variant="outlined" className={classes.margin} style={{"width": "100%"}}
                         error={errorRequestType}>
                <InputLabel htmlFor="outlined-age-native-simple"/>
                <Select
                    native
                    id="customized-select-native"
                    value={requestType}
                    onChange={handleChange}
                >
                    <option value=""/>
                    {requestTypes.map(function (sRequestType) {
                        return <option value={sRequestType} key={sRequestType}> {sRequestType}</option>
                    })}
                </Select>
                <FormHelperText>{errorRequestType && "Incorrect entry."}</FormHelperText>
            </FormControl>
        </div>
    );
}
