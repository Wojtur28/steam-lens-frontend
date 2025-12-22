import {useCallback, useEffect, useState} from 'react';
import {useError} from "@/contexts/ErrorContext.jsx";
import {useTranslation} from "react-i18next";


export function useData(fetcher, deps = []) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const {showError} = useError();
    const {t} = useTranslation();

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetcher();
            setData(result);
        } catch (err) {
            setError(err);

            // Handle i18n error objects
            let errorMessage;
            if (typeof err === 'object' && err.key) {
                errorMessage = t(err.key, err.params || {});
            } else if (typeof err === 'string') {
                errorMessage = err;
            } else if (err.message) {
                errorMessage = err.message;
            } else {
                errorMessage = t('errors.api.unknownError');
            }

            showError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [fetcher, showError, t, ...deps]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {data, error, loading, refetch: fetchData};
}