import { Flex } from '@mantine/core'
import React from 'react'
import "./NotFound.scss"

const NotFound = () => {
    return (
        <>
            <Flex direction={"column"} justify={"center"} align={"center"} h={"100vh"} w={"100%"}>
                <h1 className='h1'>404</h1>
                <p className='p'>PAGE NOT FOUND</p>
                <button className='button' onClick={() => window.location.href = "/"}>GO HOME</button>
            </Flex>
        </>
    )
}

export default NotFound