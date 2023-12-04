import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../src/auth/context/AuthContext";
import { Navbar } from "../../../src/ui/components/Navbar";

const mockedUsedNavigate = jest.fn();

//se puede hacer mocks de una libreria completa
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate
}))

describe('Pruebas en <Navbar />', () => {
    const contextValue = {
        logged: true,
        user: {
            name: 'Juanito'
        },
        logout: jest.fn(),
    }
    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('debe de mostrar el nombre del usuario', () => {
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        )
        screen.debug();
        expect(screen.getByText('Juanito')).toBeTruthy();
    })
    test('debe de llamar el logout y navigate cuando se hace click en logout', () => {
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        const logoutBtn = screen.getByRole('button');
        console.log(logoutBtn);
        fireEvent.click(logoutBtn);
        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/login', { replace: true });
    })
})