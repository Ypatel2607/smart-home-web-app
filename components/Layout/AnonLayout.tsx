import { PropsWithChildren } from 'react';
import dynamic from 'next/dynamic';

const AnonLayout = ({ children }: PropsWithChildren) => {
    return (
        <>
            { children }
        </>
    )
};

export default dynamic(() => Promise.resolve(AnonLayout), { ssr: false });