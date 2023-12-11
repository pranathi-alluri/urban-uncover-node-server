import axios from "axios";
const YELP_API = "https://api.yelp.com/v3";
const YELP_API_KEY = process.env.API_KEY_VALUE;
const options= {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${YELP_API_KEY}`
    }
};

function YelpRoutes(app) {
    const searchBusinesses = async (req,res) => {
        const {term, location} = req.body;
        const response = await axios.get(`${YELP_API}/businesses/search?location=${location}&term=${term}`, options)
        res.json(response.data.businesses);
    }

    app.post("/api/yelp/businesses", searchBusinesses)
}

export default YelpRoutes;