import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import AnimeCard from '.';
import Input from '.';

describe('input tests', () => {
    const mockOnSearch = jest.fn();
    beforeEach(() => {
        render(<Input search setSearchText={mockOnSearch} searchText={''} searchOnEnter/>)
    })

    it('should call setSearchText after 300 ms of typing', async () => {
        const searchInput = screen.getByRole('search') as HTMLInputElement;
        // fireEvent.change(searchInput, {target: {value: '2'}});
        userEvent.type(searchInput, 'one piece');
        expect(searchInput.value).not.toBe('one piece');
        await waitFor(() => expect(searchInput.value).toBe('one piece'), {timeout: 300});
    }) 

    
    it('should be the correct value after typing and deleting', async () => {
        const searchInput = screen.getByRole('search') as HTMLInputElement;
        // fireEvent.change(searchInput, {target: {value: '2'}});
        await userEvent.type(searchInput, '1');
        await userEvent.type(searchInput, '2');
        await userEvent.type(searchInput, '3');
        userEvent.clear(searchInput);
        await userEvent.type(searchInput, 'naruto');
        expect(searchInput.value).not.toBe('123');
        await waitFor(() => expect(searchInput.value).toBe('naruto'), {timeout: 300});
    }) 

})

