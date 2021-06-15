// eslint-disable-next-line
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGet } from '../misc/config';

const Show = () => {
    // eslint-disable-next-line
    const { id } = useParams();
    const [show,setShow] = useState(null);

    useEffect( ()=>{
        apiGet(`/show/${id}?embed[]=seasons&embed[]=cast`).then(results=>{
            setShow(results);
        })
    }, [id] );
    console.log('show', show);

    return (
        <div>
            This is Show page
        </div>
    )
}

export default Show