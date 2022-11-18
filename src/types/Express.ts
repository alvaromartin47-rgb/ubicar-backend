import { Request, Response } from 'express'

export interface ReqChecked extends Request {
  userId: string
  headers: {
    authorization: string
  }
}

export interface ResChecked extends Response {}
