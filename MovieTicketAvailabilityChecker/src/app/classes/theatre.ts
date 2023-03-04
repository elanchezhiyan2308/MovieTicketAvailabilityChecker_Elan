export interface Welcome3 {
    theatre: Theatre[];
    movies:  Movie[];
}

export interface Movie {
    release_date:  string;
    running_time:  string;
    language:      string;
    movie_name:    string;
    thumbnail_url: string;
    imdb_rating:   string;
    tags:          string;
}

export interface Theatre {
    show2_time:      Show2Time;
    website:         string;
    address:         string;
    show1_movie:     string;
    show4_time:      Show4Time;
    thumbnail_url:   string;
    customer_rating: string;
    show2_movie:     string;
    booked_seats?:   BookedSeat[];
    theatre_name:    string;
    show4_movie:     string;
    show1_time:      Show1Time;
    show3_time:      Show3Time;
    show3_movie:     string;
}

export interface BookedSeat {
    date:                string;
    show1_time?:         Show1Time;
    show1_booked_seats?: string;
    show2_time?:         Show2Time;
    show3_booked_seats?: string;
    show2_booked_seats?: string;
    show3_time?:         Show3Time;
    show4_booked_seats?: string;
    show4_time?:         Show4Time;
}

export enum Show1Time {
    The930Am = "9:30 AM",
}

export enum Show2Time {
    The1230Pm = "12:30 PM",
}

export enum Show3Time {
    The300Pm = "3:00 PM",
}

export enum Show4Time {
    The630Pm = "6:30 PM",
}
