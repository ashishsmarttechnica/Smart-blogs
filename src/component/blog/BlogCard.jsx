import { Link } from "react-router-dom";
import { useUpdateBlog } from "../../hooks/useUpdateBlog";

function BlogCard({ blog }) {
    // Use custom hook for toggle functionality
    const { isActive, isUpdating, handleToggle } = useUpdateBlog(blog);

    // Safe ID getter
    const blogId = blog._id || blog.id;

    return (
        <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-300 hover:-translate-y-2">
            {/* Image Container */}
            {blog.imgCloudi?.url && (
                <div className="relative overflow-hidden h-52 bg-linear-to-br from-blue-100 to-purple-100">
                    <img
                        src={blog.imgCloudi.url}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
            )}

            {/* Content */}
            <div className="p-4">
                {/* Author Badge + Switch */}
                <div className="flex items-center gap-2 mb-3 justify-between">
                    <span className="text-sm text-gray-600 font-medium">{blog.userName}</span>

                    {/* Active/Inactive Switch */}
                    <div className="flex w-fit ms-auto rounded-full">
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isActive}
                                onChange={(e) => handleToggle(e.target.checked)}
                                disabled={isUpdating || !blogId}  // ← Disable if no ID
                                className="sr-only peer"
                            />
                            <div className={`relative w-10 h-5.5 rounded-full peer transition-all
                                ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}
                                bg-gray-600 peer-focus:outline-none border border-gray-700 
                                peer peer-checked:after:translate-x-full 
                                rtl:peer-checked:after:-translate-x-full 
                                peer-checked:after:border-buffer 
                                after:content-[''] after:absolute after:top-[2px] 
                                after:start-[2px] after:bg-white after:rounded-full 
                                after:h-4 after:w-4 after:transition-all 
                                peer-checked:bg-blue-500`}>
                            </div>
                        </label>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    {/* Category Badge */}
                    {blog.category?.name && (
                        <div className="mb-3">
                            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                                {blog.category.name}
                            </span>
                        </div>
                    )}

                    {/* Date (if available) */}
                    {blog.createdAt && (
                        <div className="text-sm text-gray-500 mb-2">
                            {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>
                    )}
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {blog.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {blog.description}
                </p>

                {/* Read More Link */}
                <Link
                    to={`/blog/${blogId}`}
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-purple-600 transition-colors group/link"
                >
                    Read More
                    <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}

export default BlogCard;