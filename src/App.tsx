import { MantineProvider } from "@mantine/core";
import { theme } from "@ensol-test/assets/theme";
import { AppShell } from "@ensol-test/components/layout/AppShell";
import { MainComponent } from "@ensol-test/components/MainComponent";

import "@mantine/core/styles.css";

function App() {
  return (
    <MantineProvider theme={theme}>
      <AppShell>
        <MainComponent />
      </AppShell>
    </MantineProvider>
  );
}

export default App;
