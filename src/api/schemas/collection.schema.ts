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

export type CollectionType = {
    id?: number;
    name?: string;
    scale?: string;
    grade?: Grade;
}

export type ReleaseType = {
    id?: number;
    name?: string;
}

export type FiguresScale = {
    id: number;
    name: string;
};

export type GunplaGrade = {
    id: number;
    name: string;
    short_name: string;
};

export type CollectionItem = {
    id?: number;
    title?: string;
    type?: CollectionType;
    release_type?: ReleaseType;
    status?: string;
    cover?: unknown;
    series?: Series;
    built_at?: unknown;
    acquired_at?: unknown;
};

export type Statistics = {
    total_count?: number;
    completed_count?: number;
    backlog_count?: number;
    limited_count?: number;
};

export type CollectionFilter = {
    collection_types: CollectionType[];
    figures_scales?: FiguresScale[];
    gunpla_grades?: GunplaGrade[];
    release_types?: ReleaseType[];
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

export function expectValidStatistics(statistics: Statistics) {
    expect(statistics).toMatchObject({
        total_count: expect.any(Number),
        completed_count: expect.any(Number),
        backlog_count: expect.any(Number),
        limited_count: expect.any(Number),
    });
}

export function expectValidCollectionFilter(filter: CollectionFilter) {
    expect(filter).toMatchObject({
        collection_types: expect.any(Array),
        figures_scales: expect.any(Array),
        gunpla_grades: expect.any(Array),
        release_types: expect.any(Array),
    });

    for (const collectionType of filter.collection_types) {
        expect(collectionType).toMatchObject({
            id: expect.any(Number),
            name: expect.any(String),
        });
    }

    for (const figuresScale of filter.figures_scales || []) {
        expect(figuresScale).toMatchObject({
            id: expect.any(Number),
            name: expect.any(String),
        });
    }

    for (const gunplaGrade of filter.gunpla_grades || []) {
        expect(gunplaGrade).toMatchObject({
            id: expect.any(Number),
            name: expect.any(String),
            short_name: expect.any(String),
        });
    }

    for (const releaseType of filter.release_types || []) {
        expect(releaseType).toMatchObject({
            id: expect.any(Number),
            name: expect.any(String),
        });
    }
}
