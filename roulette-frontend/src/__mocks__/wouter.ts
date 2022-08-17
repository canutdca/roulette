const mockSetLocation = jest.fn()
const useLocation = () => {
    return [
        '',
        mockSetLocation
    ]   
}

export {
    mockSetLocation,
    useLocation
}
