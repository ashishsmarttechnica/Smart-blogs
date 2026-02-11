import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBlog } from "../service/redux/actions/blogAction";

/**
 * Custom hook for managing blog isActive toggle
 * Handles optimistic updates with error rollback
 * 
 * @param {Object} blog - Blog object containing _id/id and isActive
 * @returns {Object} - { isActive, isUpdating, handleToggle }
 */
export const useUpdateBlog = (blog) => {
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(blog.isActive ?? false);
    const [isUpdating, setIsUpdating] = useState(false);

    /**
     * Toggle blog active status
     * @param {boolean} newValue - New active state
     */
    const handleToggle = async (newValue) => {
        const blogId = blog._id || blog.id;

        // Validate blog ID exists
        if (!blogId) {
            console.error('❌ Blog ID missing:', blog);
            alert('Cannot update: Blog ID not found');
            return;
        }

        // Optimistic update - immediately update UI
        setIsActive(newValue);
        setIsUpdating(true);

        try {
            await dispatch(updateBlog(blogId, { isActive: newValue }));
            // Success - no action needed (optimistic update already done)
        } catch (error) {
            console.error('❌ Failed to update:', error);

            // Rollback on error
            setIsActive(!newValue);
            alert('Failed to update blog status: ' + error.message);
        } finally {
            setIsUpdating(false);
        }
    };

    return { isActive, isUpdating, handleToggle };
};