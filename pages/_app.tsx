import React from 'react';
import 'styles/globals.scss';
import type { AppProps } from 'next/app';
import { SmoothScroll } from 'components/SmoothScroll';

// eslint-disable-next-line react/jsx-props-no-spreading
const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <SmoothScroll>
            <Component {...pageProps} />
        </SmoothScroll>
    )
}


export default MyApp;
