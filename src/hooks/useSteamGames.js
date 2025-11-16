import {useEffect, useState} from "react";
import {fetchUserGames} from "@/services/steamService.js";


export function useSteamGames(pageSize = 12) {
    const [games, setGames] = useState([]);
    const [loading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [meta, setMeta] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        async function loadGames() {
            try {
                setIsLoading(true);
                setError(null);
                const {games, meta} = await fetchUserGames(currentPage, pageSize);
                setGames(games);
                setMeta(meta);
            } catch (error) {
                setError(error.message);
                setGames([]);
                setMeta(null);
            } finally {
                setIsLoading(false);
            }
        }

        loadGames();
    }, [currentPage, pageSize]);

    return {games, loading, error, meta, currentPage, setCurrentPage};

}