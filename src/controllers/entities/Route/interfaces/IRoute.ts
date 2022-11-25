import ICity from '../../City/interfaces/ICity'

interface INode {
  city: ICity
  datetime?: string
  distance: number
  duration: number
}

export default interface IRoute {
  nodes: INode[]
  distance: number
  duration: number
  iniDatetime?: string
  endDatetime?: string
}
