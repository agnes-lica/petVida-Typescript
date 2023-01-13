export interface IPetCreateRequest {
  name: string;
  categoryId: string;
  userId: string;
}
export interface IPetUpdateRequest {
  name?: string;
  categoryId?: string;
  userId?: string;
}
