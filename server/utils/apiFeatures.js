class APIFeatures {
    constructor(query, qeuryString) {
        this.query = query;
        this.qeuryString = qeuryString;
    }

    filter() {
        const queryObj = { ...this.qeuryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];

        excludedFields.forEach((el) => delete queryObj[el]);

        // replcaing all lte with $lte in the url for querying
        // \b \b is for exact match. /g for all matched strings
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`
        );

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }

    sort() {
        if (this.qeuryString.sort) {
            // mongodb sort quert is sort('price duration rating')
            // but in url it is with coma(,)
            const sortBy = this.qeuryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt'); // - stand for latest will be showed first
        }

        return this;
    }

    limitFields() {
        if (this.qeuryString.fields) {
            const fields = this.qeuryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v'); // here - stands for exluding fields
        }

        return this;
    }

    paginate() {
        const page = this.qeuryString.page * 1 || 1;

        const limit = this.qeuryString.limit * 1 || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = APIFeatures;
