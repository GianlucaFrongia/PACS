import Keycloak, {KeycloakConfig, KeycloakInitOptions} from "keycloak-js";
import {createContext, useEffect, useState} from "react";
import storage from "../utils/storage.ts";

/**
 * KeycloakConfig configures the connection to the Keycloak server.
 */
const keycloakConfig: KeycloakConfig = {
    url: `${import.meta.env.VITE_KEYCLOAK_URL}`,
    realm: 'FHNW-LST-MI',
    clientId: 'g3-app',
};

/**
 * KeycloakInitOptions configures the Keycloak client.
 */
const keycloakInitOptions: KeycloakInitOptions = {
    // Configure that Keycloak will check if a user is already authenticated (when opening the app or reloading the page). If not authenticated the user will be send to the login form. If already authenticated the webapp will open.
    onLoad: "check-sso",
    
};

// Create the Keycloak client instance
const keycloak = new Keycloak(keycloakConfig);

/**
 * AuthContextValues defines the structure for the default values of the {@link AuthContext}.
 */
interface AuthContextValues {
    /**
     * Whether or not a user is currently authenticated
     */
    isAuthenticated: boolean;
    /**
     * The name of the authenticated user
     */
    username: string;
    /**
     * Function to initiate the logout
     */
    logout: () => void;
    /**
     * Check if the user has the given role
     */
}

/**
 * Default values for the {@link AuthContext}
 */
const defaultAuthContextValues: AuthContextValues = {
    isAuthenticated: false,
    username: "",
    logout: () => {
    }
};

/**
 * Create the AuthContext using the default values.
 */
export const AuthContext = createContext<AuthContextValues>(
    defaultAuthContextValues
);

/**
 * The props that must be passed to create the {@link AuthContextProvider}.
 */
interface AuthContextProviderProps {
    /**
     * The elements wrapped by the auth context.
     */
    children: JSX.Element;
}

/**
 * AuthContextProvider is responsible for managing the authentication state of the current user.
 *
 * @param props
 */
const AuthContextProvider = (props: AuthContextProviderProps) => {

    // Create the local state in which we will keep track if a user is authenticated
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
    // Local state that will contain the users name once it is loaded
    const [username, setUsername] = useState<string>("");

    // Effect used to initialize the Keycloak client. It has no dependencies so it is only rendered when the app is (re-)loaded.
    useEffect(() => {
        /**
         * Initialize the Keycloak instance
         */
        async function initializeKeycloak() {
            try {
                const isAuthenticatedResponse = await keycloak.init(
                    keycloakInitOptions
                );

                // If the authentication was not successfull the user is send back to the Keycloak login form
                if (!isAuthenticatedResponse) {
                    keycloak.login();
                }
                // If we get here the user is authenticated and we can update the state accordingly
                setAuthenticated(isAuthenticatedResponse);
            } catch {
                setAuthenticated(false);
            }
        }

        initializeKeycloak();
    }, []);

    // This effect loads the users profile in order to extract the username
    useEffect(() => {
        /**
         * Load the profile for of the user from Keycloak
         */
        async function loadProfile() {
            try {
                const profile = await keycloak.loadUserProfile();
                if (profile.firstName) {
                    setUsername(profile.firstName);
                } else if (profile.username) {
                    setUsername(profile.username);
                }
            } catch {
                console.log("error trying to load the users profile");
            }
        }

        // Only load the profile if a user is authenticated
        if (isAuthenticated) {
            loadProfile();
            storage.setToken(keycloak.token ? keycloak.token : "");
        }
    }, [isAuthenticated]);

    /**
     * Initiate the logout
     */
    const logout = () => {
        keycloak.logout();
    };

    /**
     * Check if the user has the given role
     * @param role to be checked
     * @returns whether or not if the user has the role
     */

    // Setup the context provider
    return (
        <AuthContext.Provider
            value={{isAuthenticated, username, logout}}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
