import { getSimulation } from "@ensol-test/frontend/queries/simulation";
import {
    RoofInclination,
    SimulationParameters,
    SimulationResponse,
} from "@ensol-test/types/simulations";
import {
    Button,
    Card,
    Group,
    NumberInput,
    Select,
    Stack,
    TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

type Props = {
    onSubmit: (results: SimulationResponse) => void;
};

type SimulationForm = {
    latitude: string;
    longitude: string;
    monthlyBill: number;
    roofInclination: number;
    roofOrientation: string;
};

export const Form = ({ onSubmit }: Props) => {
    const form = useForm({
        initialValues: {
            latitude: "",
            longitude: "",
            roofInclination: 0,
            monthlyBill: 0,
            roofOrientation: "",
        },
        validate: {
            latitude: (value) => {
                if (!value) return "Latitude is required";
                const num = parseFloat(value);
                if (isNaN(num)) return "Must be a valid number";
                if (num < -90 || num > 90) return "Must be between -90 and 90";
                return null;
            },
            longitude: (value) => {
                if (!value) return "Longitude is required";
                const num = parseFloat(value);
                if (isNaN(num)) return "Must be a valid number";
                if (num < -180 || num > 180)
                    return "Must be between -180 and 180";
                return null;
            },
            roofInclination: (value) => {
                if (value === null || value === undefined)
                    return "Inclination is required";
                if (!Object.values(RoofInclination).includes(value))
                    return "Invalid inclination value";
                return null;
            },
            monthlyBill: (value) => {
                if (value === null || value === undefined)
                    return "Monthly bill is required";
                if (value <= 0) return "Must be a positive number";
                return null;
            },
            roofOrientation: (value) => {
                if (!value) return "Orientation is required";
                if (!["W", "SW", "S", "SE"].includes(value))
                    return "Must be one of: W, SW, S, SE";
                return null;
            },
        },
    });

    const handleSubmit = async (values: SimulationForm) => {
        const results = await getSimulation({
            latitude: parseFloat(values.latitude),
            longitude: parseFloat(values.longitude),
            monthlyBill: values.monthlyBill,
            roofInclination: values.roofInclination,
            roofOrientation:
                values.roofOrientation as SimulationParameters["roofOrientation"],
        });
        onSubmit(results);
    };
    return (
        <Card withBorder h="100%">
            <Stack>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Group grow mb="md">
                        <TextInput
                            placeholder="lat"
                            label="Latitude"
                            {...form.getInputProps("latitude")}
                        />
                        <TextInput
                            placeholder="long"
                            label="Longitude"
                            {...form.getInputProps("longitude")}
                        />
                    </Group>

                    <NumberInput
                        label="Inclination"
                        placeholder="20°"
                        min={RoofInclination.None}
                        max={RoofInclination.Ninety}
                        step={10}
                        mb="md"
                        rightSection="°"
                        {...form.getInputProps("roofInclination")}
                    />

                    <Select
                        label="Orientation"
                        placeholder="Select orientation"
                        data={[
                            { value: "W", label: "West (W)" },
                            { value: "SW", label: "South West (SW)" },
                            { value: "S", label: "South (S)" },
                            { value: "SE", label: "South East (SE)" },
                        ]}
                        mb="md"
                        {...form.getInputProps("roofOrientation")}
                    />

                    <NumberInput
                        label="Monthly Bill"
                        placeholder="200€"
                        min={1}
                        rightSection="€"
                        mb="xl"
                        {...form.getInputProps("monthlyBill")}
                    />

                    <Button type="submit" fullWidth>
                        Lancer la simulation
                    </Button>
                </form>
            </Stack>
        </Card>
    );
};
