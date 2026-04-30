export const testData = {
    validUser: {
        username: 'Admin',
        password: 'admin123',
    },
    addUser: {
        adminUser: {
            userRole: 'Admin',
            employerName: 'John Doe',
            status: 'Enabled',
            username: 'john123',
            password: 'john123',
        },
        essUser: {
            userRole: 'ESS',
            employerName: 'Simon Riley',
            status: 'Disabled',
            username: 'simon123',
            password: 'simon123',
        },
    },
    errorMessages: {
        loginError: 'Invalid credentials',
    },
};
