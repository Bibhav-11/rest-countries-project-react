import { useState, useEffect } from 'react';

export default function Route({ pathname, children }) {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);


    useEffect(() => {
        function onLocationChange() {
            setCurrentPath(window.location.pathname);
        }

        window.addEventListener('popstate', onLocationChange);

        return () => window.removeEventListener('popstate', onLocationChange);
    }, []);


    return currentPath === pathname ? children : null;
}