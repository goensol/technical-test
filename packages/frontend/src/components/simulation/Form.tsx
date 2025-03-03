import { useLaunchSimulation } from "@ensol-test/frontend/hooks/simulation";
import { orientationEnum } from "@ensol-test/shared/constants/orientation.enum";
import { simulationSchema } from "@ensol-test/shared/validation/simulation";
import type {
	SimulationParameters,
	SimulationResponse,
} from "@ensol-test/types/simulation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Button,
	Card,
	Input,
	NumberInput,
	Select,
	Stack,
	Title,
} from "@mantine/core";
import { LatLng } from "leaflet";
import { Controller, useForm } from "react-hook-form";
import { CoordinatesPicker } from "../ui/map/CoordinatesPicker";

type Props = {
	onSubmit: (results: SimulationResponse) => void;
};

const defaultCoordinates: LatLng = new LatLng(48.8566, 2.3522);

const orientationOptions = Object.keys(orientationEnum).map((key) => ({
	value: key,
	label: orientationEnum[key as keyof typeof orientationEnum],
}));

export const Form = ({ onSubmit }: Props) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<SimulationParameters>({
		resolver: zodResolver(simulationSchema),
		defaultValues: {
			coordinates: {
				latitude: defaultCoordinates.lat,
				longitude: defaultCoordinates.lng,
			},
			orientation: "S",
		},
	});

	const launchSimulation = useLaunchSimulation();

	const submitForm = (data: SimulationParameters) =>
		launchSimulation.mutate(data, {
			onSuccess: (results: SimulationResponse) => onSubmit(results),
		});

	return (
		<Card withBorder h="100%">
			<Title order={3} mb={10}>
				Simulateur
			</Title>

			<form onSubmit={handleSubmit(submitForm)}>
				<Stack>
					<Controller
						name="coordinates"
						control={control}
						render={({ field }) => (
							<CoordinatesPicker
								position={
									new LatLng(field.value.latitude, field.value.longitude)
								}
								setPosition={(newCoords: LatLng) => {
									field.onChange({
										latitude: newCoords.lat,
										longitude: newCoords.lng,
									});
								}}
							/>
						)}
					/>
					<Input.Error>{errors.coordinates?.message}</Input.Error>

					<Controller
						name="orientation"
						control={control}
						render={({ field }) => (
							<Select
								label="Orientation"
								placeholder="Sélectionnez une orientation"
								withAsterisk
								data={orientationOptions}
								{...field}
								error={errors.orientation?.message}
							/>
						)}
					/>

					<Controller
						name="inclination"
						control={control}
						render={({ field }) => (
							<NumberInput
								label="Inclinaison"
								placeholder="20.5 °"
								withAsterisk
								min={0}
								max={90}
								allowDecimal
								decimalScale={1}
								allowNegative={false}
								allowLeadingZeros={false}
								suffix="°"
								{...field}
								error={errors.inclination?.message}
							/>
						)}
					/>

					<Controller
						name="monthlyBill"
						control={control}
						render={({ field }) => (
							<NumberInput
								label="Facture mensuelle d'électricité"
								placeholder="200 €"
								withAsterisk
								hideControls
								min={1}
								allowDecimal={false}
								allowNegative={false}
								allowLeadingZeros={false}
								suffix="€"
								{...field}
								error={errors.monthlyBill?.message}
							/>
						)}
					/>

					<Button type="submit" mt="md" loading={launchSimulation.isPending}>
						Lancer la simulation !
					</Button>
				</Stack>
			</form>
		</Card>
	);
};
