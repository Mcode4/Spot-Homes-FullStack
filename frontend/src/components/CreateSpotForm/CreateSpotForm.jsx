import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import * as spotActions from '../../store/spot'
import './CreateSpotForm.css'

function CreateSpot(){
    const [country, setCountry] = useState('') 
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    // const errors = {}
    const dispatch = useDispatch()


    useEffect(()=>{})

    const onSumbit = (e)=>{
        e.preventDefault()
        
        const form = {
            country,
            address,
            city,
            state,
            lat,
            lng,
            description,
            name,
            price,
            previewImage,
            images: [image1, image2, image3, image4]
        }
        // address, city, state, country, lat, lng, name,description, price
        console.log('FORM', form)

        dispatch(spotActions.createSpot(form))
    }
    return (
        <div id="createPage">
            <form onSubmit={onSumbit}>
                <div id="head">
                    <div>Create a new Spot</div>
                    <div>{`Where's your place located`}</div>
                    <div>{`Guest wil only get your exact address once they've booked a reservation.`}</div>
                </div>

                <div id="setDetails" className="formOption">
                    <label htmlFor="">
                        Country
                        <input required type="text" className="input" placeholder="Country" onChange={(e)=>setCountry(e.target.value)} value={country} />
                    </label>
                    <label htmlFor="">
                        Street Address
                        <input required type="text" className="input" placeholder="Street Address" onChange={(e)=>setAddress(e.target.value)} value={address} />
                    </label>
                    <label htmlFor="">
                        City
                        <input required type="text" className="input" placeholder="City" onChange={(e)=>setCity(e.target.value)} value={city} />
                    </label>
                    <label htmlFor="">
                        State
                        <input required type="text" className="input" placeholder="State" onChange={(e)=>setState(e.target.value)} value={state} />
                    </label>
                    <label htmlFor="">
                        Lattitude
                        <input type="text" className="input" placeholder="Lattitude" onChange={(e)=>setLat(e.target.value)} value={lat} />
                    </label>
                    <label htmlFor="">
                        Langitude
                        <input type="text" className="input" placeholder="Langitude" onChange={(e)=>setLng(e.target.value)} value={lng} />
                    </label>
                </div>

                <div id="setDescription" className="formOption">
                    <div>Describe your place to guests</div>
                    <div>Mention the best feature of your space, any special amenities like fast wifi or parking, and what you love about the neighborbood.</div>
                    <textarea name="input" className="input" id="descriptionInput" placeholder="Please write at least 30 characters" onChange={(e)=>setDescription(e.target.value)} value={description}></textarea>
                </div>

                <div id="setTitle" className="formOption">
                    <div>Create a title of your spot</div>
                    <div>{`Catch guests' attention with a spot title that highlights what makes your place special.`}</div>
                    <input required className="input" type="text" placeholder="Name of your spot" onChange={(e)=>setName(e.target.value)} value={name} />
                </div>

                <div id="setPrice" className="formOption">
                    <div>Set a base price for your spot</div>
                    <div>Competitive pricing can help your listing stand out and rank higher in search results.</div>
                    <div required className="priceInputDiv">$ <input className="input" type="text"  placeholder="Price per night" onChange={(e)=>setPrice(e.target.value)} value={price} /></div>
                </div>

                <div id="setPhotos" className="formOption">
                    <div>Liven up your spot with photos</div>
                    <div>Submit a link to at least one photo to publish your spot.</div>
                    <input required className="input" type="text" placeholder="Preview Image Url" onChange={(e)=>setPreviewImage(e.target.value)} value={previewImage} />
                    <input className="input" type="text" placeholder="Image Url" onChange={(e)=>setImage1(e.target.value)} value={image1} />
                    <input className="input" type="text" placeholder="Image Url" onChange={(e)=>setImage2(e.target.value)} value={image2} />
                    <input className="input" type="text" placeholder="Image Url" onChange={(e)=>setImage3(e.target.value)} value={image3} />
                    <input className="input" type="text" placeholder="Image Url" onChange={(e)=>setImage4(e.target.value)} value={image4} />
                </div>
                <button type="submit">Create Spot</button>
            </form>
        </div>
    )
}

export default CreateSpot