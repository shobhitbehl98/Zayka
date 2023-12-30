import React, { useEffect } from 'react'

function GoogleMaps({ isVisible, closeMaps }) {

    return (
        <div>
            {isVisible && <div style={{ position: 'fixed',padding:'1rem', justifyContent: 'center', left: '5%', top: '5%', width: 'fit-content', height: 'fit-content', zIndex: 100, backgroundColor: 'red' }}>
                    <div style={{color:'black',marginBottom:'1rem'}}>Enter your location:</div>
                        <div classname="input-group">
                            <input type="text" style={{width:'40vw'}} classname="form-control rounded me-3" placeholder="Search" aria-label="Text" aria-describedby="search-addon" />
                            <button type="button" classname="btn btn-outline-primary" data-mdb-ripple-init>Select</button>
                        </div>
            </div>}
        </div>
    )
}

export default GoogleMaps
