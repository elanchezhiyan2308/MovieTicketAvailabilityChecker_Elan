export interface Root {
  theatre: Theatre[]
  movies: Movie[]
}

export interface Theatre {
  show2_time: string
  website: string
  address: string
  show1_movie: string
  show4_time: string
  thumbnail_url: string
  customer_rating: string
  show2_movie: string
  booked_seats?: BookedSeat[]
  theatre_name: string
  show4_movie: string
  show1_time: string
  show3_time: string
  show3_movie: string
}

export interface BookedSeat {
  date: string
  show4_booked_seats?: string
  show1_time?: string
  show4_time?: string
  show1_booked_seats?: string
  show2_time?: string
  show3_booked_seats?: string
  show2_booked_seats?: string
  show3_time?: string
}

export interface Movie {
  release_date: string
  running_time: string
  language: string
  movie_name: string
  thumbnail_url: string
  imdb_rating: string
  tags: string
}
