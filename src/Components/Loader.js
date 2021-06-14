import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
function Loading() {
    return (
        <div align='center'>
            <Loader
            type="Rings"
            color="#2bc0e6"
            height={100}
            width={100}
            />
        </div>
    )
}

export default Loading
