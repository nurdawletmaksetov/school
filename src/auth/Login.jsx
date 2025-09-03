import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { Button, Card, Container, Flex, Input, Loader, PasswordInput, Stack, Text, TextInput } from "@mantine/core";

const Login = () => {
    const [phone, setPhone] = useState("998901234567");
    const [password, setPassword] = useState("password");

    const { login } = useContext(AuthContext);
    const nav = useNavigate();

    const handleSubmit = async () => {
        const success = await login({ phone, password });
        if (success) {
            nav("/admin");
        } else {
            alert("Login failed! Please check your authentication.");
        }
    };

    return (
        <Container size={400}>
            <Card w={300} h='auto' m='50% 0' p={15} bd="1px solid black">
                <Stack>
                    <Text>Login Page</Text>
                    <TextInput type="number"
                        name="phone"
                        label="Your phone"
                        placeholder="Your phone"
                        value={phone} onChange={(e) => setPhone(e.target.value)}
                    />
                    <PasswordInput
                        label="Your Password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <Button onClick={handleSubmit} fullWidth>Login</Button>
                    <Link to="/">Back Home</Link>
                </Stack>
            </Card>
        </Container>
    );
};

export default Login;
