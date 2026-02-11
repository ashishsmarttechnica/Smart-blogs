// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { searchBlogs } from "../../service/redux/actions/blogAction";
import { useBlogData } from "../../hooks/useBlogData";
import BlogCard from "./BlogCard";

function BlogList() {
    // const dispatch = useDispatch();
    // const [searchTerm, setSearchTerm] = useState("");
    const { blogs, loading, error } = useBlogData();

    // const handleSearch = (searchTerm) => {
    //     dispatch(searchBlogs(searchTerm));
    // };

    // Loading State with Skeleton
    if (loading && blogs.length === 0) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 py-12">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
                            <p className="text-gray-600 text-lg font-medium">Loading amazing blogs...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="min-h-screen py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h3>
                        <p className="text-red-600 mb-4">{error}</p>
                        <button onClick={() => window.location.reload()} className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
            <div className="container mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-extrabold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent pb-4">
                        Discover Amazing Blogs
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Explore curated content from talented writers around the world
                    </p>
                </div>

                {/* Search Section */}
                {/* <div className="max-w-2xl mx-auto mb-6">
                    <div className="relative flex items-center gap-3 bg-white rounded-2xl shadow-lg p-2 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                        <input
                            type="search"
                            name="search"
                            id="search"
                            placeholder="Search blogs by title, author, or keyword..."
                            className="flex-1 px-6 py-4 rounded-xl outline-none text-gray-700 placeholder-gray-400"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 font-semibold
                        " onClick={() => handleSearch(searchTerm)}>
                            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14.0001 14.0006L11.1001 11.1006" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Search
                        </button>
                    </div>
                </div> */}

                {/* Blog Grid */}
                {blogs.length === 0 ? (
                    <div className="text-center py-20">
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">No Blogs Found</h3>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {/* Sort blogs by latest createdAt first */}
                        {[...blogs.data.data]
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .map((blog) => (
                                <BlogCard key={blog._id || blog.id} blog={blog} />
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default BlogList;