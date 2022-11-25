import axios from 'axios'
import IRoute from './Route/interfaces/IRoute'
import City from './City/City'

export default class Route {
  orig: City
  dest: City
  wps: City[]
  info: any

  constructor (orig: City, dest: City, wps: City[], info: any) {
    this.orig = orig
    this.dest = dest
    this.wps = wps
    this.info = info
  }

  static async create (orig: City, dest: City, wps: City[]): Promise<Route> {
    const objParams = {
      apikey: process.env.MY_MAPPI_TOKEN as string,
      orig: orig.getCoordinates(),
      dest: dest.getCoordinates(),
      wps: wps.map((c) => c.getCoordinates()).join(';')
    }

    const url = 'https://api.mymappi.com/v2/directions/route/car'
    const params = new URLSearchParams(objParams).toString()

    const res: any = await axios.get(`${url}?${params}`)

    return new Route(orig, dest, wps, res.data)
  }

  getPreview (): IRoute {
    const nodes = []
    const trip = this.info.data.routes[0].legs

    nodes.push({
      city: this.orig.getInfo(),
      // datetime: datetime,
      distance: 0,
      duration: 0
    })

    for (let i = 0; i < trip.length - 1; i++) {
      nodes.push({
        city: this.wps[i].getInfo(),
        // datetime: datetime,
        distance: trip[i].distance / 1000,
        duration: trip[i].duration / 60
      })
    }

    nodes.push({
      city: this.dest.getInfo(),
      // datetime: datetime,
      duration: trip[trip.length - 1].duration / 60,
      distance: trip[trip.length - 1].distance / 1000
    })

    return {
      nodes,
      distance: this.info.data.routes[0].distance / 1000,
      duration: this.info.data.routes[0].duration / 60
      // iniDatetime: datetime,
      // endDatetime: datetime
    }
  }
}
