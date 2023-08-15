import { error } from '@sveltejs/kit';
import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const response = await prisma.accessory.findMany()
    return { feed: response };
}) satisfies PageServerLoad;