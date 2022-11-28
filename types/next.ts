import { NextPage } from 'next';

export type NextPageWithAuth<P = unknown> = NextPage<P> & { auth?: boolean };
