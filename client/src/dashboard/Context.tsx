import React from 'react';

interface SizeContextType {
    size: number;
    setSize: (value: number) => void;
}

interface LoadImageContextType {
    loadImage: number;
    setLoadImage: (value: number) => void;
}

export const Context = React.createContext<SizeContextType>({
    size: 30,
    setSize: () => {}
});

export const LoadContext = React.createContext<LoadImageContextType>({
    loadImage: 0,
    setLoadImage: () => {}
});
