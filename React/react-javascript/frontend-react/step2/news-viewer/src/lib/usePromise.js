import {useEffect, useState} from "react";
/*
* API 호출을 위한 Custom Hook
*/
export default function usePromise(promiseCreator, deps) {
    const [loading, setLoading] = useState(false);
    const [resolved, setResolved] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const process = async () => {
            setLoading(true);
            try {
                const resolved = await promiseCreator();
                setResolved(resolved);
            } catch (e) {
                console.log(e);
                setError(e);
            }
            setLoading(false);
        };
        process();
    }, deps);
    return [loading,resolved,error];
}