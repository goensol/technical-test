import type { SimulationParameters } from "@ensol-test/types/simulation";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { getSimulation } from "../queries/simulation";

export const useLaunchSimulation = () =>
	useMutation({
		mutationFn: async (data: SimulationParameters) => getSimulation(data),
		onError: () =>
			notifications.show({
				title: "Oups, une erreur est survenue !",
				message: "Veuillez réessayer plus tard.",
				color: "red",
			}),
	});
