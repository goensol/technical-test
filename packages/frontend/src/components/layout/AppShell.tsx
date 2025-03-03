import {
	AppShell as BaseAppShell,
	Container,
	Group,
	Text,
} from "@mantine/core";
import type { ReactNode } from "react";

import { Logo } from "./Logo";

type Props = {
	children: ReactNode;
};

export const AppShell = ({ children }: Props) => (
	<BaseAppShell header={{ height: 60 }} padding="lg">
		<BaseAppShell.Header zIndex={2000}>
			<Group h="100%" px="lg" justify="space-between">
				<Group>
					<Logo height={28} />
					<Text mt={16}>Tech Test</Text>
				</Group>
			</Group>
		</BaseAppShell.Header>

		<BaseAppShell.Main>
			<Container maw={1440}>{children}</Container>
		</BaseAppShell.Main>
	</BaseAppShell>
);
