import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousal from '../components/Carousal'

export default function Home() {
    const [Food, setFood] = useState([])
    const [FoodCat, setFoodCat] = useState([])
    const [Search, setSearch] = useState('')
    const [isVeg, setIsVeg] = useState(false);
    const [isNVeg, setIsNVeg] = useState(false);
    const [isUp,setIsUp]=useState(false);
    let [expand, setExpand] = useState(new Set());
    
    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            }
        }
        )
        response = await response.json({});
        setFood(response[0])
        setFoodCat(response[1])
        setExpand(new Set(response[1].map((x)=>x.CategoryName)))
    }

    let expandArr = useCallback((param)=>{
        if(isUp){
            setExpand((prev)=>new Set([...prev,param]));
            setIsUp(false);
        }else{
            expand.delete(param);
            setExpand(new Set([...expand]));
            setIsUp(true);
        }
    },[expand,isUp])

    useEffect(() => {
        loadData()
    }, [])
    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
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
            <div className='container d-flex' id='toggle'>
                <div className="form-check form-switch" >
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={(e) => { setIsVeg(e.target.checked) }} />
                    <label className="form-check-label" id="labelswitch" for="flexSwitchCheckDefault">Veg</label>
                </div>
                <div className="form-check form-switch" >
                    <input className="form-check-input mx-1" type="checkbox" id="flexSwitchCheckDefault" onChange={(e) => { setIsNVeg(e.target.checked) }} />
                    <label className="form-check-label" id="labelswitch" for="flexSwitchCheckDefault">Non-Veg</label>
                </div>
            </div>

            <div className='container'>
                {
                    FoodCat !== [] ? FoodCat.sort((a,b)=>a._id.localeCompare(b._id)).map((data) => {
                        return (<div className='row mb-3'>
                            <div id='category'>
                            <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
                            <div className={`${!isUp ? 'down' : ''} fs-3 m-3 arrow`} onClick={()=>expandArr(data.CategoryName)} >^</div>
                            {/* <div className='fs-3 m-3 arrow'  onClick={()=>expandArr(data.CategoryName)}>&#x25B2;</div> */}
                            </div>
                            <hr />
                            {Food !== [] ? Food.filter((item) => expand.has(item.CategoryName) && item.CategoryName === data.CategoryName && (item.name.toLocaleLowerCase().includes(Search.toLocaleLowerCase())) && ((isVeg && isNVeg) || ( (!isVeg || item.Veg) && (!isNVeg || !item.Veg) )))
                                .map(filterItems => {
                                    return (<div key={filterItems._id} className='col-12 col-md-6 col-lg-4'>
                                        <Card  foodItem={filterItems} options={filterItems.options[0]} 
                                            ></Card>
                                    </div>)
                                }) : <div>No data found</div>}
                        </div>
                        )
                    }) : <div>""""</div>
                }
            </div>
            <div><Footer></Footer></div>
        </div>
    )
}
