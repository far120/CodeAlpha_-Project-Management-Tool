import { Query } from "mongoose";

class APIFeatures {
  query: Query<any[], any>;
  queryString: Record<string, any>;
  pagination: {
    currentPage: number;
    limit: number;
    totalProducts: number;
    totalPages: number;
    nextPage: number | null;
    previousPage: number | null;
  } | undefined;

  constructor(query: Query<any[], any>, queryString: Record<string, any>) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };

    delete queryObj.page;
    delete queryObj.limit;
    delete queryObj.sort;
    delete queryObj.keyword;

    this.query = this.query.find(queryObj);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort
        .split(",")
        .join(" ");

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  search(searchFields: string[]) {
    if (this.queryString.keyword) {
      const keyword = this.queryString.keyword;

      this.query = this.query.find({
        $or: searchFields.map((field) => ({
          [field]: {
            $regex: keyword,
            $options: "i",
          },
        })),
      });
    }

    return this;
  }

  async paginate() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 10;
    const skip = (page - 1) * limit;

    const totalProducts = await this.query.clone().countDocuments();

    const totalPages = Math.ceil(totalProducts / limit);

    const nextPage =
      page < totalPages
        ? page + 1
        : null;

    const previousPage =
      page > 1
        ? page - 1
        : null;

    this.query = this.query
      .skip(skip)
      .limit(limit);

    this.pagination = {
      currentPage: page,
      limit,
      totalProducts,
      totalPages,
      nextPage,
      previousPage,
    };

    return this;
  }
}

export default APIFeatures;