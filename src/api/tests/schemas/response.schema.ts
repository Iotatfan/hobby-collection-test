import { expect } from '@playwright/test';

export function expectValidResponseStructure(response: any) {
    expect(response).toMatchObject({
        code: 200,
        message: 'success',
        isError: false,
    });
}