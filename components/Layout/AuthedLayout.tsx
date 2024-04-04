import { PropsWithChildren } from 'react';
import NavigationBar from '../NavigationBar/NavigationBar';
import dynamic from 'next/dynamic';

const AuthedLayout = ({ children }: PropsWithChildren) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <NavigationBar />
            <div style={{ backgroundColor: 'beige', height: '91vh' }}>
                { children }
            </div>
        </div>
    )
};

export default dynamic(() => Promise.resolve(AuthedLayout), { ssr: false });