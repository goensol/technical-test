import { useState } from "react";
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
} from "@mantine/core";
import { isSimulationFormValid } from "@ensol-test/utils/form-validation";

const DEFAULT_STATE: SimulationFormState = {
  latitude: 43.701,
  longitude: 7.268,
  inclination: 30,
  orientation: Orientation.SOUTH,
  monthlyBill: 166,
};

const createOrientationData = (): { value: string; label: string }[] => {
  const data: { value: string; label: string }[] = [];

  // Iterate over the enum keys and construct objects with enum values as both value and label
  for (const orientationKey in Orientation) {
    if (Orientation.hasOwnProperty(orientationKey)) {
      const orientationValue =
        Orientation[orientationKey as keyof typeof Orientation];
      data.push({ value: orientationValue, label: orientationValue });
    }
  }

  return data;
};

const orientationData = createOrientationData();

const INCLINAISON_DATA = [
  { value: 10, label: "10°" },
  { value: 20, label: "20°" },
  { value: 30, label: "30°" },
  { value: 40, label: "40°" },
  { value: 50, label: "50°" },
  { value: 60, label: "60°" },
  { value: 70, label: "70°" },
  { value: 80, label: "80°" },
];

export default function SimulationForm() {
  const [formState, setFormState] = useState(DEFAULT_STATE);
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

    const validationResult = isSimulationFormValid(newState);

    setFormState(newState);
    setIsFormValid(validationResult.isValid);
    setErrors(validationResult.errors);
  };

  const handleSubmit = () => {
    console.log(
      "OBJET A TRAITER POUR LA SIMULATION : ",
      JSON.stringify(formState, null, 4)
    );
  };

  const { latitude, longitude, inclination, orientation, monthlyBill } =
    formState;

  return (
    <>
      <Title order={2}>Veuillez saisir vos informations</Title>
      <Space h="lg" />
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
        />
      </Group>
      <Space h="lg" />

      <Group grow align="start">
        <InputWrapper
          id="input-slider"
          required
          label="Inclinaison (°)"
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
          label="Orientation"
          placeholder="Sud"
          value={orientation}
          data={orientationData}
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
        Simuler !
      </Button>
    </>
  );
}
