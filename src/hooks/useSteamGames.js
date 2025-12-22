import {useEffect, useState} from "react";
import {fetchUserGames} from "@/services/steamService.js";
import {useError} from "@/contexts/ErrorContext.jsx";
import {useTranslation} from "react-i18next";


export function useSteamGames(pageSize = 12) {
    const [games, setGames] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [meta, setMeta] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const {showError} = useError();
    const {t} = useTranslation();

    useEffect(() => {
        async function loadGames() {
            try {
                setIsLoading(true);
                setError(null);
                const {games, meta} = await fetchUserGames(currentPage, pageSize);
                setGames(games);
                setMeta(meta);
            } catch (err) {
                setError(err);
                setGames([]);
                setMeta(null);

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
                setIsLoading(false);
            }
        }

        loadGames();
    }, [currentPage, pageSize, showError, t]);

    return {games, loading, error, meta, currentPage, setCurrentPage};

}