import { selectSectionByKey } from "@/store/frontendSlice";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

export const useSection = (key) => {


    
    const [content, setContent]     = useState();
    const [elements, setElements]  = useState([]);
    const section = useSelector((state) => selectSectionByKey(state, key));


    
    const loading = useSelector(state => state.frontend.status);
    
    useEffect(() => {
        setContent(section?.content);
        setElements(section?.elements);
    }, []);

    return {
        content,
        elements,
        loading: loading === 'loading',
    }
}