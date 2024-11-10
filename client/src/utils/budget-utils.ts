import { API_BASE_URL } from "../constants/constants";


export const fetchBudget = async (): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`,{
        method: "GET"
    });
	if (!response.ok) {
    	throw new Error('Failed to fetch expenses');
	}
    const data = await response.json();
	return data.data;
};

export const updateBudget = async (budget: number): Promise<number> => {
    const response = await fetch(`${API_BASE_URL}/budget`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ budget }),
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to update budget: ${response.status} ${errorMessage}`);
    }

    const receivedBudget = await response.json();
    return receivedBudget;
};

