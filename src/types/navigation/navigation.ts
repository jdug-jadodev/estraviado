export type AuthStackParams = {
  Welcome: undefined
  Login: undefined
  Register: undefined
  VerifyPhone: { phone: string }
}

export type MainTabsParams = {
  MapTab: undefined
  ExploreTab: undefined
  RecordTab: undefined
  RidesTab: undefined
  ProfileTab: undefined
}

export type MapStackParams = {
  Map: undefined
  RouteDetail: { routeId: string }
  Planner: { initialCoords?: [number, number] }
  ServicePoints: undefined
}

export type ActivityStackParams = {
  Recording: undefined
  ActivitySummary: { activityId: string }
  ActivityReplay: { activityId: string }
}

export type ProfileStackParams = {
  Profile: { userId?: string }
  EditProfile: undefined
  Medals: { userId: string }
}

export type RidesStackParams = {
  RidesList: undefined
  CreateRide: undefined
  RideDetail: { rideId: string }
  RideRequests: { rideId: string }
}