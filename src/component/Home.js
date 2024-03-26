import React from 'react';

const Home = () => {
    // Dummy data related to HR department
    const hrData = [
        { id: 1, name: 'Employee 1', position: 'HR Manager' },
        { id: 2, name: 'Employee 2', position: 'HR Specialist' },
        { id: 3, name: 'Employee 3', position: 'HR Assistant' },
        // Add more dummy data as needed
    ];

    return (
        <div>
            <h1>HR Department</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    {hrData.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.position}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
