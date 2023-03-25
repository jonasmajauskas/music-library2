import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function ArtistView() {
    const { id } = useParams()
    const [ artistData, setArtistData ] = useState([])

    useEffect (() => {
        const API_URL = `http://localhost:4000/album/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            setArtistData(resData.results)
        }
        fetchData()
    }, [id])

    const renderAlbums = artistData.filter(entity => entity.collection === 'Album')
        .map((album, i) => {
            return (
                <div key={i}>
                    <Link to={`/album/${album.collectionId}`}>
                        <p>{album.collectionName}</p>
                    </Link>
                </div>
            )
        })
    return (
    <div>
        {artistData.length > 0 ? <h2>{artistData[0].artistName}</h2> : <p>loading...</p>}
        {renderAlbums}
    </div>
  )
}

export default ArtistView