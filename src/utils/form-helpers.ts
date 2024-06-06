import {
  SimulationFormState,
  SimulationFormValidation,
  Orientation,
} from "@ensol-test/interfaces";

export const createOrientationData = (): { value: string; label: string }[] => {
  const data: { value: string; label: string }[] = [];

  for (const orientationKey in Orientation) {
    if (Orientation.hasOwnProperty(orientationKey)) {
      const orientationValue =
        Orientation[orientationKey as keyof typeof Orientation];
      data.push({ value: orientationValue, label: orientationValue });
    }
  }

  return data;
};

export const isSimulationFormValid = (
  formValues: SimulationFormState
): SimulationFormValidation => {
  const errors: Partial<Record<keyof SimulationFormState, string>> = {};

  // Validate latitude
  if (typeof formValues.latitude === "string") {
    errors.latitude = "La latitude ne doit pas être nulle.";
  } else if (formValues.latitude < -90 || formValues.latitude > 90) {
    errors.latitude = "La latitude doit être comprise entre -90° et 90°.";
  }

  // Validate longitude
  if (typeof formValues.longitude === "string") {
    errors.longitude = "La longitude ne doit pas être nulle.";
  } else if (formValues.longitude < -180 || formValues.longitude > 180) {
    errors.longitude = "La longitude doit être comprise entre -180° et 180°.";
  }

  // Validate inclination
  if (typeof formValues.inclination === "string") {
    errors.inclination = "L'inclinaison' ne doit pas être nulle.";
  } else if (formValues.inclination < 10 || formValues.inclination > 80) {
    errors.inclination = "L'inclinaison doit être comprise entre 10° et 80°.";
  }

  // Validate orientation
  if (!Object.values(Orientation).includes(formValues.orientation)) {
    errors.orientation = "Orientation invalide.";
  }

  // Validate monthly bill
  if (
    typeof formValues.monthlyBill === "string" ||
    formValues.monthlyBill === 0
  ) {
    errors.monthlyBill = "La facture mensuelle ne doit pas être nulle.";
  } else if (formValues.monthlyBill < 0) {
    errors.monthlyBill = "La facture mensuelle doit être un nombre positif.";
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
};
