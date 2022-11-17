export const replaceId = (_: any, ret: any): void => {
  ret.id = ret._id
  delete ret._id
  delete ret.__v
}
