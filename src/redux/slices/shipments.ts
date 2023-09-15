/* eslint-disable @typescript-eslint/no-explicit-any */

import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { Shipment } from '../../interface/shipments';
import SHIPMENTS from '../../data/shipments.json';
import toast from 'react-hot-toast';
import { fetchShipmentsUrl } from '../../utils/helper';

// const BASE_URL = 'https://my.api.mockaroo.com/shipments.json?key=5e0b62d0'
const BASE_URL = 'http://localhost:3001/shipments'
const PAGE_SIZE = 10


type ShipmentState = {
    status: "loading" | "idle" | 'failed';
    error: string | null;
    shipments: ShipmentData | null;
    temporaryShipments: Shipment[] | [],
};
type ShipmentData = {
    hasNext: true | false
    shipments: Shipment[]
}
const initialState: ShipmentState = {
    shipments: null,
    error: null,
    status: "loading",
    temporaryShipments: [],
};

export const fetchShipmentsData = createAsyncThunk('shipments', async (after?: string ) => {

    const url = fetchShipmentsUrl(BASE_URL, PAGE_SIZE, after)
    try {
        const response = await axios.get(url)
        toast.success('data served from API.')
        return response.data;
    } catch (error: any) {
        toast.error(error.message)
        toast.success('static data served')
        throw new Error("Failed to fetch data from the server");
    }
    
})
export const updateShipment = createAsyncThunk('shipment/update', async(values: any, thunkApi) => {
    const { orderNo } = values
    try {
        await axios.patch(`${BASE_URL}/${orderNo}`, values)
        toast.success('shipment updated.')
        const newResponse = await thunkApi.dispatch(fetchShipmentsData())
        return newResponse.payload;
    } catch (error: any) {
        toast.error(error.message)
        return error.message
    }
})
export const deleteShipment = createAsyncThunk(
    'shipments/delete',
    async (orderId: string, thunkApi) => {
        try {
            await axios.delete(`${BASE_URL}/${orderId}`);
            toast.success('shipment removed')
            const newResponse = await thunkApi.dispatch(fetchShipmentsData())
            return newResponse.payload;
        } catch (error: any) {
            // const newShipment = SHIPMENTS.slice().filter(shipment => shipment.orderNo != orderId)
            throw new Error(error.message)
        }
    }
);
export const ShipmentsSlice = createSlice({
    name: 'shipments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchShipmentsData.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });
        builder.addCase(fetchShipmentsData.fulfilled, (state, action: PayloadAction<ShipmentData>) => {
            state.status = 'idle'
            state.shipments = action.payload
            state.error = null
        });
        builder.addCase(fetchShipmentsData.rejected, (state, action: any) => {
            state.status = 'idle'
            state.shipments = { hasNext: true, shipments: SHIPMENTS }
            // state.shipments = []
            state.error = action.error.message
        });
        builder.addCase(updateShipment.pending, (state) => {
            state.status = 'loading'
            state.shipments = null
            state.error = null
        });
        builder.addCase(updateShipment.fulfilled, (state, action: PayloadAction<ShipmentData>) => {
            state.status = 'idle'
            state.shipments = action.payload
            state.error = null;
        });
        builder.addCase(updateShipment.rejected, (state, action: any) => {
            state.status = 'idle'
            state.shipments = null
            state.error = action.payload
        });
        builder
            .addCase(deleteShipment.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteShipment.fulfilled, (state) => {
                state.status = 'idle';
            })
            .addCase(deleteShipment.rejected, (state, action: any) => {
                state.status = 'failed';
                state.error = action.error.message; // Error message passed by rejectWithValue
            });
    }
})
export default ShipmentsSlice.reducer;