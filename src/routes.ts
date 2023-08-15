type Route = {
    path: string;
    name: string;
}

export const HOME = (): Route => ({
    path: '/',
    name: 'Home',
});
export const ABOUT = (): Route => ({
    path: '/about',
    name: 'About',
});
export const CONTACT = (): Route => ({
    path: '/contact',
    name: 'Contact',
});
export const LOGIN = (): Route => ({
    path: '/login',
    name: 'Login',
});
export const LOGOUT = (): Route => ({
    path: '/logout',
    name: 'Logout',
});
export const REGISTER = (): Route => ({
    path: '/register',
    name: 'Register',
});
export const PROFILE = (): Route => ({
    path: '/profile',
    name: 'Profile',
});
export const CATEGORIES = (category?: string): Route => ({
    path: `/categories${category ? `?category=${category}}` : ''}`,
    name: 'Categories',
});
export const OUTFIT_PLANNER = (): Route => ({
    path: '/outfit-planner',
    name: 'Outfit Planner',
});
export const WISHLIST = (): Route => ({
    path: '/wishlist',
    name: 'Wishlist',
});
export const STATS = (): Route => ({
    path: '/stats',
    name: 'Stats',
});
export const SETTINGS = (): Route => ({
    path: '/settings',
    name: 'Settings',
});

export const HeaderRoutes: Route[] = [CATEGORIES(), OUTFIT_PLANNER(), WISHLIST(), STATS(), SETTINGS()];