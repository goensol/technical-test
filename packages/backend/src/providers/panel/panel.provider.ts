export type PanelSpecifications = {
	/** m² */
	surfaceArea: number;
	/** kWc/unit */
	power: number;
	photovoltaicEfficiency: number;
};

export interface PanelProvider {
	/**
	 *
	 * @returns Panel's specifications (surface area (m²), power output (kWc/unit), photovoltaic efficiency) or null if not found.
	 */
	getPanelSpecifications(panelReference: string): PanelSpecifications | null;

	calculatePowerAreaRatio(panelSpecifications: PanelSpecifications): number;
}
