// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { searchBlogs } from "../service/redux/actions/blogAction";

// export const useSearchBlogData = (searchTerm) => {
//     const dispatch = useDispatch();
//     const { blogs, loading, error } = useSelector((state) => state.blog);

//     useEffect(() => {
//         dispatch(searchBlogs(searchTerm));
//     }, [dispatch, searchTerm]);

//     return { blogs, loading, error };
// };