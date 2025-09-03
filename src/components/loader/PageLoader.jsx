import { Flex } from "@mantine/core";
import { Loader } from "@mantine/core";
import { useOutletContext } from "react-router-dom";

export default function PageLoader() {

    return (
        <Flex
            h="100vh"
            align="center"
            justify="center"
        >
            <Loader size={50} color="blue" />
        </Flex>

    );
}