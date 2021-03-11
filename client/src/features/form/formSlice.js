import {createSlice} from '@reduxjs/toolkit';
import axios from "axios";

export const formSlice = createSlice({
    name: 'form',
    initialState: {
        requestTypes: [""],
    },
    reducers: {
        setRequestTypes: (state, action) => {
            state.requestTypes = action.payload;
        },
        setRequestType: (state, action) => {
            state.requestType = action.payload;
        },
        setRequestTypeErrorSlice: (state, action) => {
            state.requestTypeError = action.payload;
        },
    },
});

export const {setRequestType} = formSlice.actions;
export const {setRequestTypes} = formSlice.actions;
export const {setRequestTypeErrorSlice} = formSlice.actions;


// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

export const fetchRequestTypes = () => dispatch => {
    //TODO change urlGetAllRequestTypes to env variable and value based on deployment conditions
    let urlGetAllRequestTypes = "http://localhost:8080/api/v1/request-types";
    axios.get(urlGetAllRequestTypes)
        .then(({data}) => {
            dispatch(setRequestTypes(data));
        }).catch(
        function (error) {
            console.log('Show error notification!')
            return Promise.reject(error)
        }
    );
};

export const saveRequest = (requestType, policyNumber, name, surname, request) => dispatch => {
    //TODO change urlCreateContactForm to env variable and value based on deployment conditions
    let urlCreateContactForm = "http://localhost:8080/api/v1/contact-forms/contact-form";
    let body = {};
    body.requestType = requestType;
    body.policyNumber = policyNumber;
    body.name = name;
    body.surname = surname;
    body.requestText = request;
    axios.post(urlCreateContactForm, body)
        .then(obj => {
            //TODO dispatch reducer to inform Form.js if save was successful or not
        }).catch(
        function (error) {
            console.log('Show error notification!')
            return Promise.reject(error)
        }
    );
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectRequestTypes = state => state.form.requestTypes;
export const selectRequestType = state => state.form.requestType;
export const selectRequestTypeError = state => state.form.requestTypeError;

export default formSlice.reducer;
