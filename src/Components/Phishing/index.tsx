import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {fetchTable, sendPhishingEmail} from "../../Services/phishing";
import {tableStyles} from './Table/tableStyles';

interface PhishingAttempt {
    _id: string;
    source: string;
    target: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

const Phishing: React.FC = () => {
    // State for input email
    const [email, setEmail] = useState("");
    // State to store phishing attempts
    const [attempts, setAttempts] = useState<PhishingAttempt[]>([]);
    // State to store error messages
    const [error, setError] = useState("");
    // State to store success messages
    const [successMessage, setSuccessMessage] = useState("");
    // Hook for navigation
    const navigate = useNavigate();
    // Ref for scrollable table body
    const scrollableRef = useRef<HTMLDivElement>(null);

    // Sends a phishing email attempt
    const sendPhishingAttempt = async (e: React.FormEvent) => {
        // Prevents default form submit behavior
        e.preventDefault();
        try {
            await sendPhishingEmail(email);
            setSuccessMessage("Phishing email was successfully sent.");
            setEmail("");
        } catch (err) {
            if (err instanceof Error) {
                setError(`Failed to send phishing attempt: ${err.message}`);
            } else {
                setError("Failed to send phishing attempt: Unknown error");
            }
            setSuccessMessage("");
        }
    };

    // Updates phishing attempts if there are any changes
    const updateAttempts = (currentAttempts: PhishingAttempt[], newData: PhishingAttempt[]) => {
        // Create a map of current attempts for quick lookup
        const currentAttemptsMap = new Map(currentAttempts.map(a => [a._id, a]));
        const updatedAttempts: PhishingAttempt[] = [];
        // Flag to track if any attempt has changed
        let hasChanges = false;
        // Loop over new attempts to compare and update
        for (const newAttempt of newData) {
            const currentAttempt = currentAttemptsMap.get(newAttempt._id);

            if (!currentAttempt) {
                hasChanges = true;
                updatedAttempts.push(newAttempt);
                continue;
            }

            if (
                currentAttempt.source !== newAttempt.source ||
                currentAttempt.target !== newAttempt.target ||
                currentAttempt.status !== newAttempt.status ||
                currentAttempt.createdAt !== newAttempt.createdAt ||
                currentAttempt.updatedAt !== newAttempt.updatedAt
            ) {
                hasChanges = true;
                updatedAttempts.push(newAttempt);
            } else {
                updatedAttempts.push(currentAttempt);
            }
        }

        if (hasChanges || newData.length !== currentAttempts.length) {
            return updatedAttempts;
        }

        return null;
    };

    // Effect to fetch phishing attempts and set up polling interval
    useEffect(() => {
        // Interval for periodic data fetching
        let interval: NodeJS.Timeout;

        // Function to fetch and update phishing attempts
        const fetchAndUpdate = async () => {
            try {
                const data = await fetchTable();
                if (!Array.isArray(data)) {
                    console.error('Invalid data format received from server.');
                    return;
                }
                setAttempts(prevAttempts => {
                    const updated = updateAttempts(prevAttempts, data);
                    if (updated) {
                        return updated;
                    }
                    return prevAttempts;
                });
            } catch (e: any) {
                console.error('Authentication failed or fetch error:', e.message || e);
            }
        };

        // Starts initial fetch and sets interval
        const start = async () => {
            await fetchAndUpdate();

            interval = setInterval(() => {
                fetchAndUpdate();
            }, 5000);
        };

        start().catch((error) => {
            console.error('Failed to start phishing data fetching:', error);
        });

        return () => {
            // Cleanup interval on component unmount
            if (interval) clearInterval(interval);
        };
    }, [navigate]);

    return (
        <div style={{maxWidth: 800, margin: "40px auto"}}>
            <h2>Phishing Simulation</h2>
            <form onSubmit={sendPhishingAttempt} style={{marginBottom: 20}}>
                <input
                    type="email"
                    placeholder="Employee Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{padding: 10, marginRight: 10, width: "40%"}}
                />
                <button type="submit" style={{padding: 10}}>Send</button>
            </form>
            <div style={{height: 24, marginBottom: 10, display: "flex", alignItems: "center"}}>
                {successMessage && <div style={{color: "green"}}>{successMessage}</div>}
                {error && <div style={{color: "red"}}>{error}</div>}
            </div>
            <h3 style={{marginTop: 40, marginBottom: 10, fontSize: "20px", fontWeight: "bold"}}>Phishing Attempts
                Table</h3>
            <div style={tableStyles.container}>
                <table style={tableStyles.outerTable}>
                    <thead>
                    <tr>
                        <th style={tableStyles.headerCell}>Source</th>
                        <th style={tableStyles.headerCell}>Target</th>
                        <th style={tableStyles.headerCell}>Status</th>
                        <th style={tableStyles.headerCell}>Created Time</th>
                        <th style={tableStyles.headerCell}>Updated Time</th>
                    </tr>
                    </thead>
                </table>
                <div ref={scrollableRef} style={tableStyles.scrollableBody}>
                    <table style={tableStyles.outerTable}>
                        <tbody>
                        {attempts.map((attempt, index) => (
                            <tr key={index}>
                                <td style={tableStyles.bodyCell}>{attempt.source}</td>
                                <td style={tableStyles.bodyCell}>{attempt.target}</td>
                                <td style={tableStyles.bodyCell}>{attempt.status}</td>
                                <td style={tableStyles.bodyCell}>{new Date(attempt.createdAt).toLocaleString()}</td>
                                <td style={tableStyles.bodyCell}>{new Date(attempt.updatedAt).toLocaleString()}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Phishing;
