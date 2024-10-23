const City = require('../models/cities');

// Get all cities
// exports.getAllCities = async (req, res) => {
//     try {
//         const cities = await City.find();
//         res.json(cities);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

exports.getAllCities = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
        const perPage = parseInt(req.query.per_page) || 5; // Default to 5 items per page if not provided
        const totalCitys = await City.countDocuments(); // Get total user count

        // Calculate the users for the current page
        const Citys = await City.find()
            .skip((page - 1) * perPage)
            .limit(perPage);

        const formattedCitys = Citys.map(City => ({
            id: City._id,
            CityName: City.cityName,
            StateName:City.StateName,
            longitude: City.longitude,
            latitude: City.latitude,
            createdAt: City.createdAt,
            updatedAt: City.updatedAt
        }));
        const totalPages = Math.ceil(totalCitys / perPage); // Total number of pages
        const response = {
            success: true,
            data: {
                current_page: page,
                data: formattedCitys,
                total: totalCitys,
                per_page: perPage,
                last_page: totalPages,
                from: (page - 1) * perPage + 1,
                to: Math.min(page * perPage, totalCitys),
                first_page_url: `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}?page=1&per_page=${perPage}`,
                last_page_url: `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}?page=${totalPages}&per_page=${perPage}`,
                next_page_url: page < totalPages ? `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}?page=${page + 1}&per_page=${perPage}` : null,
                prev_page_url: page > 1 ? `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}?page=${page - 1}&per_page=${perPage}` : null,
                links: Array.from({ length: totalPages }, (_, i) => ({
                    url: `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}?page=${i + 1}&per_page=${perPage}`,
                    label: `${i + 1}`,
                    active: i + 1 === page
                }))
            },
            message: "Users retrieved successfully."
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single city by ID
exports.getCityById = async (req, res) => {
    try {
        const city = await City.findById(req.params.id);
        if (!city) return res.status(404).json({ message: 'City not found' });
        res.json(city);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new city
exports.createCity = async (req, res) => {
    const city = new City({
        cityName: req.body.cityName,
        StateName: req.body.StateName,
        longitude: req.body.longitude,
        latitude: req.body.latitude
    });
    try {
        const newCity = await city.save();
        res.status(201).json(newCity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a city by ID
exports.updateCity = async (req, res) => {
    try {
        const city = await City.findById(req.params.id);
        if (!city) return res.status(404).json({ message: 'City not found' });

        city.cityName = req.body.cityName || city.cityName;
        city.StateName = req.body.StateName || city.StateName;
        city.longitude = req.body.longitude || city.longitude;
        city.latitude = req.body.latitude || city.latitude;

        const updatedCity = await city.save();
        res.json(updatedCity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a city by ID
exports.deleteCity = async (req, res) => {
    try {
        const city = await City.findById(req.params.id);
        if (!city) return res.status(404).json({ message: 'City not found' });

        await city.remove();
        res.json({ message: 'City deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
