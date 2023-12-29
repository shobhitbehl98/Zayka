import React, { useEffect } from 'react'

function GoogleMaps({ isVisible, closeMaps }) {

    return (
        <div>
            {isVisible && <div style={{ position: 'fixed', justifyContent: 'center', left: '5%', top: '5%', width: '90vw', height: '90vh', zIndex: 100, backgroundColor: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', color: 'black', height: '10%' }}>
                    <div style={{ width: '80%', display: 'flex', alignSelf: 'center', justifyContent: 'center' }}>

                        <div classname="input-group">
                            <input type="search" style={{width:'40vw'}} classname="form-control rounded me-3" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                            <button type="button" classname="btn btn-outline-primary" data-mdb-ripple-init>Search</button>
                        </div>

                    </div>
                    <div className='fs-2' style={{ width: '5%', cursor: 'pointer' }} onClick={closeMaps}>X</div>
                </div><div id='container' style={{ position: 'relative', height: '90%', width: '100%', backgroundColor: 'navajowhite', padding: '1rem', border: '0.5rem', borderColor: 'gray' }}></div>

            </div>}
        </div>
    )
}

export default GoogleMaps
