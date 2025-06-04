import { useState, useEffect } from 'react';
import usePaginationParams from './usePaginationParams';
import { request } from '@/lib/helpers';
import toast from 'react-hot-toast';

const useResource = (endpoint, resource, remarks) => {
    const [data, setData]                     = useState([]);
    const [searchData, setSearchData]                     = useState([]);
    const [loading, setLoading]               = useState(false);
    const [showPagination, setShowPagination] = useState(false);
    const { pageNumber, setPageNumber }       = usePaginationParams();
    const [searchUrl, setSearchUrl]           = useState('');

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber, searchUrl]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const url = `${endpoint}?page=${pageNumber}&${searchUrl.slice(1)}`;
            const { data } = await request.get(url);

            if (data.status === 'success') {
                setData(data.data[resource]);
                setSearchData(data.data[remarks]);
                
                setShowPagination(true);
            } else {
                data.message.error.forEach(message => {
                    toast.error(message);
                });
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, showPagination, pageNumber, setPageNumber, searchUrl, setSearchUrl,searchData };
};

export default useResource;
