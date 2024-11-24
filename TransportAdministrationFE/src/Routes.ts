type RouteWithIdParam = ':id' | string;

export const ROUTES = {
  HOME: () => '/',
  LOGIN: () => '/login',
  TRUCKS: () => '/trucks',
  TRUCK_ITEM: (id: RouteWithIdParam) => `/trucks/${id}`,
  TRANSPORTS: () => '/transports',
  TRANSPORT_ITEM: (id: RouteWithIdParam) => `/transports/${id}`,
  STORES: () => '/stores',
  STORE_ITEM: (id: RouteWithIdParam) => `/stores/${id}`,
  SITES: () => '/sites',
  SITE_ITEM: (id: RouteWithIdParam) => `/sites/${id}`,
  CARGOS: () => '/cargos',
  CARGO_ITEM: (id: RouteWithIdParam) => `/cargos/${id}`,
};
