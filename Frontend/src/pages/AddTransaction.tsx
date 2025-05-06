import React, { useState } from 'react';

const AddTransaction: React.FC = () => {
    const [formData, setFormData] = useState({
        memberId: '',
        bookId: '',
        issueDate: '',
        returnDate: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Transaction Data:', formData);
        // Add logic to handle form submission
    };

    return (
        <div className="add-transaction">
            <h2>Add Transaction</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="memberId">Member ID</label>
                    <input
                        type="text"
                        id="memberId"
                        name="memberId"
                        value={formData.memberId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bookId">Book ID</label>
                    <input
                        type="text"
                        id="bookId"
                        name="bookId"
                        value={formData.bookId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="issueDate">Issue Date</label>
                    <input
                        type="date"
                        id="issueDate"
                        name="issueDate"
                        value={formData.issueDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="returnDate">Return Date</label>
                    <input
                        type="date"
                        id="returnDate"
                        name="returnDate"
                        value={formData.returnDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add Transaction</button>
            </form>
        </div>
    );
};

export default AddTransaction;</div