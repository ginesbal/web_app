import React, { useEffect, useState } from 'react';

function ChuckNorris({ token }) {
    const [fact, setFact] = useState('');

    useEffect(() => {
        const getFact = async () => {
            try {
                const response = await fetch('http://localhost:3333/fact', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok && data.fact) {
                    setFact(data.fact);
                } else {
                    setFact('Could not fetch a Chuck Norris fact at this time.');
                }
            } catch {
                setFact('An error occurred while fetching the fact.');
            }
        };

        getFact();
    }, [token]);

    return (
        <div>
            <h2>Chuck Norris Fact</h2>
            <p>{fact}</p>
        </div>
    );
}

export default ChuckNorris;
