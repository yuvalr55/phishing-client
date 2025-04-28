import {registerUser} from "../../Services/auth";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const RegisterForm: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin] = useState(true);

    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await registerUser(email, password, isAdmin);

            navigate("/phishing");
        } catch (error: any) {
            console.error("Registration failed:", error);
            alert(`${error.response.data.message}`);
        }
    };

    return (
        <div style={styles.formContainer}>
            <h2 style={styles.title}>Register</h2>
            <form onSubmit={handleRegister} style={styles.form}>
                <div style={styles.fieldContainer}>
                    <label htmlFor="email" style={styles.label}>Email</label>
                    <input
                        id="email"
                        type="email"
                        style={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                </div>

                <div style={styles.fieldContainer}>
                    <label htmlFor="password" style={styles.label}>Password</label>
                    <input
                        id="password"
                        type="password"
                        style={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div style={styles.checkboxContainer}>
                    <input
                        id="isAdmin"
                        type="checkbox"
                        checked={isAdmin}
                        disabled
                    />
                    <label htmlFor="isAdmin" style={{marginLeft: "8px", color: "#555"}}>
                        Admin
                    </label>
                </div>

                <button type="submit" style={styles.registerButton}>
                    Register
                </button>
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
    checkboxContainer: {
        display: "flex",
        alignItems: "center",
        marginTop: "10px",
    },
    registerButton: {
        marginTop: "20px",
        backgroundColor: "#28a745",
        color: "white",
        padding: "12px",
        borderRadius: "8px",
        border: "none",
        fontWeight: "600",
        cursor: "pointer",
        fontSize: "16px",
    },
};

export default RegisterForm;