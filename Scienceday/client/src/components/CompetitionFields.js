import React from 'react';

const CompetitionFields = ({ competition, onChange }) => {
    if (!competition) {
        console.error('Competition object is undefined');
        return null; // or return some placeholder content
    }

    return (
        <div>
            <h3>{competition.title || 'Untitled Competition'}</h3>
            {competition.fields && competition.fields.map((field, index) => {
                if (!field || typeof field !== 'object') {
                    console.error(`Invalid field at index ${index}:`, field);
                    return null;
                }

                switch (field.type) {
                    case 'text':
                        return (
                            <div key={index}>
                                <label>{field.label || `Field ${index + 1}`}</label>
                                <input
                                    type="text"
                                    value={field.value || ''}
                                    onChange={(e) => onChange(index, e.target.value)}
                                />
                            </div>
                        );
                    case 'select':
                        return (
                            <div key={index}>
                                <label>{field.label || `Field ${index + 1}`}</label>
                                <select
                                    value={field.value || ''}
                                    onChange={(e) => onChange(index, e.target.value)}
                                >
                                    {field.options && field.options.map((option, optionIndex) => (
                                        <option key={optionIndex} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        );
                    default:
                        console.warn(`Unknown field type: ${field.type}`);
                        return null;
                }
            })}
        </div>
    );
};

export default CompetitionFields;