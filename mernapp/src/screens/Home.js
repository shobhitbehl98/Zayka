import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousal from '../components/Carousal'
import Navbar2 from '../components/Navbar2'
import Alert from '../components/Alert'
import GoogleMaps from '../components/GoogleMaps'

export default function Home() {
    const [Food, setFood] = useState([])
    const [FoodCat, setFoodCat] = useState([])
    const [Search, setSearch] = useState('')
    const [isVeg, setIsVeg] = useState(false);
    const [isNVeg, setIsNVeg] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [isVisible, setisVisible] = useState(false);

    const handleButtonClick = () => {
        setisVisible(!isVisible);
      };

      const handleCloseMaps =()=>{
        setisVisible(false);
      }

    const loadData = async () => {
        try {
            console.log(localStorage)
            let response = await fetch(`${process.env.REACT_APP_BACKEND}/api/foodData`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                }
            }
            )
            console.log('before', response);
            response = await response.json({});
            setFood(response[0])
            setFoodCat(response[1])
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        loadData()
    }, [])
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>

            <div style={{ position: 'fixed', zIndex: 10, width: '100%' }}>
                <Navbar toggleMaps={handleButtonClick} ></Navbar>
                <Navbar2 category={FoodCat}></Navbar2>
            </div>
            <GoogleMaps isVisible={isVisible} closeMaps={handleCloseMaps}></GoogleMaps>
            <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !!important" }}>
                <div className="carousel-inner" id='carousal'>
                    <div className='carousel-caption' style={{ zIndex: "8" }}>
                        <form className="d-flex justify-content-center">
                            <input className="form-control text-white me-2" type="search" placeholder="Search" aria-label="Search" value={Search} onChange={(e) => { setSearch(e.target.value) }} />
                            {/* <button className="btn btn-outline-success text-white bg-info" type="submit">Search</button> */}
                        </form>
                    </div>
                    <div className="carousel-item">
                        <img src="https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Chicken-Biryani-Recipe.jpg" className="d-block w-100 h-100" style={{ filter: "brightness(50%)" }} alt="..." />
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100 h-100" style={{ filter: "brightness(50%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?pasta" className="d-block w-100 h-100" style={{ filter: "brightness(50%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://rumkisgoldenspoon.com/wp-content/uploads/2021/02/Chilli-potato-recipe.jpg" className="d-block w-100 h-100" style={{ filter: "brightness(50%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://food.fnr.sndimg.com/content/dam/images/food/fullset/2020/11/06/FNK_Gulab-Jamun_H1.jpg.rend.hgtvcom.616.411.suffix/1604695335894.jpeg" className="d-block w-100 h-100" style={{ filter: "brightness(50%)" }} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div></div>
            <div className='container d-flex' id='toggle' style={{ zIndex: 8 }}>
                <div className="form-check form-switch" >
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={(e) => { setIsVeg(e.target.checked) }} />
                    <label className="form-check-label" id="labelswitch" for="flexSwitchCheckDefault">Veg</label>
                </div>
                <div className="form-check form-switch" >
                    <input className="form-check-input mx-1" type="checkbox" id="flexSwitchCheckDefault" onChange={(e) => { setIsNVeg(e.target.checked) }} />
                    <label className="form-check-label" id="labelswitch" for="flexSwitchCheckDefault">Non-Veg</label>
                </div>
            </div>

            <div className='container' data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-smooth-scroll="true" class="scrollspy-example bg-body-tertiary p-3 rounded-2" tabindex="0">
                {
                    FoodCat && FoodCat.length > 0 ? FoodCat?.sort((a, b) => a._id.localeCompare(b._id)).map((data) => {
                        return (<div className='row mb-3'>
                            <div id='category'>
                                <div key={data._id} id={data.CategoryName} className='fs-3 m-3'>{data.CategoryName}</div>
                            </div>
                            <hr />
                            {Food !== [] ? Food.filter((item) => item.CategoryName === data.CategoryName && (item.name.toLocaleLowerCase().includes(Search.toLocaleLowerCase())) && ((isVeg && isNVeg) || ((!isVeg || item.Veg) && (!isNVeg || !item.Veg))))
                                .map(filterItems => {
                                    return (<div key={filterItems._id} className='col-12 col-md-6 col-lg-4'>
                                        <Card foodItem={filterItems} options={filterItems.options[0]}
                                        ></Card>
                                    </div>)
                                }) : <div>No data found</div>}
                        </div>

                        )
                    }) :
                        <div></div>
                }
            </div>
            <div style={{ position: 'fixed', left: '90vw', top: '70vh', height: '5rem', width: '5rem', display: 'flex', fontWeight: '600', alignItems: 'center', justifyContent: 'center', borderRadius: '6rem', background: 'yellow', color: 'black' }} onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}>To the top</div>
            <div><Footer></Footer></div>
        </div>
    )
}
