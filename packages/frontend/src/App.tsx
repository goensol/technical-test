import { theme } from "@ensol-test/frontend/assets/theme";
import { queryClient } from "@ensol-test/frontend/backend/queryClient";
import { AppShell } from "@ensol-test/frontend/components/layout/AppShell";
import { Simulation } from "@ensol-test/frontend/components/simulation/Simulation";
import { MantineProvider } from "@mantine/core";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "leaflet/dist/leaflet.css";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";
import { z } from "zod";
import { customErrorMap } from "./helpers/customErrorMap";

z.setErrorMap(customErrorMap);

function App() {
	return (
		<MantineProvider theme={theme}>
			<Notifications />
			<AppShell>
				<QueryClientProvider client={queryClient}>
					<Simulation />
				</QueryClientProvider>
			</AppShell>
		</MantineProvider>
	);
}

export default App;
