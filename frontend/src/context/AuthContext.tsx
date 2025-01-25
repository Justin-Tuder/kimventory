import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
	auth: Record<string, unknown>;
	setAuth: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
}

const defaultAuthContext: AuthContextType = {
	auth: {},
	setAuth: () => {},
};

interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [auth, setAuth] = useState({});

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
