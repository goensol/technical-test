import fs from "node:fs";
import path from "node:path";
import type { PanelProvider, PanelSpecifications } from "./panel.provider";

type JsonPanelData = {
	name: string;
	model: string;
	price: number;
	/** Wc/unit */
	power_dc_w: number;
	quantity: number;
	dimensions_mm: {
		/** mm */
		length: number;
		/** mm */
		width: number;
	};
	/** % */
	efficiency_percent: number;
	warranty_years: number;
	datasheet_url: string;
};

export class JsonPanelProvider implements PanelProvider {
	private readonly panels = new Map<string, JsonPanelData>();
	private readonly JSON_PANEL_DATA_PATH = path.resolve(
		__dirname,
		"./panel-specifications.data.json",
	);

	constructor() {
		const panels = this.loadData();
		this.panels = panels;
	}

	getPanelSpecifications(panelReference: string): PanelSpecifications | null {
		console.log("this.panels", this.panels);
		const panel = this.panels.get(panelReference);
		if (!panel) return null;

		return {
			surfaceArea:
				(panel.dimensions_mm.length * panel.dimensions_mm.width) / 1000 / 1000,
			power: panel.power_dc_w / 1000,
			photovoltaicEfficiency: panel.efficiency_percent / 100,
		};
	}

	calculatePowerAreaRatio(panel: PanelSpecifications): number {
		return panel.power / panel.surfaceArea;
	}

	/** Private methods */

	private loadData(): Map<string, JsonPanelData> {
		const dataPath = path.resolve(__dirname, this.JSON_PANEL_DATA_PATH);
		const data: JsonPanelData[] = JSON.parse(
			fs.readFileSync(dataPath, "utf-8"),
		);

		const panels = new Map<string, JsonPanelData>();

		for (const panel of data) {
			panels.set(panel.model, panel);
		}

		return panels;
	}
}
