import React from "react";

const Suggestions = ({ suggestions, handleSelectSuggestion }) => {
    if (suggestions.length === 0) return null;



    return (
        <ul className="list-group mt-1">
            {suggestions.map((suggestions, index) => (
                <li 
                key={index}
                className="list-group-item list-group-item-action"
                onClick={() => handleSelectSuggestion(suggestions)}
                >
                    {suggestions}
                </li>
            ))}
        </ul>
    );
};

export default Suggestions;