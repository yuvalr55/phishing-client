import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {loginUser} from "../../Services/auth";

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await loginUser(username, password);
            if (response.message === "Login successful") {
                navigate("/phishing");
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(`Login failed: ${err.message}`);
            } else {
                setError('Login failed: Unknown error');
            }
        }
    };

    const handleRegister = () => {
        navigate("/register");
    };

    return (
        <div style={styles.formContainer}>
            <h2 style={styles.title}>Log In</h2>
            <form onSubmit={handleLogin} style={styles.form}>
                <div style={styles.fieldContainer}>
                    <label htmlFor="username" style={styles.label}>
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        style={styles.input}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="email"
                    />
                </div>

                <div style={styles.fieldContainer}>
                    <label htmlFor="password" style={styles.label}>
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        style={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {error && (
                    <div style={styles.error}>
                        {error}
                    </div>
                )}

                <div style={styles.buttonContainer}>
                    <button type="submit" style={styles.loginButton}>
                        Log In
                    </button>

                    <button type="button" style={styles.registerButton} onClick={handleRegister}>
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    formContainer: {
        maxWidth: "400px",
        margin: "60px auto",
        padding: "30px",
        borderRadius: "12px",
        backgroundColor: "white",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    },
    title: {
        fontSize: "28px",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "20px",
        color: "#333",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    fieldContainer: {
        display: "flex",
        flexDirection: "column",
    },
    label: {
        marginBottom: "5px",
        fontWeight: "600",
        color: "#555",
    },
    input: {
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "16px",
    },
    error: {
        color: "red",
        textAlign: "center",
        fontSize: "14px",
        marginTop: "5px",
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginTop: "20px",
    },
    loginButton: {
        backgroundColor: "#007BFF",
        color: "white",
        padding: "12px",
        borderRadius: "8px",
        border: "none",
        fontWeight: "600",
        cursor: "pointer",
        fontSize: "16px",
    },
    registerButton: {
        backgroundColor: "white",
        color: "#007BFF",
        border: "2px solid #007BFF",
        padding: "12px",
        borderRadius: "8px",
        fontWeight: "600",
        cursor: "pointer",
        fontSize: "16px",
    },
};

export default LoginForm;