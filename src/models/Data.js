import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  _id: String,
  listing_url: String,
  name: String,
  summary: String,
  interaction: String,
  house_rules: String,
  property_type: String,
  room_type: String,
  bed_type: String,
  minimum_nights: String,
  maximum_nights: String,
  cancellation_policy: String,
  last_scraped: Object,
  calendar_last_scraped: Object,
  first_review: Object,
  last_review: Object,
  accommodates: Object,
  bedrooms: Object,
  beds: Object,
  number_of_reviews: Object,
  bathrooms: Object,
  amenities: [String],
  price: Object,
  security_deposit: Object,
  cleaning_fee: Object,
  extra_people: Object,
  guests_included: Object,
  images: {
    thumbnail_url: String,
    medium_url: String,
    picture_url: String,
    xl_picture_url: String,
  },
  host: {
    host_id: String,
    host_url: String,
    host_name: String,
    host_location: String,
    host_about: String,
    host_response_time: String,
    host_thumbnail_url: String,
    host_picture_url: String,
    host_neighbourhood: String,
    host_response_rate: Object,
    host_is_superhost: Boolean,
    host_has_profile_pic: Boolean,
    host_identity_verified: Boolean,
    host_listings_count: Object,
    host_total_listings_count: Object,
    host_verifications: [String],
  },
  address: {
    street: String,
    suburb: String,
    government_area: String,
    market: String,
    country: String,
    country_code: String,
    location: {
      type: { type: String },
      coordinates: [Object],
      is_location_exact: Boolean,
    },
  },
  availability: {
    availability_30: Object,
    availability_60: Object,
    availability_90: Object,
    availability_365: Object,
  },
  review_scores: {
    review_scores_accuracy: Object,
    review_scores_cleanliness: Object,
    review_scores_checkin: Object,
    review_scores_communication: Object,
    review_scores_location: Object,
    review_scores_value: Object,
    review_scores_rating: Object,
  },
  reviews: [
    {
      _id: String,
      date: Object,
      listing_id: String,
      reviewer_id: String,
      reviewer_name: String,
      comments: String,
    },
  ],
});

const data = mongoose.model("data", dataSchema);

export { data };