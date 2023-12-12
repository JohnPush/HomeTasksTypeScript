import axios, { AxiosResponse } from 'axios';

enum RequestStatus {
  Success,
  Error,
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
}

const API_URL = 'https://dummyjson.com/users';

const fetchData = async (): Promise<{ status: RequestStatus; data?: User[]; error?: string }> => {
  try {
    const response: AxiosResponse = await axios.get(API_URL);
    const users: User[] = response.data.users;
    console.log('Part of user data:', users.map(user => ({ id: user.id, firstName: user.firstName, lastName: user.lastName, age: user.age, gender: user.gender, email: user.email })));
    return { status: RequestStatus.Success, data: users };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return { status: RequestStatus.Error, error: 'Failed to fetch data' };
  }
};

fetchData();
