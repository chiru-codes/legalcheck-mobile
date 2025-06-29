export type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    Register: undefined;
    Home: undefined;
    VerifyEmail: undefined;
    RegisterLawyer: {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        password: string;
    };
};
