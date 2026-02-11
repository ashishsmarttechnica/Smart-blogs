import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchBlogs } from '../../service/redux/actions/blogAction';
import { useUpdateBlog } from '../../hooks/useUpdateBlog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function BlogDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Get all blogs from Redux
    const { blogs, loading } = useSelector(state => state.blog);


    // Fetch blogs if not loaded
    useEffect(() => {
        if (!blogs || !blogs.data || !blogs.data.data) {
            dispatch(fetchBlogs());
        }
    }, [blogs, dispatch]);

    // Find specific blog by ID
    const currentBlog = blogs?.data?.data?.find(
        blog => blog._id === id
    );

    // Safe ID getter
    const blogId = currentBlog?._id || currentBlog?.id;

    // Use update hook (pass currentBlog, will handle undefined safely)
    const { isActive, isUpdating, handleToggle } = useUpdateBlog(currentBlog || {});

    // If blog not found after loading, redirect to home
    useEffect(() => {
        if (blogs?.data?.data && !currentBlog) {
            alert('Blog not found!');
            navigate('/');
        }
    }, [currentBlog, blogs, loading, navigate]);
    // Loading state (only show if blogs not loaded AND currentBlog doesn't exist yet)
    if ((loading && !currentBlog) || !blogs || !blogs.data || !blogs.data.data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
                    <p className="text-gray-600">Loading blog...</p>
                </div>
            </div>
        );
    }

    // Blog not found
    if (!currentBlog) {
        return null;  // Will redirect in useEffect
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 py-12">
            <div className="container mx-auto px-4">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="mb-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Blogs
                </button>

                {/* Blog Detail Card */}
                <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Featured Image */}
                    {currentBlog.imgCloudi?.url && (
                        <div className="relative h-96 bg-linear-to-br from-blue-100 to-purple-100">
                            <img
                                src={currentBlog.imgCloudi.url}
                                alt={currentBlog.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div className="p-8 md:p-12">
                        {/* Meta Info */}
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                                <div>
                                    <p className="font-semibold text-gray-800">{currentBlog.userName}</p>
                                </div>
                            </div>

                            {/* Active/Inactive Switch */}
                            <div className="flex w-fit ms-auto rounded-full">
                                <label className="inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isActive}
                                        onChange={(e) => handleToggle(e.target.checked)}
                                        disabled={isUpdating || !blogId}
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

                        {/* Title */}
                        <h1 className="text-4xl md:text-4xl font-extrabold text-gray-900 mb-6">
                            {currentBlog.title}
                        </h1>

                        {/* Description/Content with Markdown Support */}
                        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-strong:font-semibold prose-ul:list-disc prose-ul:ml-6 prose-ol:list-decimal prose-ol:ml-6 prose-li:text-gray-700 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:text-red-600 prose-pre:bg-gray-900 prose-pre:text-white prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h2: ({ node, ...props }) => <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-900" {...props} />,
                                    h3: ({ node, ...props }) => <h3 className="text-2xl font-semibold mt-6 mb-3 text-gray-800" {...props} />,
                                    p: ({ node, ...props }) => <p className="text-gray-700 leading-relaxed mb-4" {...props} />,
                                    ul: ({ node, ...props }) => <ul className="list-disc ml-6 mb-4 space-y-2" {...props} />,
                                    ol: ({ node, ...props }) => <ol className="list-decimal ml-6 mb-4 space-y-2" {...props} />,
                                    li: ({ node, ...props }) => <li className="text-gray-700" {...props} />,
                                    strong: ({ node, ...props }) => <strong className="font-semibold text-gray-900" {...props} />,
                                    code: ({ node, inline, ...props }) =>
                                        <code className="text-black text-base" {...props} />,
                                }}
                            >
                                {currentBlog.description || '*No content available*'}
                            </ReactMarkdown>
                        </div>

                        {/* Date (if available) */}
                        {currentBlog.createdAt && (
                            <div className="mt-6 text-sm text-gray-500">
                                Published: {new Date(currentBlog.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                        )}
                    </div>
                </article>
            </div>
        </div>
    );
}

export default BlogDetail;