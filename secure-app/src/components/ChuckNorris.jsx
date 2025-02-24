import React, { useEffect, useState } from 'react';

function ChuckNorris({ token }) {
    const [fact, setFact] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getFact = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:3333/fact', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await response.json();
                await new Promise(resolve => setTimeout(resolve, 1000));

                if (response.ok && data.fact) {
                    setFact(data.fact);
                } else {
                    setFact('No Chuck Norris fact at this time. Try again later.');
                }
            } catch {
                setFact('An error occurred while fetching the fact.');
            } finally {
                setLoading(false);
            }
        };

        getFact();
    }, [token]);

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Chuck Norris Fact</h2>
            {loading ? (
                <p style={styles.loading}>Loading fact...</p>
            ) : (
                <div style={styles.factBox}>
                    {fact}
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        marginTop: '20px',
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '6px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    header: {
        marginBottom: '10px',
        color: '#333'
    },
    loading: {
        fontStyle: 'italic',
        color: '#666'
    },
    factBox: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#f9f9f9'
    }
};

export default ChuckNorris;
