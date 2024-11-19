type RouteWithIdParam = ':id' | string;

export const ROUTES = {
  HOME: () => '/',
  LOGIN: () => '/login',
  TRUCKS: () => '/trucks',
  TRUCKS_EDIT: (id: RouteWithIdParam) => `/trucks/${id}`,
  TRANSPORTS: () => '/transports',
  TRANSPORTS_EDIT: (id: RouteWithIdParam) => `/transports/${id}`,
  STORES: () => '/stores',
  STORES_EDIT: (id: RouteWithIdParam) => `/stores/${id}`,
  SITES: () => '/sites',
  SITES_EDIT: (id: RouteWithIdParam) => `/sites/${id}`,
  CARGOS: () => '/cargos',
  CARGOS_EDIT: (id: RouteWithIdParam) => `/cargos/${id}`,
};
