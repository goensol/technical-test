import { theme } from "@ensol-test/frontend/assets/theme";
import { queryClient } from "@ensol-test/frontend/backend/queryClient";
import { AppShell } from "@ensol-test/frontend/components/layout/AppShell";
import { Simulation } from "@ensol-test/frontend/components/simulation/Simulation";
import { MantineProvider } from "@mantine/core";

import "@mantine/core/styles.css";
import { QueryClientProvider } from "@tanstack/react-query";

function App() {
	return (
		<MantineProvider theme={theme}>
			<AppShell>
				<QueryClientProvider client={queryClient}>
					<Simulation />
				</QueryClientProvider>
			</AppShell>
		</MantineProvider>
	);
}

export default App;
