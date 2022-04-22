import { router as auth, baseEndpoint as authEndpoint } from "./auth";
import { router as bottoms, baseEndpoint as bottomsEndpoint } from "./bottoms";
import { router as feet, baseEndpoint as feetEndpoint } from "./feet";
import { router as heads, baseEndpoint as headsEndpoint } from "./heads";
import { router as outfits, baseEndpoint as outfitsEndpoint } from "./outfits";
import { router as tops, baseEndpoint as topsEndpoint } from "./tops";
import { router as wrists, baseEndpoint as wristsEndpoint } from "./wrists";

export const appRouters = [
    {
        router: auth,
        endpoint: authEndpoint
    },
    {
        router: bottoms,
        endpoint: bottomsEndpoint
    },
    {
        router: feet,
        endpoint: feetEndpoint
    },
    {
        router: heads,
        endpoint: headsEndpoint
    },
    {
        router: outfits,
        endpoint: outfitsEndpoint
    },
    {
        router: tops,
        endpoint: topsEndpoint
    },
    {
        router: wrists,
        endpoint: wristsEndpoint
    }
];
