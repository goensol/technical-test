import { useState } from "react";
import { fetchData } from "@ensol-test/features/sizingSlice";
import { Orientation, SimulationFormState } from "@ensol-test/interfaces";
import {
  NumberInput,
  Group,
  Button,
  Space,
  Title,
  Select,
  Slider,
  InputWrapper,
  Fieldset,
  LoadingOverlay,
} from "@mantine/core";
import {
  isSimulationFormValid,
  updateStateIssueWithMaptalks,
} from "@ensol-test/utils/form-helpers";
import { useAppDispatch, useAppSelector } from "@ensol-test/app/hooks";
import { RootState } from "@ensol-test/app/store";
import {
  DEFAULT_SIMULATION_FORM_STATE,
  INCLINAISON_DATA,
  ORIENTATION_DATA,
} from "@ensol-test/constants";
import MapSimulationForm from "../map-simulation-form/MapSimulationForm";
import { drawMarker } from "@ensol-test/utils/handle-map";

export default function SimulationForm() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state: RootState) => state.sizing.loading);
  const [formState, setFormState] = useState(DEFAULT_SIMULATION_FORM_STATE);
  const [errors, setErrors] = useState<
    Partial<Record<keyof SimulationFormState, string>>
  >({});
  const [isFormValid, setIsFormValid] = useState(true);

  const handleForm = <K extends keyof SimulationFormState>(
    key: K,
    value: SimulationFormState[K]
  ) => {
    let newState = { ...formState };
    newState[key] = value;

    if (key !== "latitude" && key !== "longitude") {
      newState = updateStateIssueWithMaptalks(newState);
    } else {
      drawMarker(newState.longitude, newState.latitude);
    }

    const validationResult = isSimulationFormValid(newState);

    setFormState(newState);
    setIsFormValid(validationResult.isValid);
    setErrors(validationResult.errors);
  };

  const handleSubmit = () => {
    let newState = { ...formState };
    newState = updateStateIssueWithMaptalks(newState);
    dispatch(fetchData(newState));
    setFormState(newState);
  };

  const { latitude, longitude, inclination, orientation, monthlyBill } =
    formState;

  return (
    <>
      <Title order={2}>Veuillez saisir vos informations</Title>
      <Space h="lg" />
      <Fieldset legend="Informations sur votre logement" pos="relative">
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <MapSimulationForm />
        <Group grow align="start">
          <NumberInput
            required
            placeholder="43.701"
            label="Latitude (°)"
            step={0.001}
            min={-90}
            max={90}
            value={latitude}
            onChange={(value) => handleForm("latitude", value as number)}
            decimalScale={3}
            error={errors.latitude ? errors.latitude : false}
            id="input-latitude"
          />

          <NumberInput
            required
            placeholder="7.268"
            label="Longitude (°)"
            step={0.001}
            min={-180}
            max={180}
            value={longitude}
            onChange={(value) => handleForm("longitude", value as number)}
            decimalScale={3}
            error={errors.longitude ? errors.longitude : false}
            id="input-longitude"
          />
        </Group>
        <Space h="lg" />

        <Group grow align="start">
          <InputWrapper
            id="input-slider"
            required
            label="Inclinaison du toit (°)"
            size="sm"
          >
            <Space h="lg" />
            <Slider
              id="input-slider"
              label={(val) => {
                const foundItem = INCLINAISON_DATA.find(
                  (mark) => mark.value === val
                );
                return foundItem ? foundItem.label : "";
              }}
              step={10}
              min={10}
              max={80}
              marks={INCLINAISON_DATA}
              styles={{ markLabel: { display: "none" } }}
              value={inclination}
              onChange={(value) => handleForm("inclination", value as number)}
            />
          </InputWrapper>

          <Select
            required
            allowDeselect={false}
            label="Orientation du toit "
            placeholder="Sud"
            value={orientation}
            data={ORIENTATION_DATA}
            onChange={(value) =>
              handleForm("orientation", value as string as Orientation)
            }
          />
        </Group>
        <Space h="lg" />

        <NumberInput
          required
          placeholder="200€"
          label="Facture Mensuelle d'électricité"
          min={0}
          value={monthlyBill}
          onChange={(value) => handleForm("monthlyBill", value as number)}
          step={10}
          error={errors.monthlyBill ? errors.monthlyBill : false}
        />
        <Space h="lg" />

        <Button disabled={!isFormValid} onClick={handleSubmit}>
          Simuler
        </Button>
      </Fieldset>
    </>
  );
}
