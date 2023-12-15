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
        const response = await axios.get(`${YELP_API}/businesses/search?location=${location}&term=${term}&limit=12&sort_by=best_match`, options)
        res.json(response.data.businesses);
    }

    const findBusinessById = async (req, res) => {
        const {businessId} = req.params;
        const response = await axios.get(`${YELP_API}/businesses/${businessId}`, options)
        res.json(response.data)
    }

    const verifyBusiness = async (req,res) => {
        const {name, address, city, state} = req.body;
        const response = await axios.get(
            `${YELP_API}/businesses/matches?name=${name}&address1=${address}&city=${city}&state=${state}&country=US&limit=1&match_threshold=default`, options)
        res.json(response.data)
    }

    app.post("/api/yelp/businesses", searchBusinesses)
    app.get("/api/yelp/businesses/:businessId", findBusinessById)
    app.post("/api/yelp/business", verifyBusiness)
}

export default YelpRoutes;