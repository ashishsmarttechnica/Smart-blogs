const initialState = {
    blogs: [],
    loading: false,
    error: null
}

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload
            }
        case "SET_BLOGS":
            return {
                ...state,
                blogs: action.payload,
                loading: false,
                error: null
            }
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case "UPDATE_BLOG_IN_STATE":
            // Update specific blog in state (optimistic update)
            return {
                ...state,
                blogs: {
                    ...state.blogs,
                    data: {
                        ...state.blogs.data,
                        data: state.blogs.data.data.map(blog =>
                            blog._id === action.payload.blogId || blog.id === action.payload.blogId
                                ? { ...blog, ...action.payload.updates }
                                : blog
                        )
                    }
                },
                loading: false
            }
        default:
            return state
    }
}

export default blogReducer;
