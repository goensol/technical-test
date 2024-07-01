import { SimulationParameters, SimulationResponse } from '@ensol-test/types/simulations';
import physics from '@ensol-test/backend/src/data/physics.json'
import axios from 'axios';


export async function computeInstall(params: SimulationParameters): Promise<SimulationResponse> {
    const resp = await axios.get(
        'https://re.jrc.ec.europa.eu/api/v5_2/MRcalc', {
          params:{
            lat: params.latitude,
            lon: params.longitude,
            raddatabase: 'PVGIS-SARAH2',
            outputformat: 'json',
            browser: 0,
            startyear: 2005,
            endyear: 2020,
            usehorizon: 1,
            js: 1,
            optrad:1
          }
        }
      )
      
  
      var totalIrra = 0
      for ( var i = 0; i < resp.data.outputs.monthly.length; i++) {
        totalIrra = totalIrra + resp.data.outputs.monthly[i]['H(i_opt)_m']
      }
  
      const inclination = (Math.round(params.inclination/10)*10).toString()
  
      const optimalYearIrra = totalIrra/12;
      const enrgLossToAziAndIncli = physics[params.orientation][inclination]; // @ts-ignore
      const energConsum = params.monthlyBill * 12 * 5
  
      const powerGenperPanel = 425;
      const photoVoltPanelEff = 0.2;
      const sysEff = 0.8;
      const powToAera = powerGenperPanel/1.95/1000
  
      const yearIrrWithAziAndIncli = optimalYearIrra * (1 - enrgLossToAziAndIncli)
      const yearProdPerCapa = yearIrrWithAziAndIncli * photoVoltPanelEff * sysEff / powToAera
  
      const energyProdYearPerPanel = yearProdPerCapa * powerGenperPanel / 1000
  
      const numberOfPanel = Math.ceil(energConsum*0.85/energyProdYearPerPanel)

      return {
        'numberOfPanel': numberOfPanel,
        'energyProduction': Math.round(numberOfPanel * energyProdYearPerPanel)

      }
}