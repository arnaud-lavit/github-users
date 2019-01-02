import React from 'react'

const SearchBar = ({changed}) => {
    return (
            <input 
                onChange={changed} 
                style={{marginBottom: '20px'}} 
                placeholder='Github Login'
                type="text" />
    )
}

export default SearchBar