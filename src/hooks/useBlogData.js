import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../service/redux/actions/blogAction";

export const useBlogData = () => {
    const dispatch = useDispatch();
    const { blogs, loading, error } = useSelector((state) => state.blog);

    useEffect(() => {
        // Only fetch if blogs don't exist in Redux state
        if (!blogs || !blogs.data || !blogs.data.data || blogs.data.data.length === 0) {
            dispatch(fetchBlogs());
        }
    }, [dispatch, blogs]);

    return { blogs, loading, error };
};