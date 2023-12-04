import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

const mockUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUsedNavigate
}));

describe('Pruebas en <SearchPage />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debe de mostrarse correctamente con valores por default', () => {
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        )
        expect(container).toMatchSnapshot();
    });
    test('debe de mostrar a batman y el input con el valor del query string', () => {
        const { container } = render(
            <MemoryRouter initialEntries={['/search?=batman']}>
                <SearchPage />
            </MemoryRouter>
        )
        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');

        img = screen.getByRole('img');
        expect(img.src).toContain('/heroes/dc-batman.jpg')

        const alert = screen.queryByLabelText('alert-danger');
        expect(alert.style.display).toBe('none');
    });

    test('debe de mostrar un error si no se encuentra el hero (batman123)', () => {
        render(
            <MemoryRouter initialEntries={['/search?=batman123']}>
                <SearchPage />
            </MemoryRouter>
        )
        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman123');

        const alert = screen.getByLabelText('alert-danger');
        expect(alert.style.display).toBe('');
    });
    test('debe de llamar el navigate a la pantalla nueva', () => {
        const inputValue = 'superman';

        const history = {
            push: jest.fn()
        }
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage history={history} />
            </MemoryRouter>
        )
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { name: 'searchText', value: inputValue } });

        const form = screen.getByRole('form');
        fireEvent.submit(form);

        expect(mockUsedNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);
    });

})