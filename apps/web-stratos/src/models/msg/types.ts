import type { BaseCategories, Log } from 'ui/models/msg/types';

export type CustomCategories = 'pot' | 'register' | 'sds'; // custom modules
export type Categories = BaseCategories | CustomCategories;
export type { Log };
