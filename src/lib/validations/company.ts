import { z } from 'zod';

export const createCompanySchema = z.object({
	name: z.string().min(1, { message: 'Enter a name' }),
});

export const updateCompanySchema = z.object({
	name: z.string().min(1, { message: 'Enter a name' }),
	companyId: z.string().min(1, { message: 'Company ID is required' }),
});
