export class Film {
    id: number | null = null;
    title: string = '';
    notes: string = '';
    state: 'OPEN' | 'ACTIVE' | 'INACTIVE' = 'OPEN';

    constructor(
        id: number | null = null,
        title: string = '',
        state: 'OPEN' | 'ACTIVE' | 'INACTIVE' = 'OPEN',
        notes: string = ''
    ) {
        this.id = id;
        this.title = title;
        this.state = state;
        this.notes = notes;
    }
}
