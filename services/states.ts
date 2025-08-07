import { create } from "zustand";

type TAppState = {
    isAuthenticated: boolean;
    isLoading: boolean;
    token: string;
    user: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
    } | null;
    setAppState: (props: Partial<Omit<TAppState, "setAppState">>) => void;
};

export const useAppState = create<TAppState>((set, get) => ({
    isAuthenticated: false,
    isLoading: true,
    token: "",
    user: null,
    setAppState: (state) => {
        set(state);
    },
}));
