import { faker } from '@faker-js/faker';

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
            username: faker.internet.username(),
            password: faker.internet.password(),
        },
        essUser: {
            userRole: 'ESS',
            employerName: 'Simon Riley',
            status: 'Disabled',
            username: faker.internet.username(),
            password: faker.internet.password(),
        },
        existedUser: {
            userRole: 'Admin',
            employerName: 'John Doe',
            status: 'Enabled',
            username: 'john123',
            password: faker.internet.password(),
        },
    },
    errorMessages: {
        loginError: 'Invalid credentials',
    },
};
