import axiosConfig from "../../axios/axiosConfig";

export const setLoading = (loading) => {
    return {
        type: "SET_LOADING",
        payload: loading
    }
}

export const setBlogs = (blogs) => {
    return {
        type: "SET_BLOGS",
        payload: blogs
    }
}

export const setError = (error) => {
    return {
        type: "SET_ERROR",
        payload: error
    }
}

export const updateBlogInState = (blogId, updates) => {
    return {
        type: "UPDATE_BLOG_IN_STATE",
        payload: { blogId, updates }
    }
}

// fetch all blogs
export const fetchBlogs = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axiosConfig.get("/get/all/blogs");
        dispatch(setBlogs(response));
    } catch (error) {
        dispatch(setError(error.message));
    }
}


//update blog
export const updateBlog = (blogId, blogData) => async (dispatch) => {
    // Optimistically update state immediately
    dispatch(updateBlogInState(blogId, blogData));

    dispatch(setLoading(true));
    try {
        const formData = new FormData();
        formData.append("isActive", blogData.isActive.toString());
        const response = await axiosConfig.post(`/update/blogs?id=${blogId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        dispatch(setLoading(false));
        return response.data;
    } catch (error) {
        dispatch(setError(error.message));
        throw error;
    }
}


// search blogs
// export const searchBlogs = (searchTerm) => async (dispatch) => {
//     dispatch(setLoading(true));
//     try {
//         const response = await axiosConfig.get(`/get/all/blogs?search=${searchTerm}`);
//         dispatch(setBlogs(response));
//     } catch (error) {
//         dispatch(setError(error.message));
//     }
// }
