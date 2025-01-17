function CreateSpot(){
    return (
        <div id="createPage">
            <div id="head">
                <div>Create a new Spot</div>
                <div>Where's your place located</div>
                <div>Guest wil only get your exact address once they've booked a reservation.</div>
            </div>

            <div id="form1">
                <label htmlFor="">
                    Country
                    <input type="text" placeholder="Country" />
                </label>
                <label htmlFor="">
                    Street Address
                    <input type="text" placeholder="Street Address" />
                </label>
                <label htmlFor="">
                    City
                    <input type="text" placeholder="City" />
                </label>
                <label htmlFor="">
                    State
                    <input type="text" placeholder="State" />
                </label>
                <label htmlFor="">
                    Lattitude
                    <input type="text" placeholder="Lattitude" />
                </label>
                <label htmlFor="">
                    Langitude
                    <input type="text" placeholder="Langitude" />
                </label>
            </div>

            <div id="setDescription">
                <div>Describe your place to guests</div>
                <div>Mention the best feature of your space, any special amenities like fast wifi or parking, and what you love about the neighborbood.</div>
                <input type="text" placeholder="Please write at least 30 characters" />
            </div>

            <div id="setTitle">
                <div>Create a title of your spot</div>
                <div>Catch guests' attention with a spot title that highlights what makes your place special.</div>
                <input type="text" placeholder="Name of your spot" />
            </div>

            <div id="setPrice">
                <div>Set a base price for your spot</div>
                <div>Competitive pricing can help your listing stand out and rank higher in search results.</div>
                <label htmlFor="">
                    $
                    <input type="text" placeholder="Price per night" />
                </label>
            </div>

            <div id="setPhotos">
                <div>Liven up your spot with photos</div>
                <div>Submit a link to at least one photo to publish your spot.</div>
                <input type="text" placeholder="Preview Image Url" />
                <input type="text" placeholder="Image Url" />
                <input type="text" placeholder="Image Url" />
                <input type="text" placeholder="Image Url" />
            </div>
            <button>Create Spot</button>
        </div>
    )
}

export default CreateSpot