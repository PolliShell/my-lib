import React, { useState, useEffect } from 'react';
import {axiosInstance} from "../../axios/axiosInstance";

const AuthorPage = ({ authorId }) => {
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const response = await axiosInstance.get(`/authors/${authorId}`);
                setAuthor(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch author: ', error);
                setError('Failed to fetch author. Please try again later.');
                setLoading(false);
            }
        };

        if (authorId) {
            fetchAuthor();
        }
    }, [authorId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {author && (
                <>
                    <h2>{author.full_name}</h2>
                    <p>{author.description}</p>
                    {author.cover_image && (
                        <img src={author.cover_image} alt={author.full_name} />
                    )}
                </>
            )}
        </div>
    );
};

export default AuthorPage;
