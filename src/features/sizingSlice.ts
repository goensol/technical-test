import { getSimulationResults } from "./../utils/process-sizing";
import { Dispatch, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "@ensol-test/app/store";
import {
  SimulationFormState,
  SimulationStatus,
  SizingSliceState,
} from "@ensol-test/interfaces";
import { DEFAULT_SIMULATION_RESULTS } from "@ensol-test/constants";

const initialState: SizingSliceState = {
  data: DEFAULT_SIMULATION_RESULTS,
  loading: false,
  error: null,
  simulationStatus: SimulationStatus.NOT_STARTED,
};

const sizingSlice = createSlice({
  name: "sizingSlice",
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
      state.simulationStatus = SimulationStatus.RUNNING;
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.simulationStatus = SimulationStatus.SUCCESS;
    },
    fetchDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.simulationStatus = SimulationStatus.FAILURE;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
  sizingSlice.actions;

export const fetchData =
  (simulationForm: SimulationFormState): AppThunk =>
  async (dispatch: Dispatch) => {
    dispatch(fetchDataStart());

    const { latitude, longitude } = simulationForm;

    try {
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
      const targetUrl = `https://re.jrc.ec.europa.eu/api/v5_2/MRcalc?lat=${latitude}&lon=${longitude}&raddatabase=PVGIS-SARAH2&outputformat=json&startyear=2005&endyear=2020&optrad=1`;

      const response = await axios.get(proxyUrl + targetUrl);

      const simulationResults = getSimulationResults(
        response.data,
        simulationForm
      );

      dispatch(fetchDataSuccess(simulationResults));
    } catch (error: any) {
      dispatch(fetchDataFailure(error.response.data.message));
    }
  };

export default sizingSlice.reducer;
