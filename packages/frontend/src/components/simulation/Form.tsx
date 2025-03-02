import { useLaunchSimulation } from "@ensol-test/frontend/hooks/simulation";
import { orientationEnum } from "@ensol-test/shared/constants/orientation.enum";
import { simulationSchema } from "@ensol-test/shared/validation/simulation";
import type {
	SimulationParameters,
	SimulationResponse,
} from "@ensol-test/types/simulation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, NumberInput, Select, Stack, Title } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";

type Props = {
	onSubmit: (results: SimulationResponse) => void;
};

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

					<Controller
						name="latitude"
						control={control}
						render={({ field }) => (
							<NumberInput
								label="Latitude"
								placeholder="46.227638"
								withAsterisk
								hideControls
								min={-90}
								max={90}
								decimalScale={6}
								{...field}
								error={errors.latitude?.message}
							/>
						)}
					/>

					<Controller
						name="longitude"
						control={control}
						render={({ field }) => (
							<NumberInput
								label="Longitude"
								placeholder="5.644508"
								withAsterisk
								hideControls
								min={-180}
								max={180}
								decimalScale={6}
								{...field}
								error={errors.longitude?.message}
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
