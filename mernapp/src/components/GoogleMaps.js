import React, { useEffect,useState } from 'react'

function GoogleMaps({ isVisible, closeMaps }) {
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
      };
      const email = localStorage.getItem("userEmail");
      const postData = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/updateLocation`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ location:inputValue,email }),
          });
    
          if (response.ok) {
            localStorage.setItem("location",inputValue);
            const result = await response.json();
            closeMaps();
          } else {
            console.error('API request failed');
          }
        } catch (error) {
          console.error('Error during API request:', error);
        }
      };
    return (
        <div>
            {isVisible && <div style={{ position: 'fixed', justifyContent: 'center', left: '5%', top: '5%', width: '90vw', height: '90vh', zIndex: 100, backgroundColor: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', color: 'black', height: '10%' }}>
                    <div style={{ width: '80%', display: 'flex', alignSelf: 'center', justifyContent: 'center' }}>

                        <div classname="input-group">
                            <input type="text" value={inputValue}  onChange={handleInputChange} style={{width:'40vw'}} classname="form-control rounded me-3" placeholder="Enter Value" aria-label="Text" />
                            <button type="button" onClick={postData} classname="btn btn-outline-primary" data-mdb-ripple-init>Select</button>
                        </div>

                    </div>
                    <div className='fs-2' style={{ width: '5%', cursor: 'pointer' }} onClick={closeMaps}>X</div>
                </div><div id='container' style={{ position: 'relative', height: '90%', width: '100%', backgroundColor: 'navajowhite', padding: '1rem', border: '0.5rem', borderColor: 'gray' }}></div>

            </div>}
        </div>
    )
}

export default GoogleMaps
