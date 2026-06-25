// src/api/schemas/collection.schema.ts
import { expect } from '@playwright/test';

export type Series = {
    id?: number;
    name?: string;
}

export type Grade = {
    id?: number;
    name?: string;
    short_name?: string;
    collection_type_id?: number;
}

export type Type = {
    id?: number;
    name?: string;
    scale?: string;
    grade?: Grade;
}

export type ReleaseType = {
    id?: number;
    name?: string;
}

export type CollectionItem = {
    id?: number;
    title?: string;
    type?: Type;
    releaseType?: ReleaseType;
    status?: string;
    cover?: unknown;
    series?: Series;
    built_at?: unknown;
    acquired_at?: unknown;
};

export function expectValidCollectionItem(collection: CollectionItem) {
    expect(collection).toMatchObject({
        id: expect.any(Number),
        title: expect.any(String),
        status: expect.any(String),

        type: {
            id: expect.any(Number),
            name: expect.any(String),
            scale: expect.any(String),

            grade: {
                id: expect.any(Number),
                name: expect.any(String),
                short_name: expect.any(String),
            },
        },

        release_type: {
            id: expect.any(Number),
            name: expect.any(String),
        },

        series: {
            id: expect.any(Number),
            name: expect.any(String),
        },
    });
}