import {useCallback, useEffect, useState} from 'react';


export function useData(fetcher, deps = []) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetcher();
            setData(result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [fetcher, ...deps]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {data, error, loading, refetch: fetchData};
}