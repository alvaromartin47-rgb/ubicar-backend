import axios from 'axios'
import Route from '../Route'
import IRoute from '../Route/interfaces/IRoute'
import { ICity } from '../../../services/db/models/City'

export default class City {
  city: ICity

  constructor (city: ICity) {
    this.city = city
  }

  static async create (cityId: string): Promise<City> {
    const url = 'http://apis.datos.gob.ar/georef/api/localidades'
    const params = `id=${cityId}&campos=centroide,provincia`

    const info = await axios.get(`${url}?${params}`)

    const l = info?.data.localidades[0]
    if (!l) throw new Error('City not found')

    return new City({
      cityId: l.id,
      name: `${l.nombre}, ${l.provincia.nombre}, Argentina`,
      lat: l.centroide.lat,
      lon: l.centroide.lon
    })
  }

  getInfo (): ICity {
    return this.city
  }

  getCoordinates (): string {
    return `${this.city.lat},${this.city.lon}`
  }

  async getRouteTo (cityDest: City, wps: City[]): Promise<IRoute> {
    const route = await Route.create(this, cityDest, wps)

    return route.getPreview()
  }
}
